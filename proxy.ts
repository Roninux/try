import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes that are publicly accessible without authentication.
const isPublicRoute = createRouteMatcher([
  '/',                       // Landing page
  '/sign-in(.*)',            // Clerk sign-in catch-all
  '/sign-up(.*)',            // Clerk sign-up catch-all
  '/f/(.*)',                 // Public file download pages
  '/api/webhooks/clerk',    // Clerk webhook — called by Clerk servers, not users
])


export default clerkMiddleware(async (auth, request) => {
  // Protect every route that is NOT in the public list.
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}