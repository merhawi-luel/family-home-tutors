// app/stories/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function StoriesPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("tutor_stories") || "[]");
    setPosts(savedPosts);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tighter">
          Tutor Voices & Tips
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Insights, success stories, and educational advice from the tutors at
          Family Home Tutors Agency.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400 italic text-center">
          No stories have been shared yet...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-3xl overflow-hidden shadow-md border border-gray-700 flex flex-col group hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              {post.photo && (
                <div className="h-64 overflow-hidden">
                  <img
                    src={post.photo}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-sm text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  Posted by {post.tutorName}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                  {post.title}
                </h3>

                {/* ✅ SCROLL AREA (VERTICAL ONLY) */}
                <div className="flex-1 max-h-40 overflow-y-auto overflow-x-hidden pr-2 break-words scroll-smooth">
                  <p className="text-slate-300 text-base leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Date */}
                <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-gray-700">
                  {new Date(post.id).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}