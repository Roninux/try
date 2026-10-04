import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import UploadFileModal from "./components/UploadFileModal";

export default async function MainPage() {
  // Check if there is a signed-in Clerk user
  const clerkUser = await currentUser();

  // If no Clerk user exists, immediately redirect to sign-in
  if (!clerkUser) {
    redirect("/sign-in");
  }

  // Fetch the database user using the Clerk user's ID
  const dbUser = await getUser(clerkUser.id);

  // If no database user is found, redirect to sign-in as a safety fallback
  if (!dbUser) {
    redirect("/sign-in");
  }

  // If the database user exists but is not onboarded, redirect to onboarding
  // @ts-ignore - Assuming onboarded exists on dbUser model
  if (!dbUser.onboarded) {
    redirect("/onboarding");
  }

  // If all checks pass, render the UploadFileModal
  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 min-h-[calc(100vh-160px)]">
      <UploadFileModal />
    </div>
  );
}
