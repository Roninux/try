import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/user.actions";
import LandingPage from "@/app/landing-page";

export default async function Homepage() {
  // 1. Grab the Clerk user ID (null when unauthenticated).
  const clerkUser = await currentUser();

  if (clerkUser) {
    // 2. Grab the matching database user via the Clerk user ID.
    const dbUser = await getUser(clerkUser.id);

    if (dbUser) {
      // 3a. Fully onboarded → go to the main app.
      if (dbUser.onboarded) redirect("/main");

      // 3b. Registered but not yet onboarded → complete onboarding.
      redirect("/onboarding");
    }
  }

  // 4. No Clerk session → render the public landing page.
  return <LandingPage />;
}
