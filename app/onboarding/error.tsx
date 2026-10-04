"use client";

<<<<<<< HEAD
import { Button } from "@/components/ui/button";

interface OnboardingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OnboardingError({ error, reset }: OnboardingErrorProps) {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-900">
            Onboarding failed
          </h1>
          <p className="text-sm text-gray-500">
            Something went wrong while loading the onboarding page. Try again
            or go back home.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400 font-mono mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            onClick={reset}
            className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-transparent text-sm font-semibold normal-case"
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full h-11 rounded-lg bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-sm font-semibold normal-case"
          >
            Go home
          </Button>
        </div>
      </div>
=======
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="rounded-md bg-[#6c47ff] px-4 py-2 text-white hover:bg-[#5b3ae0]"
      >
        Try again
      </button>
>>>>>>> 0f15419 ( hub v2)
    </div>
  );
}
