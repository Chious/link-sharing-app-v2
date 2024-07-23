import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users, userProfiles } from "@/db/schema";
import { hashedPW } from "./url";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function generateRandomSecret(length: number) {
  return crypto.randomBytes(length).toString("base64url");
}

const SECRET = generateRandomSecret(32);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!match) {
    return {
      error: "User not found",
    };
  }
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const hashedPassword = await hashedPW(password);
  const newUser: any = await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new Error("User not found");
  }

  await db.insert(userProfiles).values({
    id: crypto.randomUUID(),
    userId: newUser[0].id,
    email: newUser[0].email,
    firstName: "",
    lastName: "",
    image: "",
    createdAt: new Date().toISOString(),
  });

  const token = await createTokenForUser({ userId: newUser[0].id });
  return {
    token,
    firstName: "",
    lastName: "",
    image: "",
  };
};

export const createTokenForUser = async ({ userId }: { userId: string }) => {
  const token = jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
  return token;
};

export const verifyToken = async ({ token }: { token: string }) => {
  const decoded = jwt.verify(token, SECRET);
  return decoded;
};
