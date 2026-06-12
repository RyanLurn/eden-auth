import { UNAUTHENTICATED_ERROR_CODE } from "@/features/auth/errors/codes";
import { BaseError } from "@/errors/classes/base";

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
}

export type SerializedUnauthenticatedError = Pick<
  UnauthenticatedError,
  "message" | "code"
>;
