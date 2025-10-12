import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { solutionsTable, usersTable } from "@/db/schema";
import { eq, count, and, gte, sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId: clerkId, has, sessionClaims } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check user's plan and usage limits
    // Check for exact plan names from Clerk Dashboard
    let hasMaxPlan = has({ plan: "Max Plan" }) || has({ plan: "max" });
    let hasProPlan = has({ plan: "pro plan" }) || has({ plan: "pro" });

    // Check sessionClaims for Clerk Billing subscriptions
    const billing = sessionClaims as any;
    if (!hasMaxPlan && !hasProPlan && billing?.__billing?.subscriptions) {
      const subscriptions = billing.__billing.subscriptions as any[];
      const activeSubscription = subscriptions.find(
        (sub: any) => sub.status === "active" || sub.status === "trialing"
      );

      if (activeSubscription?.plan) {
        const planName = activeSubscription.plan.toLowerCase();
        // Match "Max Plan" or "max"
        if (planName === "max plan" || planName === "max") {
          hasMaxPlan = true;
        // Match "pro plan" or "pro"
        } else if (planName === "pro plan" || planName === "pro") {
          hasProPlan = true;
        }
      }
    }

    // Also check user's public metadata (for manual assignment)
    if (!hasMaxPlan && !hasProPlan) {
      const { clerkClient: getClerkClient } = await import("@clerk/nextjs/server");
      const client = await getClerkClient();
      const user = await client.users.getUser(clerkId);
      const userPlan = user.publicMetadata?.plan as string | undefined;

      if (userPlan === "max" || userPlan === "Max Plan") {
        hasMaxPlan = true;
      } else if (userPlan === "pro" || userPlan === "pro plan") {
        hasProPlan = true;
      }
    }

    let limit = 2; // Free plan limit
    if (hasMaxPlan) {
      limit = -1; // Unlimited
    } else if (hasProPlan) {
      limit = 8;
    }

    // Get user from database
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check monthly usage if not unlimited
    if (limit !== -1) {
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const [usageResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(solutionsTable)
        .where(
          and(
            eq(solutionsTable.userId, user.id),
            gte(solutionsTable.createdAt, currentMonthStart)
          )
        );

      const usageCount = Number(usageResult?.count || 0);

      if (usageCount >= limit) {
        return NextResponse.json(
          {
            error: `You've reached your monthly limit of ${limit} problems. Please upgrade to continue solving!`,
            limitReached: true
          },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { type, content, mimeType } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let response;

    if (type === "image") {
      // Handle image-based math problem
      const contents = [
        {
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: content, // base64 image data
          },
        },
        {
          text: `You are an expert math teacher with 25 years of experience and have won top international prizes in mathematics. Your specialty is making complex math simple and fun for children from grades 5-12.

IMPORTANT: Analyze this image carefully and identify ALL math problems present in it. Solve EVERY problem you find - if there are 5 problems, solve all 5; if there's 1 problem, solve that 1.

For EACH problem, provide:
1. **Problem Number & Statement**: Clearly state what the question is asking
2. **Key Concept**: Explain the main mathematical concept or formula being used
3. **Step-by-Step Solution**: Break down the solution into simple, easy-to-understand steps. Use simple language that children can understand. Explain WHY you're doing each step.
4. **Final Answer**: Highlight the final answer clearly
5. **Quick Tip**: Share a helpful tip or concept that makes this type of problem easier to remember
6. **Practice Tip**: Provide a practical tip or similar problem type for practice

Remember: Make it simple, friendly, and encouraging. Use everyday examples when helpful. Your goal is to help students understand the process, not just get the answer.

Format your response with clear problem numbers (e.g., "**Problem 1:**", "**Problem 2:**", etc.) so students can easily follow along.`,
        },
      ];

      response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: contents,
      });
    } else if (type === "text") {
      // Handle text-based math problem
      response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: `You are an expert math teacher with 25 years of experience and have won top international prizes in mathematics. Your specialty is making complex math simple and fun for children from grades 5-12.

IMPORTANT: Analyze the input carefully and identify ALL math problems present in it. Solve EVERY problem you find - if there are 5 problems, solve all 5; if there's 1 problem, solve that 1.

Math Problem(s): ${content}

For EACH problem, provide:
1. **Problem Number & Statement**: Clearly state what the question is asking
2. **Key Concept**: Explain the main mathematical concept or formula being used
3. **Step-by-Step Solution**: Break down the solution into simple, easy-to-understand steps. Use simple language that children can understand. Explain WHY you're doing each step.
4. **Final Answer**: Highlight the final answer clearly
5. **Quick Tip**: Share a helpful tip or concept that makes this type of problem easier to remember
6. **Practice Tip**: Provide a practical tip or similar problem type for practice

Remember: Make it simple, friendly, and encouraging. Use everyday examples when helpful. Your goal is to help students understand the process, not just get the answer.

Format your response with clear problem numbers (e.g., "**Problem 1:**", "**Problem 2:**", etc.) so students can easily follow along.`,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
    }

    const solution = response.text;

    // Count existing solutions for this user to get next problem number
    const [solutionCount] = await db
      .select({ count: count() })
      .from(solutionsTable)
      .where(eq(solutionsTable.clerkId, clerkId));

    const problemNumber = (solutionCount?.count || 0) + 1;

    // Auto-save solution to database
    const solutionData: any = {
      userId: user.id,
      clerkId: clerkId,
      problemNumber: problemNumber,
      problemType: type,
      problemContent: content,
      solution: solution,
    };

    if (type === "image" && mimeType) {
      solutionData.mimeType = mimeType;
    }

    await db.insert(solutionsTable).values(solutionData);

    return NextResponse.json({
      success: true,
      solution,
      problemNumber,
    });
  } catch (error) {
    console.error("Error solving math problem:", error);
    return NextResponse.json(
      { error: "Failed to solve math problem" },
      { status: 500 }
    );
  }
}
