import { getCertificatesDB, addCertificateDB, deleteCertificateDB } from "../../utils/db";
import { uploadFileToStorage } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const certificates = await getCertificatesDB();
        return res.status(200).json({ success: true, data: certificates });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "POST": {
      try {
        const { name, issuer, date, verificationLink, image, imageFileName } = req.body;

        if (!name || !issuer) {
          return res.status(400).json({
            success: false,
            message: "Certificate name and issuer are required",
          });
        }

        let imageSrc = "/images/certificate-placeholder.png";

        // Handle Image Upload (Base64 file or direct URL)
        if (image) {
          if (image.startsWith("data:image/")) {
            const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
            if (matches) {
              const mimeType = matches[1];
              const ext = mimeType.split("/")[1] || "png";
              const buffer = Buffer.from(matches[2], "base64");
              const fileName = imageFileName || `certificate-${Date.now()}.${ext}`;
              imageSrc = await uploadFileToStorage({
                fileBuffer: buffer,
                fileName,
                folder: "images/certificates",
                mimeType,
              });
            }
          } else {
            imageSrc = image;
          }
        }

        const newCertificate = {
          id: uuidv4(),
          name,
          issuer,
          date: date || new Date().toISOString().split("T")[0],
          verificationLink: verificationLink || "",
          imageSrc,
          createdAt: new Date().toISOString(),
        };

        const savedCertificate = await addCertificateDB(newCertificate);
        return res.status(201).json({ success: true, data: savedCertificate });
      } catch (error) {
        console.error("Error adding certificate:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "DELETE": {
      try {
        const { id } = req.body || req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: "Certificate ID is required" });
        }
        const success = await deleteCertificateDB(id);
        if (success) {
          return res.status(200).json({ success: true, message: "Certificate deleted successfully" });
        } else {
          return res.status(404).json({ success: false, message: "Certificate not found" });
        }
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
