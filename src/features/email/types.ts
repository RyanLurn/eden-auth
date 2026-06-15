import type { NODEMAILER_ERROR_CODES } from "@/features/email/constants";

export interface Email {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export type EmailErrorCode = keyof typeof NODEMAILER_ERROR_CODES;
