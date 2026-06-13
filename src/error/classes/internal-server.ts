import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_CODE,
} from "@/error/constants";
import { type ErrorInUI, BaseError } from "@/error/classes/base";

export class InternalServerError extends BaseError<
  typeof INTERNAL_SERVER_ERROR_CODE,
  typeof INTERNAL_SERVER_ERROR_STATUS_CODE,
  null
> {
  constructor() {
    super({
      name: "UnexpectedError",
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      code: INTERNAL_SERVER_ERROR_CODE,
      statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE,
      cause: null,
    });
  }

  serializeForUI(): ErrorInUI<typeof INTERNAL_SERVER_ERROR_CODE> {
    return {
      code: INTERNAL_SERVER_ERROR_CODE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    };
  }
}
