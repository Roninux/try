import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import UploadFileModal from "@/app/main/components/UploadFileModal";

// Main page — async server component.
// Runs auth + onboarding checks before rendering any UI.
export default async function MainPage() {
  // 1. Verify there is a signed-in Clerk session.
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  // 2. Fetch the matching database user.
  const dbUser = await getUser(clerkUser.id);
  if (!dbUser) redirect("/sign-in");

  // 3. Ensure the user has completed onboarding.
  if (!dbUser.onboarded) redirect("/onboarding");

  // 4. All checks passed — render the main UI.
  return <UploadFileModal />;
}
