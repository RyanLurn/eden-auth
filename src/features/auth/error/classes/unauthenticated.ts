import {
  UNAUTHENTICATED_ERROR_STATUS_CODE,
  UNAUTHENTICATED_ERROR_CODE,
} from "@/features/auth/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class UnauthenticatedError extends BaseError<
  typeof UNAUTHENTICATED_ERROR_CODE,
  typeof UNAUTHENTICATED_ERROR_STATUS_CODE
> {
  method: string;
  href: string;

  constructor({ method, href }: { method: string; href: string }) {
    super({
      name: "UnauthenticatedError",
      message: `An unauthenticated request was made to ${href}.`,
      code: UNAUTHENTICATED_ERROR_CODE,
      statusCode: UNAUTHENTICATED_ERROR_STATUS_CODE,
      cause: null,
    });
    this.method = method;
    this.href = href;
  }

  serializeForUI(): ErrorInUI<typeof UNAUTHENTICATED_ERROR_CODE> {
    return {
      code: UNAUTHENTICATED_ERROR_CODE,
      message: "You are unauthenticated. Please sign in to continue.",
    };
  }
}
