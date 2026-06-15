import { createTransport } from "nodemailer";

import { serverEnv } from "@/lib/env/server";

export const transporter = createTransport({
  host: serverEnv.SMTP_HOST,
  port: serverEnv.SMTP_PORT,
  secure: serverEnv.SMTP_SECURE,
  auth: {
    user: serverEnv.SMTP_USER,
    pass: serverEnv.SMTP_PASS,
  },
});

transporter.on("error", (error) => {
  console.error("[EMAIL] A transport-level error occurs:");
  console.error(error);
});
