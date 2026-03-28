// app/page.tsx
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full">

      {/* Hero / Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] py-32 px-6 text-center">
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Welcome to Family Home Tutors
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed mb-6">
            Personalized tutoring for students from KG to Grade 12+ across Ethiopia, 
            supporting both home-based and online learning.
          </p>

          <p className="text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed mb-10">
            Since 2023, we have helped students improve academically through dedicated, 
            high-quality teaching and consistent support.
          </p>

          
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] py-32 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Start Your Learning Journey Today
        </h2>

        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
          Find the right tutor or join our growing network of educators.
        </p>

        <div className="flex justify-center gap-4">
          <Link 
            href="/contact" 
            className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Find a Tutor
          </Link>

          <Link 
            href="/announcements" 
            className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Join as Tutor
          </Link>
        </div>
      </section>

      {/* Info / Story Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-24 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <p className="text-lg text-slate-800 leading-relaxed mb-6">
      Starting in Addis Ababa, our service has expanded to Bahir Dar, Adama, 
      Shashemene, and Hawassa — connecting families with reliable and skilled tutors.
    </p>

    <p className="text-lg text-slate-800 leading-relaxed mb-10">
      We focus on affordability, quality education, and matching each student 
      with the right tutor to ensure effective learning.
    </p>

    <p className="text-slate-900 font-semibold text-lg">
      CEO: <span className="text-blue-700">Ayan</span>
    </p>
  </div>
</section>



    </div>
  );
}