import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export type PasswordHash = {
  salt: string;
  hash: string;
};

export async function hashPassword(password: string): Promise<PasswordHash> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return { salt, hash: derivedKey.toString("hex") };
}

export async function verifyPassword(
  password: string,
  stored: PasswordHash,
): Promise<boolean> {
  const derivedKey = (await scryptAsync(password, stored.salt, 64)) as Buffer;
  const hashBuf = Buffer.from(stored.hash, "hex");
  return hashBuf.length === derivedKey.length && crypto.timingSafeEqual(hashBuf, derivedKey);
}

