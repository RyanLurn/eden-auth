import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_CODE,
  UNEXPECTED_ERROR_CODE,
} from "@/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError<typeof UNEXPECTED_ERROR_CODE> {
  constructor({ message, cause }: { message: string; cause: unknown }) {
    super({
      name: "UnexpectedError",
      message,
      code: UNEXPECTED_ERROR_CODE,
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
