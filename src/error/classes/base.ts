import { serializeError } from "serialize-error";

export class BaseError<
  TCode extends string,
  TStatusCode extends number,
  TCause = unknown,
> extends Error {
  code: TCode;
  statusCode: TStatusCode;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    statusCode,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    statusCode: TStatusCode;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.statusCode = statusCode;
    this.code = code;
  }

  serializeForLog() {
    return {
      ...this,
      cause: serializeError(this.cause),
    };
  }
}

export type ErrorInUI<TCode extends string> = Pick<
  BaseError<TCode, number>,
  "message" | "code"
>;
