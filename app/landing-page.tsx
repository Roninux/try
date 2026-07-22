import Image from "next/image";
import Link from "next/link";
import { UserPlus, Upload, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ------------------------------------------------------------------
// Step definition — each item shown in the "how it works" section
// ------------------------------------------------------------------
const STEPS = [
  {
    icon: UserPlus,
    label: "Sign Up",
  },
  {
    icon: Upload,
    label: "Upload",
  },
  {
    icon: Share2,
    label: "Share",
  },
] as const;

// ------------------------------------------------------------------
// LandingPage
// Public — rendered when no Clerk session is present.
// Layout: two-column on md+, stacked on mobile.
// ------------------------------------------------------------------
export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 md:gap-8">

        {/* ── Left column ──────────────────────────────────────── */}
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
                {/* Step pill */}
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

                {/* Connector arrow (hidden after last step) */}
                {index < STEPS.length - 1 && (
                  <span className="text-gray-300 text-sm select-none">→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Right column ─────────────────────────────────────── */}
        <section className="flex-[3] flex flex-col items-center gap-8 w-full max-w-sm md:max-w-none">
          {/* Logo */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <Image
              src="/assets/logo.png"
              alt="FileHub logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Auth buttons */}
          <div className="flex flex-col gap-3 w-full">
            {/* Sign In — pure blue */}
            <Link href="/sign-in" className="w-full">
              <Button
                size="lg"
                className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-transparent text-sm font-semibold tracking-wide normal-case"
              >
                Sign In
              </Button>
            </Link>

            {/* Sign Up — pure white with blue border */}
            <Link href="/sign-up" className="w-full">
              <Button
                size="lg"
                className="w-full h-12 rounded-lg bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-sm font-semibold tracking-wide normal-case"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
