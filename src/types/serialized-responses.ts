import type { ErrorInUI } from "@/error/classes/base";
import type { JsonValue } from "@/types/json-value";

export type SerializedResponse<
  TData extends JsonValue,
  TError extends ErrorInUI<string>,
> = SuccessResponse<TData> | ErrorResponse<TError>;

export interface SuccessResponse<TData extends JsonValue> {
  success: true;
  data: TData;
}

export interface ErrorResponse<TError extends ErrorInUI<string>> {
  success: false;
  error: TError;
}
