import { db } from "@/db/db";
import jwt from "jsonwebtoken";
import { verifyToken } from "./auth";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editProfile = async (input: any, ctx: any) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

  const id = await verifyToken(ctx.user);

  const res = await db
    .update(userProfiles)
    .set(input)
    .where(eq(userProfiles.userId, id))
    .returning();

  return res;
};
