import { BaseError } from "@/errors/classes/base";

export class UnauthenticatedError extends BaseError<
  "UNAUTHENTICATED_ERROR",
  null
> {
  method: string;
  url: string;

  constructor({ method, url }: { method: string; url: string }) {
    super({
      name: "UnauthenticatedError",
      message: `An unauthenticated request was made to "[${method}] ${url}".`,
      code: "UNAUTHENTICATED_ERROR",
      cause: null,
    });
    this.method = method;
    this.url = url;
  }
}
