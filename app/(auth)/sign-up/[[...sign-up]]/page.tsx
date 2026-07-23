import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserPlus, Upload, Share2 } from "lucide-react";
import { getUser } from "@/actions/user.actions";

const STEPS = [
  { icon: UserPlus, label: "Sign Up" },
  { icon: Upload, label: "Upload" },
  { icon: Share2, label: "Share" },
] as const;

export default async function SignUpPage() {
  // ── Auth guard (same logic as landing page) ─────────────────────
  const clerkUser = await currentUser();

  if (clerkUser) {
    const dbUser = await getUser(clerkUser.id);
    if (dbUser) {
      if (dbUser.onboarded) redirect("/main");
      redirect("/onboarding");
    }
  }

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-8">

        {/* ── Left column (exact copy from landing page) ─────────── */}
        <section className="flex-[2] flex flex-col gap-8 text-center md:text-left">
          {/* Slogan */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900 font-heading">
              File Sharing Made Simple
            </h1>
            <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto md:mx-0">
              Upload and share your files with public links that work
              everywhere.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-6 sm:gap-8">
            {STEPS.map(({ icon: Icon, label }, index) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                  <Icon
                    className="text-blue-600 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold text-blue-700 whitespace-nowrap">
                    {label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <span className="text-gray-300 text-sm select-none">→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Right column (logo stays, buttons replaced by Clerk) ─ */}
        <section className="flex-[3] flex flex-col items-center gap-8 w-full max-w-sm md:max-w-none">
          {/* Logo — exact same sizing as landing page */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <Image
              src="/assets/logo.png"
              alt="FileHub logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Clerk SignUp widget — replaces the two buttons */}
          <SignUp />
        </section>

      </div>
    </main>
  );
}
