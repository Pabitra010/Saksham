import React, { use } from "react";
import { createClient } from "@/utils/supabase/server";
import AccountEditor from "../../../components/AccountEditor";
import Link from "next/link";

type Props = {
  params: { usser: string };
};

export default async function MyAccountPage({ params }: Props) {
  const supabase = createClient(undefined);

  // Try to get current session user (server-side)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not signed in, show a simple placeholder
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded shadow p-8">
          <h2 className="text-xl font-semibold">My Account</h2>
          <p className="mt-4">You are not signed in.</p>
        </div>
      </div>
    );
  }

  // Fetch recent community requests by this user (match by user id or email)
  const { data: requests } = await supabase
    .from("community_requests")
    .select("*")
    .or(
      `user_email.eq.${user?.email},user_phone.eq.${user?.phone},user_id.eq.${user?.id}`
    )
    .order("created_at", { ascending: false })
    .limit(5);

  // Build profile values
  const profileName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || user?.id;
  const avatar = user?.user_metadata?.avatar_url || "";
  const phonePrimary = user?.user_metadata?.phone_primary || user?.phone || "";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left sidebar */}
  <aside className="col-span-1 md:col-span-4 lg:col-span-3 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="avatar" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover" />
              ) : (
                <span className="text-xl sm:text-2xl font-bold text-gray-600">{profileName?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profileName}</h3>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 text-xs">
                  Verified
                </span>
                <span className="ml-2 inline-block">
                  <AccountEditor
                    initialFullName={user.user_metadata?.full_name || ""}
                    initialPhonePrimary={
                      user.user_metadata?.phone_primary || user.phone || ""
                    }
                    initialPhoneSecondary={
                      user.user_metadata?.phone_secondary || ""
                    }
                    initialLocation={user.user_metadata?.location || ""}
                    initialGender={user.user_metadata?.gender || ""}
                    initialAge={user.user_metadata?.age || ""}
                    initialBloodGroup={user.user_metadata?.blood_group || ""}
                    initialAadhaar={user.user_metadata?.aadhaar || ""}
                    initialDistrict={user.user_metadata?.district || ""}
                    initialVulnerability={
                      user.user_metadata?.vulnerability || ""
                    }
                    initialAvatarUrl={user.user_metadata?.avatar_url || ""}
                    initialEmergencyContacts={
                      user.user_metadata?.emergency_contacts || []
                    }
                    initialShareLocation={
                      user.user_metadata?.share_location ?? false
                    }
                    initialAllowVolunteers={
                      user.user_metadata?.allow_volunteers ?? false
                    }
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-700">
            <p className="mb-1 font-semibold">Location</p>
            <p className="text-gray-500 text-sm">
              {user.user_metadata?.location || "Not provided"}
            </p>

            <div className="mt-4">
              <p className="text-sm font-semibold">Quick Info</p>
              <p className="text-sm text-gray-600">
                Phone: {phonePrimary || "Not provided"}
              </p>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">
                Blood: {user.user_metadata?.blood_group || "Not provided"}
              </p>
            </div>

            <div className="mt-4 text-sm text-red-600">
              <p className="font-semibold">Vulnerability Notes</p>
              <p className="text-sm text-red-600">
                {user.user_metadata?.vulnerability || "None"}
              </p>
            </div>
          </div>
        </aside>

        {/* Right content area */}
        <main className="col-span-1 md:col-span-8 lg:col-span-9">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">Profile Details</h2>
              <div className="flex gap-3 items-center">
                <button className="px-4 py-2 bg-white border rounded">
                  Share Profile
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Report Issue
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Personal Info card */}
              <section className="col-span-1 p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-semibold mb-2">
                  Personal Information
                </h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Name:</strong> {profileName}
                  </div>
                  <div>
                    <strong>Gender:</strong>{" "}
                    {user.user_metadata?.gender || "Not provided"}
                  </div>
                  <div>
                    <strong>Age:</strong>{" "}
                    {user.user_metadata?.age ?? "Not provided"}
                  </div>
                  <div>
                    <strong>Aadhaar</strong>{" "}
                    {user.user_metadata?.aadhaar
                      ? "XXXX-XXXX-" +
                        String(user.user_metadata?.aadhaar).slice(-4)
                      : "Not provided"}
                  </div>
                </div>
              </section>

              {/* Contact & Address */}
              <section className="col-span-1 p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-semibold mb-2">
                  Contact & Address
                </h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Phone:</strong> {phonePrimary || "Not provided"}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>District / State:</strong>{" "}
                    {user.user_metadata?.district || "Not provided"}
                  </div>
                </div>
              </section>

              {/* Documents & IDs */}
              <section className="col-span-1 p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-semibold mb-2">Documents & IDs</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded flex justify-between items-center border">
                    <div>
                      <div className="font-semibold text-sm">
                        Aadhaar (Masked)
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.user_metadata?.aadhaar
                          ? "XXXX-XXXX-" +
                            String(user.user_metadata?.aadhaar).slice(-4)
                          : "Not provided"}
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white border rounded">
                      Download
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded flex justify-between items-center border">
                    <div>
                      <div className="font-semibold text-sm">
                        Medical Certificate
                      </div>
                      <div className="text-xs text-gray-500">
                        Last uploaded: 2025-09-01
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white border rounded">
                      View
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <h4 className="text-sm font-semibold mb-2">Recent Requests</h4>
                <div className="space-y-3">
                  {requests && requests.length ? (
                    requests.map((r: any) => (
                      <div
                        key={r.id}
                        className="p-3 bg-gray-50 rounded flex justify-between items-center border"
                      >
                        <div>
                          <div className="font-semibold">{r.message}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(r.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              r.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      No recent requests
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Emergency Contacts</h4>
                <div className="space-y-2">
                  {(user.user_metadata?.emergency_contacts || []).length ? (
                    (user.user_metadata?.emergency_contacts || []).map((c: any, i: number) => (
                      <div key={i} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{c?.name}</div>
                          <div className="text-xs text-gray-500">{c?.relation}</div>
                        </div>
                        <div className="text-sm">{c?.phone}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No emergency contacts</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Link href={'/'} className="w-full sm:w-auto mr-0 sm:mr-3 px-4 py-2 border rounded text-center">Cancel</Link>
                <Link href={'/'} className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded text-center">Save Changes</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
