"use client";

<<<<<<< HEAD
// Error fallback for the /main route.
// Next.js requires error boundaries to be Client Components.
=======
import { useEffect } from "react";

>>>>>>> 0f15419 ( hub v2)
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
<<<<<<< HEAD
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
=======
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
>>>>>>> 0f15419 ( hub v2)
      >
        Try again
      </button>
    </div>
  );
}
