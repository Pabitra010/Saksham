import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name: string, options: CookieOptions) => {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Authenticate the request with a server-verified user call.
  // getUser() will contact the Supabase Auth server and validate the cookie/token.
  // It's common for unauthenticated requests to not have a session; supabase may
  // surface an AuthSessionMissingError in that case. We catch and quietly ignore
  // that expected case so it doesn't fill logs with stack traces.
  try {
    const { data: { user } } = await supabase.auth.getUser()
    // You can use `user` or return a redirect here if you want to block access.
  } catch (err: any) {
    // Supabase sets __isAuthError on auth-related errors
    if (err && err.__isAuthError) {
      // expected when there is no session; ignore
    } else {
      // unexpected error - log for investigation
      console.warn('supabase auth getUser unexpected error in middleware', err)
    }
  }

  return response
}

// Apply middleware to all routes that require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}