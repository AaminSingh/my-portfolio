import { getProjectsDB, addProjectDB, deleteProjectDB } from "../../utils/db";
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
        const projects = await getProjectsDB();
        return res.status(200).json({ success: true, data: projects });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "POST": {
      try {
        const {
          title,
          description,
          fullDescription,
          technologies,
          github,
          liveLink,
          image,
          imageFileName,
        } = req.body;

        if (!title || !description) {
          return res.status(400).json({
            success: false,
            message: "Title and description are required",
          });
        }

        let imageSrc = "/images/portfolio-placeholder.png";

        // Handle Image Upload (Base64 file or uploaded file link)
        if (image) {
          if (image.startsWith("data:image/")) {
            const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
            if (matches) {
              const mimeType = matches[1];
              const ext = mimeType.split("/")[1] || "png";
              const buffer = Buffer.from(matches[2], "base64");
              const fileName = imageFileName || `project-${Date.now()}.${ext}`;
              imageSrc = await uploadFileToStorage({
                fileBuffer: buffer,
                fileName,
                folder: "images/projects",
                mimeType,
              });
            }
          } else {
            imageSrc = image;
          }
        }

        // Tech stack handling (array or comma-separated string)
        let techArray = [];
        if (Array.isArray(technologies)) {
          techArray = technologies;
        } else if (typeof technologies === "string") {
          techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);
        }

        const newProject = {
          id: uuidv4(),
          title,
          description,
          fullDescription: fullDescription || description,
          technologies: techArray,
          github: github || "",
          liveLink: liveLink || "",
          imageSrc,
          createdAt: new Date().toISOString(),
        };

        const savedProject = await addProjectDB(newProject);
        return res.status(201).json({ success: true, data: savedProject });
      } catch (error) {
        console.error("Error adding project:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "DELETE": {
      try {
        const { id } = req.body || req.query;
        if (!id) {
          return res.status(400).json({ success: false, message: "Project ID is required" });
        }
        const success = await deleteProjectDB(id);
        if (success) {
          return res.status(200).json({ success: true, message: "Project deleted successfully" });
        } else {
          return res.status(404).json({ success: false, message: "Project not found" });
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
