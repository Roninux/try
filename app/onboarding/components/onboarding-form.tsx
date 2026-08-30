"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  onboardingFormSchema,
  type OnboardingFormData,
} from "@/app/onboarding/validations/onboarding";
import { onboardUser } from "@/app/server/actions/user.actions";

// ------------------------------------------------------------------
// Props
// ------------------------------------------------------------------
type OnboardingFormProps = {
  user: {
    clerkUserId: string;
    name: string;
    email: string;
    username: string;
  };
};

// ------------------------------------------------------------------
// OnboardingForm
// Collects name, username, and email then persists via onboardUser.
// Follows the React Hook Form Controller pattern from the official docs.
// ------------------------------------------------------------------
export default function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();

  // Initialise react-hook-form with Zod resolver and user defaults.
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
    },
  });

  // ── Submit handler ────────────────────────────────────────────────
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      const result = await onboardUser(user.clerkUserId, data);

      if (!result.success) {
        toast.error(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success("Welcome to FileHub!", {
        description: "Your account is all set up. Let's get started!",
        position: "top-center",
        style: {
          background: "#eff6ff",        // light blue
          border: "1px solid #93c5fd",  // blue border
          color: "#1e3a5f",             // dark blue text
        },
      });

      router.push("/main");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ── UI ────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Heading */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            Set up your account
          </h1>
          <p className="text-sm text-gray-500">
            Confirm your details to get started with FileHub.
          </p>
        </div>

        {/* Form */}
        <form
          id="onboarding-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="onboarding-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...field}
                  id="onboarding-name"
                  type="text"
                  placeholder="Your full name"
                  aria-invalid={fieldState.invalid}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all aria-invalid:border-red-400 aria-invalid:focus:ring-red-100"
                />
                {fieldState.invalid && (
                  <p className="text-xs text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Username */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="onboarding-username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...field}
                  id="onboarding-username"
                  type="text"
                  placeholder="your-username"
                  aria-invalid={fieldState.invalid}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all aria-invalid:border-red-400 aria-invalid:focus:ring-red-100"
                />
                {fieldState.invalid && (
                  <p className="text-xs text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="onboarding-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...field}
                  id="onboarding-email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={fieldState.invalid}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all aria-invalid:border-red-400 aria-invalid:focus:ring-red-100"
                />
                {fieldState.invalid && (
                  <p className="text-xs text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            form="onboarding-form"
            disabled={form.formState.isSubmitting}
            className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-transparent text-sm font-semibold normal-case mt-1"
          >
            {form.formState.isSubmitting ? "Saving…" : "Complete setup"}
          </Button>
        </form>
      </div>
    </main>
  );
}
