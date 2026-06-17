import type { BaseError } from "@/error/classes/base";
import type { Result } from "@/types/result";

export interface Job {
  name: string;
  input: unknown;
  attempts: number;
}

export type QueueProcessError = BaseError<string, number>;
export type QueueProcessResult = Result<null, QueueProcessError>;
export type QueueProcessingFunction<TJob extends Job> = (
  job: TJob
) => Promise<QueueProcessResult> | QueueProcessResult;
