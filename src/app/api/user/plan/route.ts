import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId, has, sessionClaims } = await auth();

    if (!userId) {
      return NextResponse.json({ plan: "free" });
    }

    // Method 1: Check using has() helper (Clerk Billing standard method)
    // Check for exact plan names from Clerk Dashboard
    const hasMaxPlan = has({ plan: "Max Plan" }) || has({ plan: "max" });
    if (hasMaxPlan) {
      return NextResponse.json({ plan: "max" });
    }

    const hasProPlan = has({ plan: "pro plan" }) || has({ plan: "pro" });
    if (hasProPlan) {
      return NextResponse.json({ plan: "pro" });
    }

    // Method 2: Check sessionClaims for Clerk Billing subscriptions
    if ((sessionClaims?.__billing as any)?.subscriptions) {
      const subscriptions = (sessionClaims.__billing as any).subscriptions as any[];

      // Find active subscription
      const activeSubscription = subscriptions.find(
        (sub: any) => sub.status === "active" || sub.status === "trialing"
      );

      if (activeSubscription?.plan) {
        const planName = activeSubscription.plan.toLowerCase();
        // Match "Max Plan" or "max"
        if (planName === "max plan" || planName === "max") {
          return NextResponse.json({ plan: "max" });
        }
        // Match "pro plan" or "pro"
        if (planName === "pro plan" || planName === "pro") {
          return NextResponse.json({ plan: "pro" });
        }
      }
    }

    // Method 3: Check user's public metadata (manual assignment)
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userPlan = user.publicMetadata?.plan as string | undefined;

    if (userPlan === "max" || userPlan === "Max Plan") {
      return NextResponse.json({ plan: "max" });
    }

    if (userPlan === "pro" || userPlan === "pro plan") {
      return NextResponse.json({ plan: "pro" });
    }

    // Default to Free plan
    return NextResponse.json({ plan: "free" });
  } catch (error) {
    console.error("Error fetching user plan:", error);
    return NextResponse.json({ plan: "free" });
  }
}
