import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that are publicly accessible without authentication.
const isPublicRoute = createRouteMatcher([
  "/",                // Landing page
  "/sign-in(.*)",    // Clerk sign-in catch-all
  "/sign-up(.*)",    // Clerk sign-up catch-all
  "/f/(.*)",         // Public file download pages
]);

export default clerkMiddleware(async (auth, request) => {
  // Protect every route that is NOT public.
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Run middleware on all routes except Next.js internals and static files.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
