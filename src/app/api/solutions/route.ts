import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { solutionsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all solutions for this user, ordered by problem number
    const solutions = await db
      .select({
        id: solutionsTable.id,
        problemNumber: solutionsTable.problemNumber,
        solution: solutionsTable.solution,
        problemType: solutionsTable.problemType,
        problemContent: solutionsTable.problemContent,
        mimeType: solutionsTable.mimeType,
        createdAt: solutionsTable.createdAt,
      })
      .from(solutionsTable)
      .where(eq(solutionsTable.clerkId, clerkId))
      .orderBy(desc(solutionsTable.problemNumber));

    return NextResponse.json({
      success: true,
      solutions,
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch solutions" },
      { status: 500 }
    );
  }
}
