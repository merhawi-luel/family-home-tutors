// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  // --- LOGIN STATE ---
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const SECRET_PASSWORD = "tutor-admin-2026";

  // --- JOB FORM STATE ---
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [pay, setPay] = useState("");
  const [desc, setDesc] = useState("");
  const [gender, setGender] = useState("Both"); // New field

  // --- BLOG/ARTICLE STATE ---
  const [postTitle, setPostTitle] = useState("");
  const [postTutor, setPostTutor] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState("");

  // --- DATA STATE ---
  const [jobs, setJobs] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  // --- LOAD DATA FROM LOCALSTORAGE ---
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("tutor_jobs") || "[]");
    const savedStories = JSON.parse(localStorage.getItem("tutor_stories") || "[]");
    setJobs(savedJobs);
    setStories(savedStories);
  }, []);

  // --- HANDLERS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handlePublishJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = { title, location, grade, pay, description: desc, gender, id: Date.now() };
    const updatedJobs = [newJob, ...jobs];
    localStorage.setItem("tutor_jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
    alert("Job Published!");
    setTitle(""); setLocation(""); setGrade(""); setPay(""); setDesc(""); setGender("Both");
  };

  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory = { id: Date.now(), title: postTitle, tutorName: postTutor, content: postContent, photo: postPhoto };
    const updatedStories = [newStory, ...stories];
    localStorage.setItem("tutor_stories", JSON.stringify(updatedStories));
    setStories(updatedStories);
    alert("Story Published Successfully!");
    setPostTitle(""); setPostTutor(""); setPostContent(""); setPostPhoto("");
  };

  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to remove this job posting?")) {
      const updatedJobs = jobs.filter(job => job.id !== id);
      localStorage.setItem("tutor_jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
      alert("Job removed!");
    }
  };

  const handleDeleteStory = (id: number) => {
    if (confirm("Are you sure you want to remove this story?")) {
      const updatedStories = stories.filter(story => story.id !== id);
      localStorage.setItem("tutor_stories", JSON.stringify(updatedStories));
      setStories(updatedStories);
      alert("Story removed!");
    }
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Agency Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black">Admin Panel</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </div>

        {/* SECTION 1: JOB POSTINGS */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 underline decoration-4 underline-offset-8">1. Post a New Job Opening</h2>
          <form onSubmit={handlePublishJob} className="bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-700 space-y-4 text-white">
            <input required placeholder="Job Title" className="w-full p-3 border rounded-lg bg-gray-900" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="grid grid-cols-3 gap-4">
              <input required placeholder="Location" className="w-full p-3 border rounded-lg bg-gray-900" value={location} onChange={(e) => setLocation(e.target.value)} />
              <input required placeholder="Grade" className="w-full p-3 border rounded-lg bg-gray-900" value={grade} onChange={(e) => setGrade(e.target.value)} />
              {/* Gender selection */}
              <select className="w-full p-3 border rounded-lg bg-gray-900 text-white" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Both">Both</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <input required placeholder="Pay Rate" className="w-full p-3 border rounded-lg bg-gray-900" value={pay} onChange={(e) => setPay(e.target.value)} />
            <textarea required placeholder="Description" className="w-full p-3 border rounded-lg bg-gray-900 h-32" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">Publish Job</button>
          </form>

          {/* Job List with Delete */}
          <div className="mt-8 space-y-4">
            {jobs.length === 0 ? (
              <p className="text-gray-400 italic">No jobs posted yet.</p>
            ) : (
              jobs.map(job => (
                <div key={job.id} className="flex justify-between items-center bg-gray-900 p-4 rounded-xl">
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-gray-400">{job.location} | {job.grade} | {job.gender}</p>
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

        {/* SECTION 2: TUTOR STORIES */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-emerald-400 underline decoration-4 underline-offset-8">2. Publish a Tutor Voice (Blog)</h2>
          <form onSubmit={handlePublishStory} className="bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-700 space-y-4 text-white">
            <input required placeholder="Article Title" className="w-full p-3 border rounded-lg bg-gray-900" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Author Name" className="w-full p-3 border rounded-lg bg-gray-900" value={postTutor} onChange={(e) => setPostTutor(e.target.value)} />
              <input placeholder="Image Link (URL)" className="w-full p-3 border rounded-lg bg-gray-900" value={postPhoto} onChange={(e) => setPostPhoto(e.target.value)} />
            </div>
            <textarea required placeholder="Article Content..." className="w-full p-3 border rounded-lg bg-gray-900 h-60" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">Publish Article</button>
          </form>

          {/* Story List with Delete */}
          <div className="mt-8 space-y-4">
            {stories.length === 0 ? (
              <p className="text-gray-400 italic">No stories posted yet.</p>
            ) : (
              stories.map(story => (
                <div key={story.id} className="flex justify-between items-center bg-gray-900 p-4 rounded-xl">
                  <div>
                    <h3 className="font-bold">{story.title}</h3>
                    <p className="text-gray-400">By: {story.tutorName}</p>
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