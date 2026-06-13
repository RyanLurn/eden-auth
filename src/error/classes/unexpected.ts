import {
  UNEXPECTED_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} from "@/error/constants";
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

  serializeForUI() {
    return INTERNAL_SERVER_ERROR;
  }
}
