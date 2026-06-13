import type { ErrorInUI } from "@/error/classes/base";
import type { JsonValue } from "@/types/json-value";

export interface SuccessResponse<TData extends JsonValue> {
  success: true;
  data: TData;
}

export interface ErrorResponse<TCode extends string> {
  success: false;
  error: ErrorInUI<TCode>;
}
