import React from "react";
import FooterPage from "@/components/Footer";

    const NumberList = [
                ["Police", "100"],
                ["Fire", "101"],
                ["Ambulance", "102"],
                ["Disaster Management Helpline", "1078"],
                ["Women Helpline", "1091"],
                ["Child Helpline", "1098"],
                ["Covid Helpline", "1075"],
              ]

const EmergencyHelpLinePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      {/* Breaking News Bar */}
      <div className="bg-red-700 text-white text-sm font-semibold px-4 py-2">
        Breaking:
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center gap-4 px-4 py-6">
        {/* Left Side - Recent Disasters */}
        <div className="bg-white shadow-md rounded-md p-4 w-full md:w-1/4">
          <h2 className="text-lg font-bold mb-2">Recent Disasters</h2>
          <ul className="space-y-3">
            <li>
              <p className="font-bold">🌊 Floods</p>
              <p className="text-sm text-gray-700">
                Rescue operations continue in affected regions.
              </p>
            </li>
            <li>
              <p className="font-bold">🔥 Wildfire</p>
              <p className="text-sm text-gray-700">
                California wildfire displaces thousands.
              </p>
            </li>
            <li>
              <p className="font-bold">🌪️ Cyclone</p>
              <p className="text-sm text-gray-700">
                Coastal villages evacuated ahead of landfall.
              </p>
            </li>
          </ul>
        </div>

        {/* Middle - Helpline Numbers */}
        <div className="bg-white shadow-md rounded-md p-4 w-full md:w-2/4">
          <h1 className="text-2xl font-bold text-red-600 mb-1">
            📞 National & State Helpline Numbers
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Verified by National Disaster Management Authority
          </p>

          <table className="w-full border border-gray-300 text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2 text-xl text-left font-bold">
                  Service
                </th>
                <th className="border px-3 py-2 text-xl text-left font-bold">
                  Number
                </th>
              </tr>
            </thead>
            <tbody>
              {NumberList.map(([service, number]) => (
                <tr key={service} className="hover:bg-gray-200">
                  <td className="border px-3 py-2">{service}</td>
                  <td className="border border-black px-3 py-2 font-bold text-red-600">
                    {number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side - Safety & Awareness */}
        <div className="bg-white shadow-md rounded-md p-4 w-full md:w-1/4">
          <h2 className="text-lg font-bold mb-3">Safety & Awareness</h2>

          <div className="mb-3">
            <p className="font-semibold text-green-700">✅ Emergency Kit</p>
            <p className="text-sm text-gray-700">
              Keep dry food, medicines, flashlight, and extra batteries ready.
            </p>
          </div>

          <div className="mb-3">
            <p className="font-semibold text-yellow-700">⚠️ Safety Tips</p>
            <p className="text-sm text-gray-700">
              Store important documents in waterproof bags.
            </p>
          </div>

          <div>
            <p className="font-semibold text-blue-700">💾 Save Contacts</p>
            <p className="text-sm text-gray-700">
              Keep helpline numbers saved in your phone for quick access.
            </p>
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default EmergencyHelpLinePage;
