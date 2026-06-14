import { z } from "zod";

import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "@/features/auth/constants";

export const nameValidator = z
  .string()
  .trim()
  .normalize("NFC")
  .min(1, "Name is required.")
  .max(100, "Name is too long.");

export const emailValidator = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email("Invalid email").max(254, "Email is too long."));

export const passwordValidator = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password is too short.")
  .max(MAX_PASSWORD_LENGTH, "Password is too long.");

export const confirmPasswordValidator = z
  .string()
  .min(1, "Please confirm your password.");

export const rememberMeValidator = z.boolean();

export const signInValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: rememberMeValidator,
});

export const signUpValidator = z
  .object({
    name: nameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
  })
  .refine(
    (arg) => arg.confirmPassword !== arg.password,
    "Passwords do not match."
  );
