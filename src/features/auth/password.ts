const algorithm: Bun.Password.AlgorithmLabel = "argon2id";

export async function hashPassword(password: string) {
  const hash = await Bun.password.hash(password, {
    algorithm,
    memoryCost: 65536,
    timeCost: 3,
  });
  return hash;
}

export async function verifyPassword({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) {
  const isMatched = await Bun.password.verify(password, hash, algorithm);
  return isMatched;
}
