"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 bg-gray-50">
      <h2 className="text-xl font-semibold text-red-600">Failed to load this file</h2>
      <p className="text-gray-500">The file might have been removed or the link is invalid.</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => reset()}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md bg-[#6c47ff] px-4 py-2 text-white hover:bg-[#5b3ae0]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
