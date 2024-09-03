import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { s3 } from "@/db/db";
import { getTokenFromRequest } from "@/lib/token";
import { getImageUrl, uploadImageToS3 } from "@/lib/image";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // check if request is include valid form-data
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("multipart/form-data"))
    return Response.json({ error: "Invalid content type" }, { status: 400 });

  // check if request is authorized
  const token = await getTokenFromRequest(request);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const userId = await verifyToken(token);

  // get form data from body
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File))
    return Response.json({ error: "No file provided" }, { status: 400 });

  // send file to s3
  await uploadImageToS3(userId, file.type, file);

  const presignedUrl = await getImageUrl(
    `${userId}.${file.type.split("/")[1]}`
  );

  return Response.json({ presignedUrl });
}
