"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
// ------------------------------------------------------------------
export default function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();

  // Initialise react-hook-form with Zod resolver and user defaults.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({
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
      await onboardUser(user.clerkUserId, data);

      toast.success("Welcome to FileHub!", {
        description: "Your account is all set up. Let's get started!",
        position: "top-center",
        style: {
          background: "#eff6ff",   // light blue
          border: "1px solid #93c5fd", // blue border
          color: "#1e3a5f",        // dark blue text
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              {...register("name")}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="your-username"
              {...register("username")}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border-transparent text-sm font-semibold normal-case mt-1"
          >
            {isSubmitting ? "Saving…" : "Complete setup"}
          </Button>
        </form>
      </div>
    </main>
  );
}
