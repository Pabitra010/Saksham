import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
  const supabase = createClient(undefined)
  const body = await request.json()
    const {
      full_name,
      phone_primary,
      phone_secondary,
      location,
      gender,
      age,
      blood_group,
      aadhaar,
      raw_user_meta_data,
    } = body

    // Get current user
  const userResult = await supabase.auth.getUser()
  const { data: { user } } = userResult
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Update auth user metadata
  const newMeta = { ...(user.user_metadata || {}) }

  // Merge individual fields if provided
  if (full_name) newMeta.full_name = full_name
  if (location) newMeta.location = location
  if (phone_primary) newMeta.phone_primary = phone_primary
  if (phone_secondary) newMeta.phone_secondary = phone_secondary
  if (gender) newMeta.gender = gender
  if (age !== undefined) newMeta.age = age
  if (blood_group) newMeta.blood_group = blood_group
  if (aadhaar) newMeta.aadhaar = aadhaar

  // If a raw_user_meta_data object is provided (for example the full auth JSON),
  // merge only allowed keys to avoid overwriting protected fields.
  if (raw_user_meta_data && typeof raw_user_meta_data === 'object') {
    const allowed = [
      'full_name',
      'location',
      'gender',
      'age',
      'blood_group',
      'aadhaar',
      'phone_primary',
      'phone_secondary',
      'username',
      'avatar_url',
      'district',
      'vulnerability',
      'emergency_contacts',
      'share_location',
      'allow_volunteers',
    ]
    for (const k of Object.keys(raw_user_meta_data)) {
      if (allowed.includes(k)) {
        // @ts-ignore
        newMeta[k] = raw_user_meta_data[k]
      }
    }
  }

  const updates: any = { data: newMeta }

  const updateResult = await supabase.auth.updateUser(updates)
    if (updateResult.error) {
      console.error('Failed to update user:', updateResult.error)
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }

    // Re-fetch user to return the updated metadata
    const refreshed = await supabase.auth.getUser()

  // Backfill community_requests where user_email or user_id matches and fields are null
    try {
      const toUpdate: any = {}
      if (full_name) toUpdate.user_name = full_name
      if (phone_primary) toUpdate.user_phone = phone_primary

      if (Object.keys(toUpdate).length) {
        await supabase
          .from('community_requests')
          .update(toUpdate)
          .or(`user_id.eq.${user.id},user_email.eq.${user.email}`)
          .is('user_name', null)
          .is('user_phone', null)
      }
    } catch (e) {
      console.warn('Failed to backfill community_requests:', e)
    }

    // Also upsert a profiles row so fields like phone_primary and location
    // are visible in a Postgres table in the Supabase UI. This is useful for
    // searching/indexing and avoids relying solely on auth.user_metadata.
    let profileUpsertResult = null
    try {
      const maskAadhaar = (a?: string) => {
        if (!a) return null
        // keep only last 4 digits, replace others with X
        const digits = a.replace(/[^0-9]/g, '')
        if (digits.length <= 4) return digits
        const last4 = digits.slice(-4)
        return 'XXXX-XXXX-' + last4
      }

      const profileRow: any = {
        user_id: user.id,
        full_name: newMeta.full_name || null,
        phone_primary: newMeta.phone_primary || null,
        phone_secondary: newMeta.phone_secondary || null,
        location: newMeta.location || null,
        gender: newMeta.gender || null,
        age: newMeta.age ?? null,
        blood_group: newMeta.blood_group || null,
        aadhaar_masked: maskAadhaar(newMeta.aadhaar) || null,
        district: newMeta.district || null,
        vulnerability: newMeta.vulnerability || null,
        emergency_contacts: newMeta.emergency_contacts ?? null,
        share_location: typeof newMeta.share_location !== 'undefined' ? newMeta.share_location : null,
        allow_volunteers: typeof newMeta.allow_volunteers !== 'undefined' ? newMeta.allow_volunteers : null,
        updated_at: new Date().toISOString(),
      }

      // Try upsert; if `profiles` table doesn't exist this will fail and be caught.
      profileUpsertResult = await supabase
        .from('profiles')
        .upsert(profileRow, { onConflict: 'user_id' })
    } catch (err) {
      console.warn('profiles upsert failed (table may not exist):', err)
    }

    return NextResponse.json({ success: true, updatedUser: refreshed.data?.user ?? null, profileUpsertResult })

    return NextResponse.json({ success: true, updatedUser: refreshed.data?.user ?? null })
  } catch (err) {
    console.error('update-profile error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
