'use client'

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication Error</h1>
        <p className="text-lg text-gray-600 mb-8">
          There was an error processing your authentication request.
          Please try again or contact support if the problem persists.
        </p>
        <a
          href="/login"
          className="bg-[#164868] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a5680] transition-colors"
        >
          Return to Login
        </a>
      </main>
    </div>
  )
}