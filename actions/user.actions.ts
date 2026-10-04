// Re-exports from the real implementation so all existing imports resolve correctly.
export {
  createOrUpdateUser,
  onboardUser,
  deleteUser,
  getUser,
  completeOnboarding,
  onboardUser,
  type ClerkUserWebhookData,
  type OnboardingData,
} from "@/app/server/actions/user.actions";
