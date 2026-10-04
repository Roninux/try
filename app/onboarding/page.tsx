import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/user.actions";
<<<<<<< HEAD
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
=======
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-up");
  }

  const dbUser = await getUser(clerkUser.id);

  if (!dbUser) {
    redirect("/sign-up");
  }

  if (dbUser.onboarded) {
    redirect("/main");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <OnboardingForm 
        user={{
          clerkUserId: dbUser.clerkUserId,
          name: dbUser.name,
          email: dbUser.email,
          username: dbUser.username,
        }} 
      />
    </div>
  );
>>>>>>> 0f15419 ( hub v2)
}
