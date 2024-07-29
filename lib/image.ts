import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { s3 } from "@/db/db";

const BUCKET_NAME = process.env.BUCKET_NAME;

export const uploadImageToS3 = async (
  userId: string,
  fileType: string,
  file: Buffer
) => {
  if (!fileType.startsWith("image/") || !file || !userId) {
    return null;
  }

  const resizedImage = await sharp(file)
    .resize({ width: 1024, height: 1024, fit: "cover" })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME || "",
    Key: `${userId}.${fileType}`,
    Body: resizedImage,
    ContentType: fileType,
  });

  const response = await s3.send(command);
  return response;
};

export const getImageUrl = async (fileName: string) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME || "",
    Key: fileName,
  });
};
