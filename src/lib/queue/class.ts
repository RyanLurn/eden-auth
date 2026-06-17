import type { QueueProcessingFunction, Job } from "@/lib/queue/types";

export class Queue<TJob extends Job> {
  queue: TJob[] = [];
  isProcessing: boolean = false;

  name: string;
  processingFunction: QueueProcessingFunction<TJob>;
  maxAttempts: number;
  retryDelayMs: number;

  constructor({
    name,
    processingFunction,
    maxAttempts = 3,
    retryDelayMs = 5000,
  }: {
    name: string;
    processingFunction: QueueProcessingFunction<TJob>;
    maxAttempts?: number;
    retryDelayMs?: number;
  }) {
    this.name = name;
    this.processingFunction = processingFunction;
    this.maxAttempts = maxAttempts;
    this.retryDelayMs = retryDelayMs;
  }

  enqueue(job: TJob) {
    this.queue.push({ ...job, attempts: 0 });
    void this.process();
  }

  async process() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;

    while (this.queue[0] !== undefined) {
      const job = this.queue[0];
      const processingResult = await this.processingFunction(job);

      if (processingResult.success) {
        console.log(
          `[${this.name.toUpperCase()} QUEUE] ${job.name} succeeded after ${job.attempts} attempt(s) (out of ${this.maxAttempts}).`
        );
        this.queue.shift();
        break;
      }

      const error = processingResult.error;
      const isRetryable = error.isRetryable;

      if (!isRetryable) {
        console.error(
          `[${this.name.toUpperCase()} QUEUE] ${job.name} failed after ${job.attempts} attempt(s) with an error that ${isRetryable === false ? "cannot" : "shouldn't"} be retried:`
        );
        console.error(error);
        break;
      }

      job.attempts++;
      console.error(
        `[${this.name.toUpperCase()} QUEUE] ${job.name} failed (attempt ${job.attempts} out of ${this.maxAttempts}) with error:`
      );
      console.error(processingResult.error);

      if (job.attempts >= this.maxAttempts) {
        console.error(
          `[${this.name.toUpperCase()} QUEUE] Giving up on ${job.name} after ${this.maxAttempts} attempts.`
        );
        this.queue.shift(); // drop it
        break;
      }

      await Bun.sleep(this.retryDelayMs);
    }

    this.isProcessing = false;
  }
}
