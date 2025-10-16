"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  initialFullName?: string
  initialPhonePrimary?: string
  initialPhoneSecondary?: string
  initialLocation?: string
  initialGender?: string
  initialAge?: number | string
  initialBloodGroup?: string
  initialAadhaar?: string
  initialDistrict?: string
  initialVulnerability?: string
  initialAvatarUrl?: string
  initialEmergencyContacts?: Array<{ name: string; relation?: string; phone: string }>
  initialShareLocation?: boolean
  initialAllowVolunteers?: boolean
}

export default function AccountEditor({
  initialFullName = '',
  initialPhonePrimary = '',
  initialPhoneSecondary = '',
  initialLocation = '',
  initialGender = '',
  initialAge = '',
  initialBloodGroup = '',
  initialAadhaar = '',
  initialDistrict = '',
  initialVulnerability = '',
  initialAvatarUrl = '',
  initialEmergencyContacts = [],
  initialShareLocation = false,
  initialAllowVolunteers = false,
}: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(initialFullName)
  const [phonePrimary, setPhonePrimary] = useState((initialPhonePrimary as any) || '')
  const [phoneSecondary, setPhoneSecondary] = useState((initialPhoneSecondary as any) || '')
  const [location, setLocation] = useState((initialLocation as any) || '')
  const [gender, setGender] = useState((initialGender as any) || '')
  const [age, setAge] = useState<number | string>((initialAge as any) || '')
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup || '')
  const [aadhaar, setAadhaar] = useState(initialAadhaar || '')
  const [district, setDistrict] = useState(initialDistrict || '')
  const [vulnerability, setVulnerability] = useState(initialVulnerability || '')
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  const [emergencyContacts, setEmergencyContacts] = useState<Array<{ name: string; relation?: string; phone: string }>>(initialEmergencyContacts || [])
  const [shareLocation, setShareLocation] = useState<boolean>(initialShareLocation)
  const [allowVolunteers, setAllowVolunteers] = useState<boolean>(initialAllowVolunteers)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setError(null)
    setMessage(null)
    if (!fullName && !phonePrimary && !phoneSecondary && !location && !gender && !age && !bloodGroup && !aadhaar && !district && !vulnerability && !avatarUrl && (!emergencyContacts || emergencyContacts.length === 0) && !shareLocation && !allowVolunteers) {
      setError('Please provide at least one value to update.')
      return
    }

    setLoading(true)
    try {
      const payload: any = {
        full_name: fullName,
        phone_primary: phonePrimary,
        phone_secondary: phoneSecondary,
        location,
        gender,
        age: age ? Number(age) : undefined,
        blood_group: bloodGroup,
        aadhaar,
        district,
        vulnerability,
        avatar_url: avatarUrl,
        emergency_contacts: emergencyContacts,
        share_location: shareLocation,
        allow_volunteers: allowVolunteers,
      }

      // include a raw_user_meta_data object so the server can merge allowed keys
      const body = { raw_user_meta_data: payload }
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Failed to update profile')
      } else {
        setMessage('Profile updated successfully')
        setEditing(false)
        // refresh server-side data so My Account shows updated metadata
        try {
          router.refresh()
        } catch (e) {
          // fallback: reload
          // location.reload()
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Edit Profile
        </button>
      ) : (
        // Slide-over panel on the right
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(false)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-full md:w-96 lg:w-96 max-w-full sm:max-w-full md:max-w-md bg-white shadow-xl p-6 overflow-auto">
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm">
              Full name
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="block w-full mt-1 border rounded p-2" />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm">
                Primary Phone
                <input value={phonePrimary} onChange={(e) => setPhonePrimary(e.target.value)} className="block w-full mt-1 border rounded p-2" />
              </label>
              <label className="text-sm">
                Secondary Phone
                <input value={phoneSecondary} onChange={(e) => setPhoneSecondary(e.target.value)} className="block w-full mt-1 border rounded p-2" />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <label className="text-sm">
                Gender
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full mt-1 border rounded p-2">
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="text-sm">
                Age
                <input type="number" value={age as any} onChange={(e) => setAge(e.target.value)} className="block w-full mt-1 border rounded p-2" />
              </label>
              <label className="text-sm">
                Blood Group
                <input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="block w-full mt-1 border rounded p-2" />
              </label>
            </div>

            <label className="text-sm">
              Aadhaar Number
              <input value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} className="block w-full mt-1 border rounded p-2" />
            </label>

            <label className="text-sm">
              Location
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="block w-full mt-1 border rounded p-2" />
            </label>

            <label className="text-sm">
              District / State
              <input value={district} onChange={(e) => setDistrict(e.target.value)} className="block w-full mt-1 border rounded p-2" />
            </label>

            <label className="text-sm">
              Avatar URL
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="block w-full mt-1 border rounded p-2" />
            </label>

            <label className="text-sm">
              Vulnerability Notes
              <textarea value={vulnerability} onChange={(e) => setVulnerability(e.target.value)} className="block w-full mt-1 border rounded p-2 h-24" />
            </label>

            <div className="text-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Emergency Contacts</label>
                <button type="button" onClick={() => setEmergencyContacts(prev => ([...prev, { name: '', relation: '', phone: '' }]))} className="text-sm px-2 py-1 bg-white border rounded">Add</button>
              </div>
              <div className="space-y-2">
                {emergencyContacts && emergencyContacts.length ? emergencyContacts.map((c, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                    <input placeholder="Name" value={c.name} onChange={(e) => {
                      const next = [...emergencyContacts]; next[idx] = { ...next[idx], name: e.target.value }; setEmergencyContacts(next)
                    }} className="block w-full mt-1 border rounded p-2" />
                    <input placeholder="Relation" value={c.relation || ''} onChange={(e) => {
                      const next = [...emergencyContacts]; next[idx] = { ...next[idx], relation: e.target.value }; setEmergencyContacts(next)
                    }} className="block w-full mt-1 border rounded p-2" />
                    <div className="flex gap-2">
                      <input placeholder="Phone" value={c.phone} onChange={(e) => {
                        const next = [...emergencyContacts]; next[idx] = { ...next[idx], phone: e.target.value }; setEmergencyContacts(next)
                      }} className="block w-full mt-1 border rounded p-2" />
                      <button type="button" onClick={() => setEmergencyContacts(prev => prev.filter((_, i) => i !== idx))} className="px-2 py-1 bg-red-50 text-red-600 border rounded">Remove</button>
                    </div>
                  </div>
                )) : (
                  <div className="text-xs text-gray-500">No emergency contacts</div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={shareLocation} onChange={(e) => setShareLocation(e.target.checked)} />
                <span>Share location during emergency</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={allowVolunteers} onChange={(e) => setAllowVolunteers(e.target.checked)} />
                <span>Allow volunteers to contact</span>
              </label>
            </div>
          </div>

          <div className="mt-3 flex gap-2 justify-end">
            <button onClick={() => { setEditing(false); setError(null); setMessage(null) }} className="px-3 py-1 bg-white border rounded">Cancel</button>
            <button onClick={submit} disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
          </div>

          {message && <div className="mt-2 text-sm text-green-600">{message}</div>}
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
