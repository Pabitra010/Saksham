import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export const createClient = (cookieStore: unknown) => {
  const client = createServerClient(
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

  // Suppress the auth-js library warning about reading the user object from
  // session storage on the server. We prefer to use `getUser()` in server
  // endpoints, but some internal code paths still access session.user which
  // causes a noisy console.warn. Setting this flag silences that message.
  try {
    // auth client is available at client.auth
    // @ts-ignore - internal flag on auth client
    if (client && (client as any).auth) (client as any).auth.suppressGetSessionWarning = true
  } catch (e) {
    // no-op
  }

  return client
}

// Suppress the library's noisy getSession() warning when running server-side helpers.
// Some internal code paths access session.user on server which triggers a helpful
// warning from the Auth JS library; this flag prevents that console.warn.
// We set it dynamically on the returned client when used elsewhere.
