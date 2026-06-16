import type { SentMessageInfo } from "nodemailer/lib/smtp-transport";

import { createServerOnlyFn } from "@tanstack/react-start";

import type { Email } from "@/features/email/types";
import type { Result } from "@/types/result";

import { transporter } from "@/features/email/transporter.server";
import { UnexpectedError } from "@/error/classes/unexpected";

export const sendEmail = createServerOnlyFn(
  // This function was created as part of the auth's email verification.
  // Therefore, the focus was on the auth part, not in the email part.
  // Future PRs will implement more granular error handling for this function.
  async (email: Email): Promise<Result<SentMessageInfo, UnexpectedError>> => {
    try {
      const info = await transporter.sendMail(email);
      return {
        success: true,
        data: info,
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
