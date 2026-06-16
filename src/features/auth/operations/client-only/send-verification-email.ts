import { createClientOnlyFn } from "@tanstack/react-start";

import type { Result } from "@/types/result";

import { CALLBACK_URL_FOR_EMAIL_VERIFICATION } from "@/features/auth/utils/constants";
import { UnexpectedError } from "@/error/classes/unexpected";
import { authClient } from "@/features/auth/client";

const fallbackErrorMessage =
  "Failed to send verification email. Please try again later or contact support.";

export const sendVerificationEmail = createClientOnlyFn(
  async (email: string): Promise<Result<null, UnexpectedError>> => {
    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: CALLBACK_URL_FOR_EMAIL_VERIFICATION,
      });

      // The kinds of error this operation might return is only relevant when the user is already signed in AND they want to change their email.
      // That operation uses the same endpoint for when someone needs to verify their email on sign up. However, we don't need to prematurely generalize this method for such case right now.
      // So, we fallback to a generic unexpected error.
      if (error) {
        return {
          success: false,
          error: new UnexpectedError({
            message: error.message ?? fallbackErrorMessage,
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
