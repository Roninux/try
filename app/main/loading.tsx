// Loading skeleton for the /main route.
// Visually represents the page layout while data is being fetched.
export default function Loading() {
  return (
    <div className="flex flex-col gap-6 px-6 py-10 max-w-5xl mx-auto animate-pulse">
      {/* Page heading skeleton */}
      <div className="h-7 w-40 rounded-md bg-gray-200" />

      {/* Upload button skeleton */}
      <div className="h-11 w-44 rounded-lg bg-gray-200" />

      {/* File cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            {/* Card thumbnail */}
            <div className="h-32 rounded-lg bg-gray-200" />
            {/* Card title */}
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            {/* Card meta */}
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
