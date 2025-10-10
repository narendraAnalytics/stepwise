import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { solutionsTable, usersTable } from "@/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";

export async function GET() {
  try {
    const { userId: clerkId, has } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Determine user's plan
    const hasMaxPlan = has({ plan: "max" });
    const hasProPlan = has({ plan: "pro" });

    let plan: "free" | "pro" | "max" = "free";
    let limit = 2; // Free plan limit

    if (hasMaxPlan) {
      plan = "max";
      limit = -1; // Unlimited
    } else if (hasProPlan) {
      plan = "pro";
      limit = 8;
    }

    // Get current month's start date
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Count solutions created this month
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(solutionsTable)
      .where(
        and(
          eq(solutionsTable.userId, user.id),
          gte(solutionsTable.createdAt, currentMonthStart)
        )
      );

    const usageCount = Number(result?.count || 0);
    const canSolve = limit === -1 || usageCount < limit;
    const remaining = limit === -1 ? -1 : Math.max(0, limit - usageCount);

    return NextResponse.json({
      plan,
      usageCount,
      limit,
      remaining,
      canSolve,
    });
  } catch (error) {
    console.error("Error fetching user usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch usage data" },
      { status: 500 }
    );
  }
}
