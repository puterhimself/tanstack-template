import { randomUUID } from "crypto";

/**
 * Generate a random UUID
 * @returns A random UUID
 */
export function generateId(): string {
  return randomUUID();
}

/**
 * Generate a secure random string
 * @param length Length of the string
 * @returns A secure random string
 */
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  
  globalThis.crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
} 