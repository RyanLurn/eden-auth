import { createClientOnlyFn } from "@tanstack/react-start";

import type { Result } from "@/types/result";

import { CALLBACK_URL_FOR_EMAIL_VERIFICATION } from "@/features/auth/utils/constants";
import { UnexpectedError } from "@/error/classes/unexpected";
import { authClient } from "@/features/auth/client";

export const sendVerificationEmail = createClientOnlyFn(
  async (email: string): Promise<Result<null, UnexpectedError>> => {
    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: CALLBACK_URL_FOR_EMAIL_VERIFICATION,
      });
      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        error: new UnexpectedError({ cause: error }),
      };
    }
  }
);
