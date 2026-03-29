"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        "service_99kd7fu",
        "template_vccjpdp",
        formRef.current,
        "zsw-avBr1m_HIDJl3"
      )
      .then(
        () => {
          setLoading(false);
          setShowPopup(true);
          formRef.current?.reset();
        },
        (error) => {
          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
    <div className="relative bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-16 px-6">

      {/* ✅ POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-sm text-center animate-fadeIn">
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Message Sent ✅
            </h2>

            <p className="text-slate-300 mb-6">
              Thank you for contacting <span className="text-blue-400 font-semibold">Family Home Tutors</span>.<br />
              We will get back to you as soon as we review your request.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-slate-400 mb-12">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

        {/* INFO */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Agency Details</h3>
          <div className="space-y-4 text-slate-300">
            <p><span className="text-blue-400 font-semibold">Email:</span> mytutoring@email.com</p>
            <p><span className="text-blue-400 font-semibold">Phone:</span> +251923306670</p>
            <p><span className="text-blue-400 font-semibold">Service Area:</span> Local In-Home & Online</p>
          </div>
        </div>

        {/* FORM */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-4 bg-gray-800 p-8 rounded-2xl border border-gray-700"
        >
          <div>
            <label className="block text-sm font-medium text-white mb-1">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full p-3 border rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Message</label>
            <textarea
              name="message"
              required
              className="w-full p-3 border rounded-lg bg-gray-900 text-white h-32 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us how we can help..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}