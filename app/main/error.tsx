"use client";

// Error fallback for the /main route.
// Next.js requires error boundaries to be Client Components.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-500 max-w-sm">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-2 h-10 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
