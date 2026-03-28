// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        {/* Dark Navbar */}
        <nav className="flex justify-between items-center px-12 py-5 bg-black text-white sticky top-0 z-50">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Family Home Tutors Agency
          </Link>
          {/* In app/layout.tsx */}
<div className="space-x-8 text-sm font-medium">
    <Link href="/" className="hover:text-gray-300 transition">Home</Link>
    <Link href="/stories" className="hover:text-gray-300 transition">Tutor Voices</Link> {/* New Link! */}
    <Link href="/announcements" className="hover:text-gray-300 transition">Opportunities</Link>
    <Link href="/price" className="hover:text-gray-300 transition">Pricing</Link>
    <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
   <Link href="/admin" className="hover:text-gray-300 transition">Admin Login</Link>

</div>
        </nav>

        <main>{children}</main>

        <footer className="py-10 bg-black text-white text-center text-xs">
          © 2026 Family Home Tutors Agency • All Rights Reserved
          <br/>
        </footer>
      </body>
    </html>
  );
}