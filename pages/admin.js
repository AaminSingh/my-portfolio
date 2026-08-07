import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const DEFAULT_PASSWORD = "admin123";
const AUTH_KEY = "portfolio_admin_auth";
const PASSWORD_KEY = "portfolio_admin_password";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // Check auth status on mount
  useEffect(() => {
    const isAuth = localStorage.getItem(AUTH_KEY) === "true";
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  const triggerNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === storedPassword) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Default is 'admin123'");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <Head>
          <title>Admin Login | Portfolio</title>
        </Head>
        <div className="glass-modal p-8 max-w-md w-full rounded-2xl shadow-2xl border border-purple-500/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/30 text-2xl font-bold">
              🔐
            </div>
            <h1 className="text-2xl font-extrabold text-white">Portfolio Admin</h1>
            <p className="text-slate-400 text-sm mt-1">Authenticate to access content dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
            {loginError && <p className="text-red-400 text-xs font-medium">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Head>
        <title>Admin Dashboard | Content Management</title>
      </Head>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">Portfolio Admin Dashboard</h1>
              <p className="text-xs text-purple-400 font-mono">Dynamic NoSQL & Storage API Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" legacyBehavior>
              <a target="_blank" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span>👁️</span> View Site
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 transition-colors bg-red-950/40 hover:bg-red-950/70 border border-red-900/50 px-3 py-1.5 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      {notification.show && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl border flex items-center gap-3 transition-all transform translate-y-0 ${
            notification.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
              : "bg-red-950/90 text-red-300 border-red-500/40"
          }`}
        >
          <span className="text-lg">{notification.type === "success" ? "✅" : "⚠️"}</span>
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 mb-8 overflow-x-auto pb-1">
          <TabButton
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
            icon="🚀"
            label="Projects"
          />
          <TabButton
            active={activeTab === "certificates"}
            onClick={() => setActiveTab("certificates")}
            icon="📜"
            label="Certificates"
          />
          <TabButton
            active={activeTab === "blogs"}
            onClick={() => setActiveTab("blogs")}
            icon="📝"
            label="Blogs"
          />
          <TabButton
            active={activeTab === "resume"}
            onClick={() => setActiveTab("resume")}
            icon="📄"
            label="Resume PDF"
          />
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "projects" && <ProjectsSection notify={triggerNotification} />}
          {activeTab === "certificates" && <CertificatesSection notify={triggerNotification} />}
          {activeTab === "blogs" && <BlogsSection notify={triggerNotification} />}
          {activeTab === "resume" && <ResumeSection notify={triggerNotification} />}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-5 py-3 rounded-t-xl font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
        active
          ? "border-purple-500 text-purple-400 bg-purple-950/30 font-semibold"
          : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* =========================================================================
   PROJECTS SECTION
   ========================================================================= */
function ProjectsSection({ notify }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [github, setGithub] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const fileInputRef = useRef(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
      }
    } catch (err) {
      console.error(err);
      notify("error", "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        notify("error", "Image file must be under 8MB");
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      notify("error", "Title and description are required");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        description,
        fullDescription,
        technologies: techStackInput,
        github,
        liveLink,
        image: imagePreview,
        imageFileName,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        notify("success", "Project added successfully!");
        setTitle("");
        setDescription("");
        setFullDescription("");
        setTechStackInput("");
        setGithub("");
        setLiveLink("");
        setImagePreview(null);
        setImageFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchProjects();
      } else {
        notify("error", result.message || "Failed to add project");
      }
    } catch (err) {
      console.error(err);
      notify("error", "An error occurred while saving project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        notify("success", "Project deleted successfully");
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        notify("error", result.message || "Failed to delete project");
      }
    } catch (err) {
      notify("error", "Error deleting project");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Column */}
      <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>➕</span> Add New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Financial Auditor"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Short Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief summary of what this project accomplishes..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Description / Highlights</label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={3}
              placeholder="Detailed architecture notes or features list..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Tech Stack Array <span className="text-slate-500 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="React, Next.js, Python, FastAPI, TailwindCSS"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
            {techStackInput && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {techStackInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tech, idx) => (
                    <span key={idx} className="bg-purple-900/40 text-purple-300 text-xs px-2 py-0.5 rounded border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">GitHub Link</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Live Link</label>
              <input
                type="url"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Project Image Upload</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-purple-300 hover:file:bg-purple-900 border border-slate-800 rounded-xl p-1 bg-slate-950"
            />
            {imagePreview && (
              <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {submitting ? "Saving Project..." : "Publish Project"}
          </button>
        </form>
      </div>

      {/* Projects List Column */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
          <span>📁 Manage Existing Projects</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
            {projects.length} Total
          </span>
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            No projects found. Add one using the form!
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row gap-5 items-start"
              >
                {proj.imageSrc && (
                  <div className="w-full md:w-36 h-28 bg-slate-950 rounded-xl overflow-hidden flex-shrink-0 border border-slate-800">
                    <img
                      src={proj.imageSrc}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Project";
                      }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg text-white truncate">{proj.title}</h3>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-xs bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white px-2.5 py-1 rounded-lg border border-red-800/50 transition-colors ml-2"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-3 text-xs">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                        GitHub ↗
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   CERTIFICATES SECTION
   ========================================================================= */
function CertificatesSection({ notify }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [verificationLink, setVerificationLink] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const fileInputRef = useRef(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data || []);
      }
    } catch (err) {
      console.error(err);
      notify("error", "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        notify("error", "Image file size should be less than 8MB");
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !issuer.trim()) {
      notify("error", "Certificate Name and Issuer are required");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        issuer,
        date,
        verificationLink,
        image: imagePreview,
        imageFileName,
      };

      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        notify("success", "Certificate added successfully!");
        setName("");
        setIssuer("");
        setDate("");
        setVerificationLink("");
        setImagePreview(null);
        setImageFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchCertificates();
      } else {
        notify("error", result.message || "Failed to add certificate");
      }
    } catch (err) {
      console.error(err);
      notify("error", "Error saving certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      const res = await fetch("/api/certificates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        notify("success", "Certificate deleted");
        setCertificates(certificates.filter((c) => c.id !== id));
      } else {
        notify("error", result.message || "Failed to delete certificate");
      }
    } catch (err) {
      notify("error", "Error deleting certificate");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Column */}
      <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📜</span> Add Certificate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Certificate Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AWS Certified Solutions Architect"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Issuer / Organization *</label>
            <input
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. Amazon Web Services / Google Cloud"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Issue Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Verification Link</label>
            <input
              type="url"
              value={verificationLink}
              onChange={(e) => setVerificationLink(e.target.value)}
              placeholder="https://credly.com/verify/..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Certificate Image / Badge Upload</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-purple-300 hover:file:bg-purple-900 border border-slate-800 rounded-xl p-1 bg-slate-950"
            />
            {imagePreview && (
              <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Certificate Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {submitting ? "Adding Certificate..." : "Save Certificate"}
          </button>
        </form>
      </div>

      {/* Certificates List Column */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
          <span>🏅 Manage Certificates</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
            {certificates.length} Total
          </span>
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            Loading certificates...
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            No certificates added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/30 transition-all"
              >
                <div>
                  {cert.imageSrc && (
                    <div className="w-full h-32 bg-slate-950 rounded-xl overflow-hidden mb-3 border border-slate-800">
                      <img
                        src={cert.imageSrc}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/200?text=Certificate";
                        }}
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-white line-clamp-1">{cert.name}</h3>
                  <p className="text-xs text-purple-400 font-medium mt-0.5">{cert.issuer}</p>
                  {cert.date && <p className="text-[11px] text-slate-400 mt-1">Issued: {cert.date}</p>}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
                  {cert.verificationLink ? (
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Verify ↗
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500">No link</span>
                  )}
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="text-xs bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white px-2.5 py-1 rounded-lg border border-red-800/50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   BLOGS SECTION
   ========================================================================= */
function BlogsSection({ notify }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error(err);
      notify("error", "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      notify("error", "Title and content are required for blog posts");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { title, tagline, date, content };
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        notify("success", "Blog post published successfully!");
        setTitle("");
        setTagline("");
        setContent("");
        setDate(new Date().toISOString().split("T")[0]);
        fetchBlogs();
      } else {
        notify("error", result.message || "Failed to create blog post");
      }
    } catch (err) {
      console.error(err);
      notify("error", "Error creating blog post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        notify("success", "Blog post deleted");
        setBlogs(blogs.filter((b) => b.id !== id && b.slug !== id));
      } else {
        notify("error", result.message || "Failed to delete blog post");
      }
    } catch (err) {
      notify("error", "Error deleting blog post");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Column */}
      <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📝</span> Create Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Blog Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building RAG Applications with LangChain & Gemini"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Tagline / Subtitle</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="A deep dive into..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold uppercase text-slate-400">Content (Markdown / Text) *</label>
              <span className="text-[10px] text-slate-500 font-mono">{content.length} characters</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Write your article content here in Markdown syntax..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {submitting ? "Publishing Blog Post..." : "Publish Article"}
          </button>
        </form>
      </div>

      {/* Blogs List Column */}
      <div className="lg:col-span-6 space-y-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
          <span>📚 Published Articles</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
            {blogs.length} Posts
          </span>
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            Loading articles...
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            No blog posts published yet.
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog.id || blog.slug}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base text-white">{blog.title}</h3>
                    <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap ml-3">
                      {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                    </span>
                  </div>
                  {blog.tagline && <p className="text-xs text-purple-400 italic mt-1">{blog.tagline}</p>}
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    {blog.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => handleDelete(blog.id || blog.slug)}
                    className="text-xs bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white px-3 py-1 rounded-lg border border-red-800/50 transition-colors"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   RESUME SECTION (DEDICATED PDF FILE UPLOAD COMPONENT)
   ========================================================================= */
function ResumeSection({ notify }) {
  const [currentResume, setCurrentResume] = useState("/resume.pdf");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchResumeInfo = async () => {
    try {
      const res = await fetch("/api/resume");
      const data = await res.json();
      if (data.success && data.data) {
        setCurrentResume(data.data.resumeUrl || "/resume.pdf");
        setUpdatedAt(data.data.updatedAt);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        notify("error", "Please upload a valid PDF document");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        notify("error", "PDF file size must be less than 15MB");
        return;
      }
      setSelectedFile(file);
      setPreviewName(file.name);
    }
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      notify("error", "Please select a PDF file first");
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64Data,
            fileName: selectedFile.name,
          }),
        });

        const result = await res.json();
        if (result.success) {
          notify("success", "Resume PDF updated successfully!");
          setCurrentResume(result.data.resumeUrl);
          setUpdatedAt(new Date().toISOString());
          setSelectedFile(null);
          setPreviewName("");
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          notify("error", result.message || "Failed to upload resume");
        }
        setUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error(err);
      notify("error", "Error uploading resume file");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Upload Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl border border-purple-500/30">
            📑
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Replace PDF Resume</h2>
            <p className="text-xs text-slate-400">Upload your latest CV in PDF format to update portfolio link</p>
          </div>
        </div>

        {/* Current Active Resume Status */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📄</span>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Active Resume URL</p>
              <p className="text-sm font-mono text-purple-300 truncate max-w-md">{currentResume}</p>
              {updatedAt && (
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Last updated: {new Date(updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <a
            href={currentResume}
            target="_blank"
            rel="noreferrer"
            className="text-xs bg-purple-950 text-purple-300 hover:bg-purple-900 border border-purple-500/30 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>👁️</span> Preview PDF
          </a>
        </div>

        {/* Upload Form Area */}
        <form onSubmit={handleUploadResume} className="space-y-6">
          <div
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              selectedFile
                ? "border-emerald-500/50 bg-emerald-950/10"
                : "border-slate-700 hover:border-purple-500/60 bg-slate-950/40 hover:bg-slate-950/80"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="mx-auto w-14 h-14 rounded-full bg-slate-800/60 flex items-center justify-center text-2xl mb-3 text-purple-400">
              {selectedFile ? "✅" : "📤"}
            </div>

            {selectedFile ? (
              <div>
                <p className="text-sm font-semibold text-emerald-400">{previewName}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-slate-200">
                  Click to select PDF or drag and drop file here
                </p>
                <p className="text-xs text-slate-500 mt-1">Maximum file size: 15MB (PDF only)</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-2xl transition shadow-xl shadow-purple-500/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>⚡</span>
            <span>{uploading ? "Uploading PDF Resume..." : "Upload & Replace Resume"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
