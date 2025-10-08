import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
2. **Step-by-Step Solution**: Break down the solution into simple, easy-to-understand steps. Use simple language that children can understand. Explain WHY you're doing each step.
3. **Final Answer**: Highlight the final answer clearly
4. **Quick Tip**: Share a helpful tip or concept that makes this type of problem easier to remember

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
2. **Step-by-Step Solution**: Break down the solution into simple, easy-to-understand steps. Use simple language that children can understand. Explain WHY you're doing each step.
3. **Final Answer**: Highlight the final answer clearly
4. **Quick Tip**: Share a helpful tip or concept that makes this type of problem easier to remember

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

    return NextResponse.json({
      success: true,
      solution,
    });
  } catch (error) {
    console.error("Error solving math problem:", error);
    return NextResponse.json(
      { error: "Failed to solve math problem" },
      { status: 500 }
    );
  }
}
