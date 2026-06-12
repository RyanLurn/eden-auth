import { UNEXPECTED_ERROR_CODE } from "@/error/codes";
import { BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError<typeof UNEXPECTED_ERROR_CODE> {
  constructor({ message, cause }: { message: string; cause: unknown }) {
    super({
      name: "UnexpectedError",
      message,
      code: UNEXPECTED_ERROR_CODE,
      cause,
    });
  }
}

export type SerializedUnexpectedError = Pick<
  UnexpectedError,
  "message" | "code"
>;
