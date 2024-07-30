import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { s3, db } from "@/db/db";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

const BUCKET_NAME = process.env.BUCKET_NAME;

export const uploadImageToS3 = async (
  userId: string,
  fileType: string,
  file: File
) => {
  if (!fileType.startsWith("image/") || !file || !userId) {
    return null;
  }

  const filename = `${userId}.${fileType.split("/")[1]}`;
  const fileBlob = await file.arrayBuffer();
  const resizedImage = await sharp(fileBlob)
    .resize({ width: 1024, height: 1024, fit: "cover" })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME || "",
    Key: filename,
    Body: resizedImage,
    ContentType: fileType,
  });

  console.log("command: ", {
    BUCKET_NAME,
    filename,
    resizedImage,
    fileType,
  });

  await s3.send(command);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });

  if (!url) {
    throw new Error("Failed to upload image to S3");
  } else {
    //save filename to db
    const res = await db
      .update(userProfiles)
      .set({
        image: filename,
      })
      .where(eq(userProfiles.userId, userId));
  }

  return url;
};

export const getImageUrl = async (fileName: string) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME || "",
    Key: fileName,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
  return url;
};
