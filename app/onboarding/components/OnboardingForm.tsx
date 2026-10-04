"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { onboardingFormSchema, OnboardingFormData } from "../validations/onboarding";
import { onboardUser } from "@/actions/user.actions";

export type OnboardingFormProps = {
  user: {
    clerkUserId: string;
    name: string;
    email: string;
    username: string;
  };
};

export default function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      const result = await onboardUser(user.clerkUserId, data);

      if (result.success) {
        setToastMessage({
          title: "Welcome to FileHub!",
          desc: "Your account is all set up. Let’s get started!",
          type: "success",
        });

        setTimeout(() => {
          router.push("/main");
        }, 1500); // Allow the user to see the success toast before redirecting
      } else {
        setToastMessage({
          title: "Error",
          desc: result.error || "Failed to complete onboarding",
          type: "error",
        });
      }
    } catch (error) {
      setToastMessage({
        title: "Error",
        desc: "An unexpected error occurred.",
        type: "error",
      });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {toastMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg z-50 text-center ${
            toastMessage.type === "success"
              ? "bg-blue-50 border border-blue-400 text-blue-900"
              : "bg-red-50 border border-red-400 text-red-900"
          }`}
        >
          <h4 className="font-semibold text-lg">{toastMessage.title}</h4>
          <p className="text-sm">{toastMessage.desc}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Complete Onboarding</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#6c47ff] focus:border-[#6c47ff]"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#6c47ff] focus:border-[#6c47ff]"
            placeholder="johndoe123"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#6c47ff] focus:border-[#6c47ff]"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#6c47ff] hover:bg-[#5b3ae0] text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Complete Setup"}
        </button>
      </form>
    </div>
  );
}
