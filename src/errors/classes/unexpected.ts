import { UNEXPECTED_ERROR_CODE } from "@/errors/codes";
import { BaseError } from "@/errors/classes/base";

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
