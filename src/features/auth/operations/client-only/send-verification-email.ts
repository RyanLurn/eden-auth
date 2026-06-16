import { createClientOnlyFn } from "@tanstack/react-start";

import type { Result } from "@/types/result";

import {
  CALLBACK_URL_FOR_EMAIL_VERIFICATION,
  INVALID_EMAIL_ERROR_MESSAGE,
} from "@/features/auth/utils/constants";
import { UnexpectedError } from "@/error/classes/unexpected";
import { ValidationError } from "@/error/classes/validation";
import { authClient } from "@/features/auth/client";

const fallbackErrorMessage =
  "Failed to send verification email. Please try again later or contact support.";

export const sendVerificationEmail = createClientOnlyFn(
  async (
    email: string
  ): Promise<Result<null, ValidationError<"email"> | UnexpectedError>> => {
    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: CALLBACK_URL_FOR_EMAIL_VERIFICATION,
      });

      if (error) {
        if (error.code === "INVALID_EMAIL") {
          return {
            success: false,
            error: new ValidationError<"email">({
              entity: "email",
              message: INVALID_EMAIL_ERROR_MESSAGE,
              cause: error,
            }),
          };
        }

        return {
          success: false,
          error: new UnexpectedError({
            message: fallbackErrorMessage,
            cause: error,
          }),
        };
      }

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        error: new UnexpectedError({
          message: fallbackErrorMessage,
          cause: error,
        }),
      };
    }
  }
);
