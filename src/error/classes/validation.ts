import type { ErrorMessageOption } from "@/error/types";

import {
  VALIDATION_ERROR_STATUS_CODE,
  VALIDATION_ERROR_CODE,
} from "@/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class ValidationError<TEntity extends string> extends BaseError<
  typeof VALIDATION_ERROR_CODE,
  typeof VALIDATION_ERROR_STATUS_CODE
> {
  entity: TEntity;

  constructor({
    entity,
    message,
    cause,
  }: {
    entity: TEntity;
    message: string;
    cause: unknown;
  }) {
    super({
      name: "ValidationError",
      message,
      code: VALIDATION_ERROR_CODE,
      statusCode: VALIDATION_ERROR_STATUS_CODE,
      cause,
    });
    this.entity = entity;
  }

  serializeForUI(
    option: ErrorMessageOption
  ): ErrorInUI<typeof VALIDATION_ERROR_CODE> {
    return {
      code: VALIDATION_ERROR_CODE,
      message: option.useDefault ? this.message : option.message,
    };
  }
}
