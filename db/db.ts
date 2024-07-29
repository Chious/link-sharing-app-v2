import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { S3Client } from "@aws-sdk/client-s3";

const BUCKET_REGION = process.env.BUCKET_REGION;
const BUCKET_ACCESS_KEY = process.env.BUCKET_ACCESS_KEY;
const BUCKET_SECRET_ACCESS_KEY = process.env.BUCKET_SECRET_ACCESS_KEY;

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });

export const s3 = new S3Client({
  credentials: {
    accessKeyId: BUCKET_ACCESS_KEY || "",
    secretAccessKey: BUCKET_SECRET_ACCESS_KEY || "",
  },
  region: BUCKET_REGION || "",
});
