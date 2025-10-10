import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId, has } = await auth();

    if (!userId) {
      return NextResponse.json({ plan: "free" });
    }

    // Check for Max plan first (highest tier)
    const hasMaxPlan = has({ plan: "max" });
    if (hasMaxPlan) {
      return NextResponse.json({ plan: "max" });
    }

    // Check for Pro plan
    const hasProPlan = has({ plan: "pro" });
    if (hasProPlan) {
      return NextResponse.json({ plan: "pro" });
    }

    // Default to Free plan
    return NextResponse.json({ plan: "free" });
  } catch (error) {
    console.error("Error fetching user plan:", error);
    return NextResponse.json({ plan: "free" });
  }
}
