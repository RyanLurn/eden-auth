import type { JsonValue } from "@/types/json-value";

export type SerializedResult<
  TData extends JsonValue,
  TError extends SerializedError,
> = SerializedFailure<TError> | SerializedSuccess<TData>;

export interface SerializedSuccess<TData extends JsonValue> {
  success: true;
  data: TData;
}

export interface SerializedFailure<TError extends SerializedError> {
  success: false;
  error: TError;
}

export interface SerializedError {
  code: string;
  message: string;
}
