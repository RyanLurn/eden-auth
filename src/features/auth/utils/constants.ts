import type { ToOptions } from "@tanstack/react-router";

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 128;

export const INVALID_EMAIL_ERROR_MESSAGE = "Invalid email.";
export const PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE = "Passwords do not match.";

export const CALLBACK_URL_FOR_EMAIL_VERIFICATION: ToOptions["to"] =
  "/email-verification/check";
