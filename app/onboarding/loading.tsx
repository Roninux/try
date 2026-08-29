import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the expected structure of the onboarding form page.
export default function OnboardingLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Page heading */}
        <div className="flex flex-col gap-2 text-center">
          <Skeleton className="h-8 w-2/3 rounded-md mx-auto" />
          <Skeleton className="h-4 w-4/5 rounded-md mx-auto" />
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
