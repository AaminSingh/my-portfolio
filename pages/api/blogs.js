import { getBlogsDB, addBlogDB, deleteBlogDB } from "../../utils/db";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const blogs = await getBlogsDB();
        return res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "POST": {
      try {
        const { title, content, date, tagline } = req.body;

        if (!title || !content) {
          return res.status(400).json({
            success: false,
            message: "Title and Content are required for blog posts",
          });
        }

        const id = uuidv4();
        const newBlog = {
          id,
          title,
          content,
          date: date || new Date().toISOString(),
          tagline: tagline || "",
        };

        const savedBlog = await addBlogDB(newBlog);
        return res.status(201).json({ success: true, data: savedBlog });
      } catch (error) {
        console.error("Error creating blog post:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case "DELETE": {
      try {
        const { id, slug } = req.body || req.query;
        const targetId = id || slug;
        if (!targetId) {
          return res.status(400).json({ success: false, message: "Blog ID or Slug is required" });
        }
        const success = await deleteBlogDB(targetId);
        if (success) {
          return res.status(200).json({ success: true, message: "Blog deleted successfully" });
        } else {
          return res.status(404).json({ success: false, message: "Blog post not found" });
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
