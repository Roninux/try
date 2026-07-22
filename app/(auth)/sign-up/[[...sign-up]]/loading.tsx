import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the two-column layout of the sign-up page.
// Left  → logo + slogan + steps skeletons
// Right → Clerk card skeleton (slightly taller — sign-up has more fields)
export default function SignUpLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* ── Left column skeleton ─────────────────────────────── */}
        <div className="flex-[2] flex flex-col gap-8 w-full">
          {/* Logo */}
          <Skeleton className="w-40 h-40 sm:w-52 sm:h-52 rounded-xl mx-auto md:mx-0" />

          {/* Slogan lines */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          {/* Steps row */}
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-3 w-4 rounded" />
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-3 w-4 rounded" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
        </div>

        {/* ── Right column skeleton (Clerk card) ───────────────── */}
        <div className="flex-[3] flex flex-col gap-5 w-full max-w-sm md:max-w-md">
          {/* Card header */}
          <Skeleton className="h-8 w-1/2 rounded-md mx-auto" />
          <Skeleton className="h-4 w-2/3 rounded-md mx-auto" />

          {/* Name + email + password + confirm password */}
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />

          {/* Submit button */}
          <Skeleton className="h-11 w-full rounded-lg" />

          {/* Divider + social */}
          <Skeleton className="h-4 w-1/3 rounded-md mx-auto" />
          <Skeleton className="h-11 w-full rounded-lg" />

          {/* Footer link */}
          <Skeleton className="h-4 w-1/2 rounded-md mx-auto" />
        </div>

      </div>
    </div>
  );
}
