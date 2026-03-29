"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  // --- LOGIN STATE ---
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const SECRET_PASSWORD = "tutor-admin-2026"; // simple login

  // --- JOB FORM STATE ---
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [pay, setPay] = useState("");
  const [desc, setDesc] = useState("");
  const [gender, setGender] = useState("Both");
  const [jobs, setJobs] = useState<any[]>([]);

  // --- STORY FORM STATE ---
  const [postTitle, setPostTitle] = useState("");
  const [postTutor, setPostTutor] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState("");
  const [stories, setStories] = useState<any[]>([]);

  // --- FETCH JOBS ---
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
    }
  };

  // --- FETCH STORIES ---
  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
      setStories([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchJobs();
      fetchStories();
    }
  }, [isLoggedIn]);

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again!");
    }
  };

  // --- ADD JOB ---
  const handlePublishJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = { title, location, grade, pay, description: desc, gender };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Server error:", data);
        alert(data?.error || "Failed to publish job.");
        return;
      }

      setJobs((prev) => [data, ...prev]);

      setTitle("");
      setLocation("");
      setGrade("");
      setPay("");
      setDesc("");
      setGender("Both");

      alert("✅ Job Published!");
    } catch (err) {
      console.error("❌ Publish error:", err);
      alert("Failed to publish job.");
    }
  };

  // --- DELETE JOB ---
  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to remove this job?")) return;
    try {
      const res = await fetch("/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs(jobs.filter((job) => job.id !== id));
      alert("Job removed!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  // --- ADD STORY ---
  const handlePublishStory = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStory = {
      title: postTitle,
      tutorName: postTutor,
      content: postContent,
      photo: postPhoto,
    };

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStory),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Story error:", data);
        alert(data?.error || "Failed to publish story");
        return;
      }

      setStories((prev) => [data, ...prev]);

      setPostTitle("");
      setPostTutor("");
      setPostContent("");
      setPostPhoto("");

      alert("✅ Story Published!");
    } catch (err) {
      console.error(err);
      alert("Failed to publish story.");
    }
  };

  // --- DELETE STORY ---
  const handleDeleteStory = async (id: number) => {
    if (!confirm("Delete this story?")) return;

    try {
      const res = await fetch("/api/stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");

      setStories(stories.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete story");
    }
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-4 w-full max-w-md text-white"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {loginError && <p className="text-red-500">{loginError}</p>}

          <button className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black">Admin Panel</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* ----------------- JOB SECTION ----------------- */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 underline decoration-4 underline-offset-8">
            1. Post a New Job Opening
          </h2>
          <form
            onSubmit={handlePublishJob}
            className="bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-700 space-y-4 text-white"
          >
            <input
              required
              placeholder="Job Title"
              className="w-full p-3 border rounded-lg bg-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                required
                placeholder="Location"
                className="w-full p-3 border rounded-lg bg-gray-900"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                required
                placeholder="Grade"
                className="w-full p-3 border rounded-lg bg-gray-900"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
              <select
                className="w-full p-3 border rounded-lg bg-gray-900 text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Both">Both</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <input
              required
              placeholder="Pay Rate"
              className="w-full p-3 border rounded-lg bg-gray-900"
              value={pay}
              onChange={(e) => setPay(e.target.value)}
            />
            <textarea
              required
              placeholder="Description"
              className="w-full p-3 border rounded-lg bg-gray-900 h-32"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Publish Job
            </button>
          </form>

          {/* Job List */}
          <div className="mt-8 space-y-4">
            {(jobs || []).length === 0 ? (
              <p className="text-gray-400 italic">No jobs posted yet.</p>
            ) : (
              (jobs || []).map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between items-center bg-gray-900 p-4 rounded-xl"
                >
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-gray-400">
                      {job.location} | {job.grade} | {job.gender}
                    </p>
                    <p className="text-gray-300">{job.pay}</p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ----------------- STORY SECTION ----------------- */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-green-400 underline decoration-4 underline-offset-8">
            2. Post a New Tutor Story
          </h2>
          <form
            onSubmit={handlePublishStory}
            className="bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-700 space-y-4 text-white"
          >
            <input
              required
              placeholder="Story Title"
              className="w-full p-3 border rounded-lg bg-gray-900"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <input
              required
              placeholder="Tutor Name"
              className="w-full p-3 border rounded-lg bg-gray-900"
              value={postTutor}
              onChange={(e) => setPostTutor(e.target.value)}
            />
            <input
              required
              placeholder="Photo URL"
              className="w-full p-3 border rounded-lg bg-gray-900"
              value={postPhoto}
              onChange={(e) => setPostPhoto(e.target.value)}
            />
            <textarea
              required
              placeholder="Content"
              className="w-full p-3 border rounded-lg bg-gray-900 h-32"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
            >
              Publish Story
            </button>
          </form>

          {/* Story List */}
          <div className="mt-8 space-y-4">
            {(stories || []).length === 0 ? (
              <p className="text-gray-400 italic">No stories posted yet.</p>
            ) : (
              (stories || []).map((story) => (
                <div
                  key={story.id}
                  className="flex justify-between items-center bg-gray-900 p-4 rounded-xl"
                >
                  <div>
                    <h3 className="font-bold">{story.title}</h3>
                    <p className="text-gray-400">by {story.tutorName}</p>
                    <p className="text-gray-300">{story.content}</p>
                    {story.photo && (
                      <img
                        src={story.photo}
                        alt={story.title}
                        className="mt-2 max-h-32 rounded-lg"
                      />
                    )}
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
                    onClick={() => handleDeleteStory(story.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}