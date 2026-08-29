import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/user.actions";
import OnboardingForm from "@/app/onboarding/components/onboarding-form";


export default async function OnboardingPage() {
  // 1. Grab the Clerk user — redirect to sign-up if not authenticated.
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-up");

  // 2. Grab the database user — redirect to sign-up if no DB record exists.
  const dbUser = await getUser(clerkUser.id);
  if (!dbUser) redirect("/sign-up");

  // 3. Already onboarded — send to the main app.
  if (dbUser.onboarded) redirect("/main");

  // 4. Render the onboarding form, passing the DB user as a prop.
  return <OnboardingForm user={dbUser} />;
}
