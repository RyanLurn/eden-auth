import type { INTERNAL_SERVER_ERROR_CODE } from "@/error/codes";
import type { BaseError } from "@/error/classes/base";

export type SerializedError = Pick<BaseError<string>, "message" | "code">;

export interface SerializedInternalServerError extends SerializedError {
  code: typeof INTERNAL_SERVER_ERROR_CODE;
}
