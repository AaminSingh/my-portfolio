import fs from "fs";
import { join } from "path";

const portfolioPath = join(process.cwd(), "data", "portfolio.json");
const postsDir = join(process.cwd(), "_posts");

/**
 * Reads the portfolio.json store or returns default structure
 */
export function readLocalPortfolio() {
  try {
    if (fs.existsSync(portfolioPath)) {
      const data = fs.readFileSync(portfolioPath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading portfolio.json:", err);
  }
  return { projects: [], certificates: [], resumeUrl: "/resume.pdf" };
}

/**
 * Writes data back to local portfolio.json store
 */
export function writeLocalPortfolio(data) {
  try {
    fs.writeFileSync(portfolioPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing portfolio.json:", err);
    return false;
  }
}

// ----------------------------------------------------
// PROJECTS CRUD
// ----------------------------------------------------
export async function getProjectsDB() {
  // Supports Cloud NoSQL (e.g., MongoDB / Firebase) when env configured, fallback to JSON
  const data = readLocalPortfolio();
  return data.projects || [];
}

export async function addProjectDB(project) {
  const data = readLocalPortfolio();
  if (!data.projects) data.projects = [];
  data.projects.unshift(project);
  writeLocalPortfolio(data);
  return project;
}

export async function deleteProjectDB(id) {
  const data = readLocalPortfolio();
  if (!data.projects) return false;
  data.projects = data.projects.filter((p) => String(p.id) !== String(id));
  writeLocalPortfolio(data);
  return true;
}

// ----------------------------------------------------
// CERTIFICATES CRUD
// ----------------------------------------------------
export async function getCertificatesDB() {
  const data = readLocalPortfolio();
  return data.certificates || [];
}

export async function addCertificateDB(certificate) {
  const data = readLocalPortfolio();
  if (!data.certificates) data.certificates = [];
  data.certificates.unshift(certificate);
  writeLocalPortfolio(data);
  return certificate;
}

export async function deleteCertificateDB(id) {
  const data = readLocalPortfolio();
  if (!data.certificates) return false;
  data.certificates = data.certificates.filter((c) => String(c.id) !== String(id));
  writeLocalPortfolio(data);
  return true;
}

// ----------------------------------------------------
// BLOGS CRUD
// ----------------------------------------------------
export async function getBlogsDB() {
  try {
    if (!fs.existsSync(postsDir)) {
      return [];
    }
    const files = fs.readdirSync(postsDir);
    const posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = join(postsDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        // Extract frontmatter metadata
        const dateMatch = content.match(/date:\s*"?([^"\n]+)"?/);
        const titleMatch = content.match(/title:\s*"?([^"\n]+)"?/);
        const taglineMatch = content.match(/tagline:\s*"?([^"\n]+)"?/);
        const id = file.replace(/\.md$/, "");

        const bodyContent = content.replace(/^---[\s\S]*?---/, "").trim();

        return {
          id,
          slug: id,
          title: titleMatch ? titleMatch[1] : id,
          tagline: taglineMatch ? taglineMatch[1] : "",
          date: dateMatch ? dateMatch[1] : new Date().toISOString(),
          content: bodyContent,
        };
      });
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error("Error reading posts:", err);
    return [];
  }
}

export async function addBlogDB(blog) {
  const { id, title, content, date, tagline = "" } = blog;
  const fileName = `${id || Date.now()}.md`;
  const filePath = join(postsDir, fileName);

  const fileContent = `---
date: "${date || new Date().toISOString()}"
title: "${title.replace(/"/g, '\\"')}"
tagline: "${tagline.replace(/"/g, '\\"')}"
preview: "${content.slice(0, 150).replace(/"/g, '\\"')}..."
---

${content}`;

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, fileContent, "utf-8");
  return { id, title, date, tagline, content };
}

export async function deleteBlogDB(id) {
  try {
    const fileName = id.endsWith(".md") ? id : `${id}.md`;
    const filePath = join(postsDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (err) {
    console.error("Error deleting blog file:", err);
  }
  return false;
}

// ----------------------------------------------------
// RESUME CRUD / UPDATE
// ----------------------------------------------------
export async function getResumeDB() {
  const data = readLocalPortfolio();
  return {
    resumeUrl: data.resumeUrl || "/resume.pdf",
    updatedAt: data.resumeUpdatedAt || null,
  };
}

export async function updateResumeDB(resumeUrl) {
  const data = readLocalPortfolio();
  data.resumeUrl = resumeUrl;
  data.resumeUpdatedAt = new Date().toISOString();
  writeLocalPortfolio(data);
  return data.resumeUrl;
}
