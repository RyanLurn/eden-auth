import { serializeError } from "serialize-error";

export class BaseError<
  TCode extends string,
  TStatusCode extends number,
  TCause = unknown,
> extends Error {
  code: TCode;
  statusCode: TStatusCode;
  isRetryable?: boolean;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    statusCode,
    isRetryable,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    statusCode: TStatusCode;
    isRetryable?: boolean;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }

  serializeForLog() {
    return serializeError(this);
  }
}

export type ErrorInUI<TCode extends string> = Pick<
  BaseError<TCode, number>,
  "message" | "code"
>;
