import {
  INVALID_EMAIL_OR_PASSWORD_ERROR_DEFAULT_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_ERROR_STATUS_CODE,
  INVALID_EMAIL_OR_PASSWORD_ERROR_CODE,
} from "@/features/auth/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class InvalidEmailOrPasswordError extends BaseError<
  typeof INVALID_EMAIL_OR_PASSWORD_ERROR_CODE,
  typeof INVALID_EMAIL_OR_PASSWORD_ERROR_STATUS_CODE
> {
  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({
      name: "InvalidEmailOrPasswordError",
      message: message ?? INVALID_EMAIL_OR_PASSWORD_ERROR_DEFAULT_MESSAGE,
      code: INVALID_EMAIL_OR_PASSWORD_ERROR_CODE,
      statusCode: INVALID_EMAIL_OR_PASSWORD_ERROR_STATUS_CODE,
      cause,
    });
  }

  serializeForUI(): ErrorInUI<typeof INVALID_EMAIL_OR_PASSWORD_ERROR_CODE> {
    return {
      code: INVALID_EMAIL_OR_PASSWORD_ERROR_CODE,
      message: INVALID_EMAIL_OR_PASSWORD_ERROR_DEFAULT_MESSAGE,
    };
  }
}
