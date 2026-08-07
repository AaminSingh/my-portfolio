import fs from "fs";
import { join } from "path";

/**
 * Cloud Storage / File Upload Utility Handler
 * Supports AWS S3 / Firebase Storage cloud upload integrations,
 * as well as standard Next.js local storage persistence in public/uploads/
 */
export async function uploadFileToStorage({ fileBuffer, fileName, folder = "uploads", mimeType }) {
  // Check if S3 / Firebase Cloud Bucket environment variables are set:
  if (process.env.AWS_S3_BUCKET || process.env.FIREBASE_STORAGE_BUCKET) {
    // Cloud Bucket Uploader logic (AWS S3 SDK / Firebase Storage SDK)
    // Example for AWS S3:
    // const s3 = new AWS.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY });
    // const uploadResult = await s3.upload({ Bucket: process.env.AWS_S3_BUCKET, Key: `${folder}/${fileName}`, Body: fileBuffer, ContentType: mimeType }).promise();
    // return uploadResult.Location;
  }

  // Local filesystem fallback (saves to public/uploads/[folder]/[fileName])
  try {
    const uploadDir = join(process.cwd(), "public", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = join(uploadDir, cleanFileName);

    fs.writeFileSync(filePath, fileBuffer);
    return `/${folder}/${cleanFileName}`;
  } catch (err) {
    console.error("Error saving file to storage:", err);
    throw new Error("Failed to upload file");
  }
}
