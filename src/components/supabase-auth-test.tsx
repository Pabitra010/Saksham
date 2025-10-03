'use client'

import { useSupabase } from './providers/SupabaseProvider'
import { useEffect, useState } from 'react'

export default function SupabaseAuthTest() {
  const { supabase } = useSupabase()
  const [status, setStatus] = useState<string>('Checking authentication...')

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setStatus(`Error: ${error.message}`)
          return
        }

        if (session) {
          setStatus(`Authenticated as: ${session.user.email}`)
        } else {
          setStatus('Not authenticated')
        }
      } catch (error) {
        setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    checkAuth()
  }, [supabase])

  return (
    <div className="p-4 m-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Supabase Authentication Test</h2>
      <p className="text-gray-700">{status}</p>
    </div>
  )
}