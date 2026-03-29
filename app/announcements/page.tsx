"use client";

import { useEffect, useState } from "react";

export default function AnnouncementsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  // Fetch from API
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

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Tutor Opportunities</h1>
        <p className="text-slate-400 mb-12 text-lg">
          Current openings for our home tutoring team. Find a position that matches your skills and preference.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="p-20 border-2 border-dashed border-gray-700 rounded-3xl text-center">
          <p className="text-slate-400 font-medium">
            No active openings right now. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {jobs.map((job: any) => (
            <div
              key={job.id}
              className="bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>

                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {job.grade}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      job.gender === "Male"
                        ? "bg-blue-400 text-white"
                        : job.gender === "Female"
                        ? "bg-pink-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {job.gender}
                  </span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                    {job.location}
                  </span>
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed max-w-xl">{job.description}</p>

                <p className="text-blue-400 font-bold text-lg">Payment: {job.pay}</p>
              </div>

              <a
                href="https://forms.google.com"
                target="_blank"
                className="mt-6 md:mt-0 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}