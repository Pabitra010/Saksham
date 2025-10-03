export default function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#164868]"></div>
      <p className="mt-4 text-lg text-gray-600">Processing authentication...</p>
    </div>
  )
}