import { UNAUTHENTICATED_ERROR_CODE } from "@/features/auth/error/codes";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class UnauthenticatedError extends BaseError<
  typeof UNAUTHENTICATED_ERROR_CODE,
  null
> {
  method: string;
  url: string;

  constructor({ method, url }: { method: string; url: string }) {
    super({
      name: "UnauthenticatedError",
      message: `An unauthenticated request was made to "[${method}] ${url}".`,
      code: UNAUTHENTICATED_ERROR_CODE,
      cause: null,
    });
    this.method = method;
    this.url = url;
  }

  serializeForUI(): ErrorInUI<typeof UNAUTHENTICATED_ERROR_CODE> {
    return {
      code: UNAUTHENTICATED_ERROR_CODE,
      message: "You are unauthenticated. Please sign in to continue.",
    };
  }
}
