import { createClientOnlyFn } from "@tanstack/react-start";

import type { SignInParams } from "@/features/auth/utils/validators";
import type { Result } from "@/types/result";

import { InvalidEmailOrPasswordError } from "@/features/auth/error/classes/invalid-email-or-password";
import { EmailNotVerifiedError } from "@/features/auth/error/classes/email-not-verified";
import { INVALID_EMAIL_ERROR_MESSAGE } from "@/features/auth/utils/constants";
import { Route as OnboardRoute } from "@/routes/_authenticated/onboard";
import { ValidationError } from "@/error/classes/validation";
import { UnexpectedError } from "@/error/classes/unexpected";
import { authClient } from "@/features/auth/client";

const fallbackErrorMessage =
  "Failed to sign in. Please try again later or contact support.";

export const signInFromClient = createClientOnlyFn(
  async ({
    email,
    password,
    rememberMe,
  }: SignInParams): Promise<
    Result<
      null,
      | InvalidEmailOrPasswordError
      | ValidationError<"email">
      | EmailNotVerifiedError
      | UnexpectedError
    >
  > => {
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        // Unlike the signUp method, this callback url actually applies to both email verification and this method's success.
        // Which means that in both cases it will automatically redirects the user to the URL specified here.
        // We want this URL to apply to the email verification case so that only the onboarding page has to check for the error search param.
        // So, to make sure that this URL doesn't apply to this method's success, we configure disableDefaultFetchPlugins in auth client to be true.
        callbackURL: OnboardRoute.to,
      });

      if (error) {
        if (error.code) {
          switch (error.code) {
            case "INVALID_EMAIL_OR_PASSWORD": {
              return {
                success: false,
                error: new InvalidEmailOrPasswordError({ cause: error }),
              };
            }
            case "EMAIL_NOT_VERIFIED": {
              return {
                success: false,
                error: new EmailNotVerifiedError({ cause: error }),
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
