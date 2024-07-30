import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users, userProfiles } from "@/db/schema";
import { hashedPW } from "./utils";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
const bcrypt = require("bcryptjs");
import { getImageUrl } from "./image";

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
    return new GraphQLError("User not found", {
      extensions: {
        code: 400,
      },
    });
  }

  const passwordMatch = await bcrypt.compare(password, match.password);

  if (!passwordMatch) {
    return new GraphQLError("User not found", {
      extensions: {
        code: 400,
      },
    });
  }

  let userProfile = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, match.id),
  });

  const token = await createTokenForUser({ userId: match.id });

  if (userProfile?.image) {
    userProfile.image = await getImageUrl(userProfile.image);
  }

  return {
    token: token,
    user: {
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      image: userProfile?.image,
      email: match.email,
    },
    links: JSON.parse(userProfile?.links || "[]"),
  };
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (match) {
    return new GraphQLError("User already exists", {
      extensions: {
        code: 400,
      },
    });
  }

  const hashedPassword = await hashedPW(password);
  const newUser: any = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      email: users.email,
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
    token: token,
    user: {
      firstName: "",
      lastName: "",
      image: "",
      email: newUser[0].email,
    },
  };
};

export const createTokenForUser = async ({ userId }: { userId: string }) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = async (token: string | null) => {
  if (!token) {
    throw new GraphQLError("No token provided", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  const splitToken = token.slice(7);
  try {
    const user = jwt.verify(splitToken, process.env.JWT_SECRET) as {
      userId: string;
    };
    return user.userId;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT verification error:", error.message);
      throw new GraphQLError("Invalid or expired token", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
    console.error("Unexpected error during token verification:", error);
    throw new GraphQLError("An error occurred during authentication", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
