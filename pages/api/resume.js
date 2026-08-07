import { getResumeDB, updateResumeDB } from "../../utils/db";
import { uploadFileToStorage } from "../../utils/storage";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const resumeData = await getResumeDB();
        return res.status(200).json({ success: true, data: resumeData });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "POST": {
      try {
        const { file, fileName } = req.body;

        if (!file) {
          return res.status(400).json({
            success: false,
            message: "PDF resume file data is required",
          });
        }

        let resumeUrl = "/resume.pdf";

        if (file.startsWith("data:application/pdf") || file.startsWith("data:application/octet-stream")) {
          const matches = file.match(/^data:(application\/[a-zA-Z-]+);base64,(.+)$/);
          if (matches) {
            const mimeType = matches[1];
            const buffer = Buffer.from(matches[2], "base64");
            const cleanFileName = fileName || `resume-${Date.now()}.pdf`;
            resumeUrl = await uploadFileToStorage({
              fileBuffer: buffer,
              fileName: cleanFileName,
              folder: "uploads",
              mimeType,
            });
          }
        } else if (typeof file === "string" && file.startsWith("/")) {
          resumeUrl = file;
        }

        const savedUrl = await updateResumeDB(resumeUrl);
        return res.status(200).json({
          success: true,
          message: "Resume updated successfully",
          data: { resumeUrl: savedUrl },
        });
      } catch (error) {
        console.error("Error uploading resume:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
