import { z } from "zod";

// ------------------------------------------------------------------
// onboardingFormSchema
// Validates the three fields collected during user onboarding.
// ------------------------------------------------------------------
export const onboardingFormSchema = z.object({
  // Display name — required, max 50 chars.
  name: z
    .string()
    .min(1, { error: "Name is required." })
    .max(50, { error: "Name must be at most 50 characters." }),

  // URL-safe handle — trimmed, lowercased, alphanumeric + hyphens/underscores only.
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: "Username is required." })
    .max(50, { error: "Username must be at most 50 characters." })
    .regex(/^[a-z0-9_-]+$/, {
      error:
        "Username may only contain lowercase letters, numbers, hyphens, and underscores.",
    }),

  // Valid email address.
  email: z.email({ pattern: z.regexes.email }),
});

// TypeScript type inferred directly from the schema.
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
