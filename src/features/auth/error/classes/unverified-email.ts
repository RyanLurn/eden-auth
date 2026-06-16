import {
  UNVERIFIED_EMAIL_ERROR_STATUS_CODE,
  UNVERIFIED_EMAIL_ERROR_CODE,
} from "@/features/auth/error/constants";
import { BaseError } from "@/error/classes/base";

export class UnverifiedEmailError extends BaseError<
  typeof UNVERIFIED_EMAIL_ERROR_CODE,
  typeof UNVERIFIED_EMAIL_ERROR_STATUS_CODE
> {
  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({
      name: "UnverifiedEmailError",
      message: message ?? "Please verify your email address",
      code: UNVERIFIED_EMAIL_ERROR_CODE,
      statusCode: UNVERIFIED_EMAIL_ERROR_STATUS_CODE,
      cause,
    });
  }

  // As of the time writing this, this class doesn't have a `serializeForUI` method because its instances will only be caught on the client and never crosses the network boundary.
}
