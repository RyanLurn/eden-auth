import type { EmailErrorCode } from "@/features/email/types";
import type { ErrorMessageOption } from "@/error/types";

import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_CODE,
} from "@/error/constants";
import { NODEMAILER_ERROR_CODES } from "@/features/email/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class EmailError<TCode extends EmailErrorCode> extends BaseError<
  TCode,
  typeof INTERNAL_SERVER_ERROR_STATUS_CODE
> {
  constructor({
    message,
    code,
    cause,
  }: {
    message?: string;
    code: TCode;
    cause: unknown;
  }) {
    super({
      name: "EmailError",
      message: message ?? NODEMAILER_ERROR_CODES[code],
      code,
      statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE,
      cause,
    });
  }

  serializeForUI(
    option: ErrorMessageOption = { useDefault: true }
  ): ErrorInUI<typeof INTERNAL_SERVER_ERROR_CODE> {
    return {
      code: INTERNAL_SERVER_ERROR_CODE,
      message: option.useDefault
        ? INTERNAL_SERVER_ERROR_MESSAGE
        : option.message,
    };
  }
}
