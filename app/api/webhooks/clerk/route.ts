import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import {
  createOrUpdateUser,
  deleteUser,
  type ClerkUserWebhookData,
} from "@/app/server/actions/user.actions";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    const data = evt.data;

    // Sync new or updated Clerk users into the database.
    if (eventType === "user.created" || eventType === "user.updated") {
      await createOrUpdateUser(data as ClerkUserWebhookData);
    }

    // Remove the user row when deleted from Clerk.
    if (eventType === "user.deleted") {
      await deleteUser(data.id as string);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
