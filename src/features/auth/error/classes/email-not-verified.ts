import {
  EMAIL_NOT_VERIFIED_ERROR_STATUS_CODE,
  EMAIL_NOT_VERIFIED_ERROR_CODE,
} from "@/features/auth/error/constants";
import { BaseError } from "@/error/classes/base";

export class EmailNotVerifiedError extends BaseError<
  typeof EMAIL_NOT_VERIFIED_ERROR_CODE,
  typeof EMAIL_NOT_VERIFIED_ERROR_STATUS_CODE
> {
  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({
      name: "EmailNotVerifiedError",
      message: message ?? "Please verify your email address",
      code: EMAIL_NOT_VERIFIED_ERROR_CODE,
      statusCode: EMAIL_NOT_VERIFIED_ERROR_STATUS_CODE,
      cause,
    });
  }

  // As of the time writing this, this class doesn't have a `serializeForUI` method because its instances will only be caught on the client and never crosses the network boundary.
}
