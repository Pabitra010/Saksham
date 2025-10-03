import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export const createClient = (cookieStore: unknown) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = await cookies()
          return cookieStore.get(name)?.value
        },
        set: async (name: string, value: string, options: CookieOptions) => {
          const cookieStore = await cookies()
          cookieStore.set(name, value, options)
        },
        remove: async (name: string, options: CookieOptions) => {
          const cookieStore = await cookies()
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )
}
