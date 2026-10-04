"use client";

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
    <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-semibold text-red-600">Failed to load files!</h2>
      <button
        onClick={() => reset()}
        className="rounded-md bg-[#6c47ff] px-4 py-2 text-white hover:bg-[#5b3ae0]"
      >
        Try again
      </button>
    </div>
  );
}
