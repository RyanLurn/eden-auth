import { createClientOnlyFn } from "@tanstack/react-start";

import type { SignInParams } from "@/features/auth/utils/validators";
import type { RedirectSearchParam } from "@/lib/validators";
import type { Result } from "@/types/result";

import { InvalidEmailOrPasswordError } from "@/features/auth/error/classes/invalid-email-or-password";
import { INVALID_EMAIL_ERROR_MESSAGE } from "@/features/auth/utils/constants";
import { Route as DashboardRoute } from "@/routes/_authenticated/dashboard";
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
    redirect,
  }: RedirectSearchParam & SignInParams): Promise<
    Result<
      null,
      InvalidEmailOrPasswordError | ValidationError<"email"> | UnexpectedError
    >
  > => {
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        // Unlike the signUp method, this callback url actually applies to both email verification and this method's success.
        // Which means it will automatically redirects the user without us calling `router.navigate` manually.
        callbackURL: redirect ? redirect : DashboardRoute.to,
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
