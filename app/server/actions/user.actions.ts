"use server";

import prisma from "@/lib/prisma";

// ------------------------------------------------------------------
// Type — shape of the data Clerk sends in user.created / user.updated
// webhook events.
// ------------------------------------------------------------------
export type ClerkUserWebhookData = {
  /** The unique Clerk user ID (e.g. "user_2abc…"). */
  id: string;

  /** Array of email objects attached to this Clerk account. */
  email_addresses: { email_address: string }[];

  /** Optional fields — may be null when not provided by the user. */
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
};

// ------------------------------------------------------------------
// createOrUpdateUser
// Upserts a User row keyed on clerkUserId.
// Called by the Clerk webhook on user.created and user.updated events.
// ------------------------------------------------------------------
export async function createOrUpdateUser(data: ClerkUserWebhookData) {
  try {
    // Destructure all relevant fields from the Clerk webhook payload.
    const {
      id: clerkUserId,
      email_addresses,
      first_name,
      last_name,
      username,
    } = data;

    // Primary email address for this Clerk account.
    const email = email_addresses[0]?.email_address ?? "";

    // Derive a display name: "First Last" → username → email local-part.
    const fullName =
      first_name && last_name
        ? `${first_name} ${last_name}`.trim()
        : first_name?.trim() ?? last_name?.trim() ?? null;

    const name = fullName ?? username ?? email.split("@")[0];

    // Derive a username: explicit Clerk username → email local-part.
    const resolvedUsername = username ?? email.split("@")[0];

    // Upsert: update if a row with this clerkUserId exists, create otherwise.
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name,
        username: resolvedUsername,
      },
      create: {
        clerkUserId,
        email,
        name,
        username: resolvedUsername,
      },
    });

    return user;
  } catch (error) {
    throw new Error(
      `createOrUpdateUser failed for Clerk ID "${data.id}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// ------------------------------------------------------------------
// deleteUser
// Deletes the User row that matches the given Clerk user ID.
// Called by the Clerk webhook on user.deleted events.
// The cascade rule in the schema removes all related File rows too.
// ------------------------------------------------------------------
export async function deleteUser(clerkUserId: string) {
  try {
    await prisma.user.delete({
      where: { clerkUserId },
    });
  } catch (error) {
    throw new Error(
      `deleteUser failed for Clerk ID "${clerkUserId}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// ------------------------------------------------------------------
// getUser
// Looks up a single User row by Clerk user ID.
// Returns the user object, or null if no matching record exists.
// ------------------------------------------------------------------
export async function getUser(clerkUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    return user;
  } catch (error) {
    throw new Error(
      `getUser failed for Clerk ID "${clerkUserId}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
