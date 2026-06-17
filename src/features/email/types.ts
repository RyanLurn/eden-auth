import type { NODEMAILER_ERROR_CODES } from "@/features/email/error/constants";

export interface Email {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface NodemailerError {
  message: string;
  code: keyof typeof NODEMAILER_ERROR_CODES;
  command: string;
  response: string;
  responseCode: number;
}
