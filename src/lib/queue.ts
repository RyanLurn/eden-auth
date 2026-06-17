import type { BaseError } from "@/error/classes/base";
import type { Result } from "@/types/result";

export interface Job {
  name: string;
  input: NonNullable<unknown>;
  attempts: number;
}

export type QueueProcessError = BaseError<string, number>;
export type QueueProcessResult = Result<null, QueueProcessError>;
export type QueueProcessingFunction<TJob extends Job> = (
  job: TJob
) => Promise<QueueProcessResult> | QueueProcessResult;

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
          `[${this.name.toUpperCase()} QUEUE] ${job.name} succeeded after ${job.attempts} attempts (out of ${this.maxAttempts}).`
        );
        this.queue.shift();
        break;
      }

      job.attempts++;
      console.error(
        `[${this.name.toUpperCase()} QUEUE] ${job.name} failed (attempt ${job.attempts} out of ${this.maxAttempts}) with error:`
      );
      console.error(processingResult.error);

      if (job.attempts >= this.maxAttempts) {
        console.error(
          `[${this.name.toUpperCase()} QUEUE] Giving up on ${job.name} after ${this.maxAttempts} attempts`
        );
        this.queue.shift(); // drop it
        break;
      }

      await Bun.sleep(this.retryDelayMs);
    }

    this.isProcessing = false;
  }
}
