import { createClientOnlyFn } from "@tanstack/react-start";

import type { SignUpParams } from "@/features/auth/utils/validators";
import type { StrictOmit } from "@/types/utils";
import type { Result } from "@/types/result";

import {
  CALLBACK_URL_FOR_EMAIL_VERIFICATION,
  INVALID_EMAIL_ERROR_MESSAGE,
} from "@/features/auth/utils/constants";
import { ValidationError } from "@/error/classes/validation";
import { UnexpectedError } from "@/error/classes/unexpected";
import { authClient } from "@/features/auth/client";

const fallbackErrorMessage =
  "Failed to sign up. Please try again later or contact support.";

export const signUpFromClient = createClientOnlyFn(
  async ({
    name,
    email,
    password,
  }: StrictOmit<SignUpParams, "confirmPassword">): Promise<
    Result<null, ValidationError<"password" | "email"> | UnexpectedError>
  > => {
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        // This is a callback for email verification, not for this method's success.
        // Which means that we need to use `router.navigate` to navigate the user on success.
        callbackURL: CALLBACK_URL_FOR_EMAIL_VERIFICATION,
      });

      if (error) {
        if (error.code) {
          switch (error.code) {
            case "PASSWORD_TOO_SHORT": // falls through
            case "PASSWORD_TOO_LONG": // falls through
            case "INVALID_PASSWORD": {
              return {
                success: false,
                error: new ValidationError<"password">({
                  entity: "password",
                  message: error.message ?? "Invalid password.",
                  cause: error,
                }),
              };
            }
            case "INVALID_EMAIL": {
              return {
                success: false,
                error: new ValidationError<"email">({
                  entity: "email",
                  message: INVALID_EMAIL_ERROR_MESSAGE,
                  cause: error,
                }),
              };
            }
          }
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
      // This is most likely a network error thrown by the underlying fetch function Better Auth client uses.
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
