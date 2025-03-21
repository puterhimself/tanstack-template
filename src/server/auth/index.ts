import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '../db';
import { users, sessions, accounts } from '../db/schema';
import { generateId } from '~/lib/utils/id';

// Schema for login validation
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Schema for registration validation
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for OAuth account
export const oauthAccountSchema = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
  userId: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  expiresAt: z.date().optional(),
  tokenType: z.string().optional(),
  scope: z.string().optional(),
  idToken: z.string().optional(),
});

// Create a new user
export async function registerUser(input: z.infer<typeof registerSchema>) {
  const { name, email, password } = input;
  
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create the user
  const [user] = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  }).returning();
  
  return user;
}

// Login a user
export async function loginUser(input: z.infer<typeof loginSchema>) {
  const { email, password } = input;
  
  // Find the user
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }
  
  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Create a session
  const [session] = await db.insert(sessions).values({
    userId: user.id,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  }).returning();
  
  return { user, session };
}

// Create or connect OAuth account
export async function connectOAuthAccount(input: z.infer<typeof oauthAccountSchema>) {
  const { provider, providerAccountId, ...accountData } = input;
  
  // Check if account already exists
  const existingAccount = await db.query.accounts.findFirst({
    where: (account) => 
      eq(account.provider, provider) && 
      eq(account.providerAccountId, providerAccountId),
    with: {
      user: true,
    },
  });
  
  if (existingAccount) {
    return existingAccount.user;
  }
  
  // If userId is provided, connect to existing user
  if (accountData.userId) {
    const [account] = await db.insert(accounts).values({
      provider,
      providerAccountId,
      userId: accountData.userId,
      accessToken: accountData.accessToken,
      refreshToken: accountData.refreshToken,
      expiresAt: accountData.expiresAt,
      tokenType: accountData.tokenType,
      scope: accountData.scope,
      idToken: accountData.idToken,
    }).returning();
    
    const user = await db.query.users.findFirst({
      where: eq(users.id, accountData.userId),
    });
    
    return user;
  }
  
  // Create a new user and account
  const [user] = await db.insert(users).values({
    email: `${providerAccountId}@${provider}.auth`, // Placeholder email
    name: `User from ${provider}`,
  }).returning();
  
  await db.insert(accounts).values({
    provider,
    providerAccountId,
    userId: user.id,
    accessToken: accountData.accessToken,
    refreshToken: accountData.refreshToken,
    expiresAt: accountData.expiresAt,
    tokenType: accountData.tokenType,
    scope: accountData.scope,
    idToken: accountData.idToken,
  });
  
  return user;
}

// Get session information
export async function getSession(sessionId: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      user: true,
    },
  });
  
  if (!session || session.expiresAt < new Date()) {
    return null;
  }
  
  return session;
}

// Log out a user
export async function logoutUser(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
  return true;
} 