import type { BaseError } from "@/errors/classes/base";
import type { JsonValue } from "@/types/json-value";

export interface SerializedSuccess<TData extends JsonValue> {
  success: true;
  data: TData;
}

export interface SerializedFailure<
  TError extends Pick<BaseError<string>, "message" | "code">,
> {
  success: false;
  error: TError;
}
