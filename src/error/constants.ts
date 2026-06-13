export const UNEXPECTED_ERROR_CODE = "UNEXPECTED_ERROR";

export const INTERNAL_SERVER_ERROR_CODE = "INTERNAL_SERVER_ERROR";
export const INTERNAL_SERVER_ERROR_MESSAGE =
  "Something went wrong. Please try again later or contact support.";
export const INTERNAL_SERVER_ERROR = {
  code: INTERNAL_SERVER_ERROR_CODE,
  message: INTERNAL_SERVER_ERROR_MESSAGE,
} as const;
