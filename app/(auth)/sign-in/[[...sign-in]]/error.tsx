"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SignInErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Displayed when the sign-in page throws an unhandled error.
export default function SignInError({ error, reset }: SignInErrorProps) {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500">
            We couldn&apos;t load the sign-in page. This is usually a temporary
            issue — try again or go back home.
          </p>
          {/* Surface digest for debugging in production */}
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
    </div>
  );
}
