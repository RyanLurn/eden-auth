import { createServerOnlyFn } from "@tanstack/react-start";

import type { Email } from "@/features/email/types";
import type { Result } from "@/types/result";

import { transporter } from "@/features/email/transporter.server";
import { UnexpectedError } from "@/error/classes/unexpected";

export const sendEmail = createServerOnlyFn(
  async (email: Email): Promise<Result<null, UnexpectedError>> => {
    try {
      await transporter.sendMail(email);
      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        error: new UnexpectedError({
          message: "An unexpected error occurred while trying to send email.",
          cause: error,
        }),
      };
    }
  }
);
