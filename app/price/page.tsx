// app/price/page.tsx
import Link from "next/link";

export default function PricePage() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#111827] to-[#1e293b] min-h-screen py-24 px-6 text-white">
      {/* Tuition Prices Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10">Tuition Prices</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-white font-semibold">Grade Level</th>
                  <th className="px-6 py-3 text-white font-semibold">Price per Hour (ETB)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-800">
                  <td className="px-6 py-3">Grade 1-4</td>
                  <td className="px-6 py-3">250</td>
                </tr>
                <tr className="bg-gray-700">
                  <td className="px-6 py-3">Grade 5-8</td>
                  <td className="px-6 py-3">300</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="px-6 py-3">Grade 9-12</td>
                  <td className="px-6 py-3">350</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-white text-base">
            <strong>Payment Option:</strong> 65% one-time prepayment is required for tutorial applicants.
          </p>

          {/* Make Payment Section */}
          <div className="mt-10 bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Make Payment</h3>
            <p className="mb-2">
              <span className="font-semibold text-white">TeleBirr:</span> 0923306670
            </p>
            <p>
              <span className="font-semibold text-white">Abyssinia Bank:</span> 0923306670
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}