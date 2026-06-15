import { createServerOnlyFn } from "@tanstack/react-start";

const algorithm: Bun.Password.AlgorithmLabel = "argon2id";

export const hashPassword = createServerOnlyFn(
  async (password: string) =>
    await Bun.password.hash(password, {
      algorithm,
      memoryCost: 65536,
      timeCost: 3,
    })
);

export const verifyPassword = createServerOnlyFn(
  async ({ password, hash }: { password: string; hash: string }) =>
    await Bun.password.verify(password, hash, algorithm)
);
