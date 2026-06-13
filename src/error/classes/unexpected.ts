import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  UNEXPECTED_ERROR_STATUS_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNEXPECTED_ERROR_CODE,
} from "@/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError<
  typeof UNEXPECTED_ERROR_CODE,
  typeof UNEXPECTED_ERROR_STATUS_CODE
> {
  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({
      name: "UnexpectedError",
      message:
        message ??
        "Something went wrong. Check the cause of this error to learn more.",
      code: UNEXPECTED_ERROR_CODE,
      statusCode: UNEXPECTED_ERROR_STATUS_CODE,
      cause,
    });
  }

  serializeForUI(): ErrorInUI<typeof INTERNAL_SERVER_ERROR_CODE> {
    return {
      code: INTERNAL_SERVER_ERROR_CODE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    };
  }
}
