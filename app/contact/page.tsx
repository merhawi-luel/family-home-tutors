// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Contact Us</h1>
        <p className="text-slate-400 mb-12">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Agency Details</h3>
          <div className="space-y-4 text-slate-300">
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400  underline-offset-4 decoration-2">
                Email:
              </span>{" "}
              mytutoring@email.com
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400  underline-offset-4 decoration-2">
                Phone:
              </span>{" "}
              +251923306670
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-blue-400  underline-offset-4 decoration-2">
                Service Area:
              </span>{" "}
              Local In-Home & Online
            </p>

            {/* Telegram links with icon */}
            <p className="font-semibold text-blue-400  underline-offset-4 decoration-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-300"
                fill="currentColor"
                viewBox="0 0 240 240"
              >
                <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm56.4 86.4l-16.8 79.2c-1.2 5.4-4.2 6.6-8.4 4.2l-23.4-17.4-11.4 11c-1.2 1.2-2.2 2.2-4.2 2.2l1.5-21.6 39.3-35.4c1.8-1.5-0.4-2.4-2.8-0.9l-48.6 30.6-20.9-6.5c-4.5-1.2-4.6-4.5 0.9-6.5l81.7-31.5c3.8-1.2 7 0.9 5.8 6z" />
              </svg>
              For More:{" "}
              <a
                href="https://t.me/familytutoree1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 "
              >
                Contact us on Telegram
              </a>
            </p>

            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-300"
                fill="currentColor"
                viewBox="0 0 240 240"
              >
                <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm56.4 86.4l-16.8 79.2c-1.2 5.4-4.2 6.6-8.4 4.2l-23.4-17.4-11.4 11c-1.2 1.2-2.2 2.2-4.2 2.2l1.5-21.6 39.3-35.4c1.8-1.5-0.4-2.4-2.8-0.9l-48.6 30.6-20.9-6.5c-4.5-1.2-4.6-4.5 0.9-6.5l81.7-31.5c3.8-1.2 7 0.9 5.8 6z" />
              </svg>
              <a
                href="https://t.me/familytutors11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                Join our Telegram Channel
              </a>
            </p>
          </div>
        </div>

        {/* Simple Contact Form */}
        <form className="space-y-4 bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Message</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="Tell us how we can help..."
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}