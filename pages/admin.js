import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_PASSWORD = "admin123";
const STORAGE_KEY = "portfolio_projects";
const AUTH_KEY = "portfolio_admin_auth";
const PASSWORD_KEY = "portfolio_admin_password";

// Default projects from portfolio.json (fallback)
const defaultProjects = [
  {
    id: "1",
    title: "RAG Chatbot",
    category: "AI / Generative AI",
    description:
      "An AI-powered Retrieval-Augmented Generation (RAG) chatbot that combines document retrieval with advanced language models to deliver accurate, context-aware, and factually grounded responses.",
    fullDescription:
      "An AI-powered Retrieval-Augmented Generation (RAG) chatbot that combines document retrieval with advanced language models to deliver accurate, context-aware, and factually grounded responses. Built with LangChain and Gemini API, featuring session-aware conversations and secure API configuration.",
    imageSrc: "/images/projects/rag-chatbot.png",
    github: "https://github.com/AaminSingh/RAG",
    technologies: [
      "Python",
      "Streamlit",
      "LangChain",
      "Gemini API",
      "FAISS",
      "HuggingFace Embeddings",
    ],
    highlights: [
      "LangChain Integration",
      "Gemini API",
      "Streamlit Interface",
      "Session-aware conversations",
      "Retrieval-Augmented Generation",
      "Secure API configuration",
      "Modular architecture",
      "Error handling and logging",
    ],
  },
  {
    id: "2",
    title: "LexAI (Simply Legal)",
    category: "LegalTech / AI",
    description:
      "An AI-powered legal document automation platform that simplifies contracts, agreements, and compliance by translating complex legal language into plain English and automating document creation.",
    fullDescription:
      "An AI-powered legal document automation platform that simplifies contracts, agreements, and compliance by translating complex legal language into plain English and automating document creation. Features Smart Intake Wizard, Dynamic Contract Generation, and RAG-powered clause retrieval.",
    imageSrc: "/images/projects/lexai-legal.png",
    github: "https://github.com/AaminSingh/SimplyLegal01",
    technologies: [
      "Next.js",
      "React",
      "TailwindCSS",
      "FastAPI",
      "Gemini API",
      "Supabase",
      "PyMuPDF",
    ],
    highlights: [
      "Smart Intake Wizard",
      "Dynamic Contract Generation",
      "AI Legal Assistant",
      "PDF Review Engine",
      "E-Signature System",
      "RAG-powered clause retrieval",
      "Risk detection",
    ],
  },
  {
    id: "3",
    title: "PRAMAAN – AI Powered Forensic Accountant",
    category: "FinTech / AI",
    description:
      "PRAMAAN is an autonomous AI forensic accountant that analyzes financial statements, auditor reports, cash flow statements, and corporate filings to uncover hidden risks, misleading claims, and financial inconsistencies.",
    fullDescription:
      "PRAMAAN is an autonomous AI forensic accountant that analyzes financial statements, auditor reports, cash flow statements, and corporate filings to uncover hidden risks, misleading claims, and financial inconsistencies. Features custom fine-tuned AI models and jargon-free reporting.",
    imageSrc: "/images/projects/pramaan-fintech.png",
    github: "",
    technologies: [
      "React 19",
      "TailwindCSS",
      "FastAPI",
      "Firebase",
      "Python",
      "Fine-tuned Llama 3",
      "Ollama",
      "Lightning AI",
    ],
    highlights: [
      "Financial fraud detection",
      "Cross-referencing corporate claims",
      "Custom fine-tuned AI",
      "Jargon-free reporting",
      "Investor intelligence platform",
      "Financial anomaly detection",
    ],
  },
  {
    id: "4",
    title: "VisionMeter",
    category: "HealthTech",
    description:
      "A browser-based eye screening platform that enables users to perform visual acuity, color vision, astigmatism, contrast sensitivity, and visual field tests using calibration-driven measurements.",
    fullDescription:
      "A browser-based eye screening platform that enables users to perform visual acuity, color vision, astigmatism, contrast sensitivity, and visual field tests using calibration-driven measurements. Features voice recognition and PDF report generation.",
    imageSrc: "/images/projects/visionmeter-health.png",
    github: "https://github.com/AaminSingh/VisionMeter",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "IndexedDB",
      "Web Speech API",
      "jsPDF",
    ],
    highlights: [
      "Visual Acuity Testing",
      "Color Vision Analysis",
      "Astigmatism Detection",
      "Contrast Sensitivity Test",
      "Visual Field Analysis",
      "Voice Recognition",
      "PDF Report Generation",
      "IndexedDB Session Storage",
    ],
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saveNotification, setSaveNotification] = useState("");
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fullDescription: "",
    imageSrc: "",
    github: "",
    technologies: "",
    highlights: "",
  });

  // Check auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load projects
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      }
    } catch (e) {
      // fall through
    }
    // Seed with defaults
    setProjects(defaultProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
  };

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
    setSaveNotification("Changes saved successfully!");
    setTimeout(() => setSaveNotification(""), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    router.push("/");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      fullDescription: "",
      imageSrc: "",
      github: "",
      technologies: "",
      highlights: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      fullDescription: project.fullDescription || "",
      imageSrc: project.imageSrc || "",
      github: project.github || "",
      technologies: (project.technologies || []).join(", "),
      highlights: (project.highlights || []).join(", "),
    });
    setEditingProject(project);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (projectId) => {
    const newProjects = projects.filter((p) => p.id !== projectId);
    saveProjects(newProjects);
    setDeleteConfirm(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      id: editingProject ? editingProject.id : uuidv4(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      imageSrc: formData.imageSrc,
      github: formData.github,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      highlights: formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
    };

    let newProjects;
    if (editingProject) {
      newProjects = projects.map((p) =>
        p.id === editingProject.id ? projectData : p
      );
    } else {
      newProjects = [...projects, projectData];
    }

    saveProjects(newProjects);
    resetForm();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, imageSrc: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const moveProject = (index, direction) => {
    const newProjects = [...projects];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    [newProjects[index], newProjects[targetIndex]] = [
      newProjects[targetIndex],
      newProjects[index],
    ];
    saveProjects(newProjects);
  };

  // ===== LOGIN SCREEN =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Head>
          <title>Admin – Portfolio</title>
        </Head>
        <div className="gradient-circle"></div>
        <div className="gradient-circle-bottom"></div>

        <div className="glass-modal p-8 w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                background: "linear-gradient(135deg, #ffffff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your password to manage projects
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="admin-input"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm mb-4">{loginError}</p>
            )}
            <button type="submit" className="admin-btn admin-btn-primary w-full">
              Login
            </button>
          </form>

          <button
            onClick={() => router.push("/")}
            className="admin-btn admin-btn-secondary w-full mt-3"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  // ===== ADMIN DASHBOARD =====
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Admin Dashboard – Portfolio</title>
      </Head>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      {/* Save Notification */}
      {saveNotification && (
        <div
          className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, #a855f7, #6366f1)",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          ✓ {saveNotification}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between mb-8 gap-4">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{
                background: "linear-gradient(135deg, #ffffff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Project Manager
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""} •
              Changes sync to your portfolio automatically
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAddNew} className="admin-btn admin-btn-primary">
              + Add Project
            </button>
            <button onClick={() => router.push("/")} className="admin-btn admin-btn-secondary">
              View Portfolio
            </button>
            <button onClick={handleLogout} className="admin-btn admin-btn-danger">
              Logout
            </button>
          </div>
        </div>

        {/* ===== ADD/EDIT FORM ===== */}
        {showForm && (
          <div className="glass-modal p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="admin-input"
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="admin-input"
                    placeholder="e.g. AI / Generative AI"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Short Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="admin-input"
                  rows={2}
                  placeholder="Brief project description"
                  required
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Full Description
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: e.target.value,
                    }))
                  }
                  className="admin-input"
                  rows={3}
                  placeholder="Detailed project description (shown in modal)"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }))
                    }
                    className="admin-input"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={
                      formData.imageSrc.startsWith("data:")
                        ? "(Uploaded image)"
                        : formData.imageSrc
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageSrc: e.target.value,
                      }))
                    }
                    className="admin-input"
                    placeholder="/images/projects/my-image.png"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Or Upload Image (max 5MB)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="admin-input"
                  style={{ padding: "8px" }}
                />
                {formData.imageSrc && (
                  <div className="mt-2 rounded-lg overflow-hidden" style={{ maxWidth: "200px", maxHeight: "120px" }}>
                    <img
                      src={formData.imageSrc}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        technologies: e.target.value,
                      }))
                    }
                    className="admin-input"
                    placeholder="React, Python, FastAPI, ..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Highlights (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.highlights}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        highlights: e.target.value,
                      }))
                    }
                    className="admin-input"
                    placeholder="Feature 1, Feature 2, ..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===== PROJECT LIST ===== */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="admin-card">
              <div className="flex flex-col tablet:flex-row gap-4">
                {/* Image */}
                {project.imageSrc && (
                  <div
                    className="flex-shrink-0 rounded-lg overflow-hidden"
                    style={{
                      width: "160px",
                      height: "100px",
                      minWidth: "160px",
                    }}
                  >
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {project.title}
                      </h3>
                      <span className="category-badge text-xs">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Reorder buttons */}
                      <button
                        onClick={() => moveProject(index, -1)}
                        disabled={index === 0}
                        className="admin-btn admin-btn-secondary p-2 disabled:opacity-30"
                        title="Move up"
                        style={{ padding: "6px 10px", fontSize: "12px" }}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveProject(index, 1)}
                        disabled={index === projects.length - 1}
                        className="admin-btn admin-btn-secondary p-2 disabled:opacity-30"
                        title="Move down"
                        style={{ padding: "6px 10px", fontSize: "12px" }}
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-1" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies &&
                      project.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="tech-badge" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex tablet:flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="admin-btn admin-btn-secondary flex-1 tablet:flex-none"
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                  >
                    ✏️ Edit
                  </button>
                  {deleteConfirm === project.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="admin-btn admin-btn-danger"
                        style={{ fontSize: "0.75rem", padding: "6px 10px" }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="admin-btn admin-btn-secondary"
                        style={{ fontSize: "0.75rem", padding: "6px 10px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(project.id)}
                      className="admin-btn admin-btn-danger flex-1 tablet:flex-none"
                      style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No projects yet</p>
            <button
              onClick={handleAddNew}
              className="admin-btn admin-btn-primary"
            >
              + Add Your First Project
            </button>
          </div>
        )}

        {/* Change Password Section */}
        <div className="mt-12 mb-8">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

// ===== CHANGE PASSWORD COMPONENT =====
function ChangePassword() {
  const [showSection, setShowSection] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    const storedPassword =
      localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

    if (currentPw !== storedPassword) {
      setMessage("Current password is incorrect.");
      return;
    }
    if (newPw.length < 4) {
      setMessage("New password must be at least 4 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setMessage("New passwords do not match.");
      return;
    }

    localStorage.setItem(PASSWORD_KEY, newPw);
    setMessage("Password changed successfully!");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!showSection) {
    return (
      <button
        onClick={() => setShowSection(true)}
        className="admin-btn admin-btn-secondary text-sm"
      >
        🔒 Change Password
      </button>
    );
  }

  return (
    <div className="admin-card max-w-md">
      <h3 className="text-lg font-bold mb-4">Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <div className="space-y-3 mb-4">
          <input
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="Current password"
            className="admin-input"
            required
          />
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="New password"
            className="admin-input"
            required
          />
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Confirm new password"
            className="admin-input"
            required
          />
        </div>
        {message && (
          <p
            className={`text-sm mb-3 ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex gap-2">
          <button type="submit" className="admin-btn admin-btn-primary">
            Update Password
          </button>
          <button
            type="button"
            onClick={() => setShowSection(false)}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
