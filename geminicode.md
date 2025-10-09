TypeScriptCode :


// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();

-------------------------------------------------------------------------


JavaScriptCode :

The following example shows how to read an image from a local file and pass it to generateContent API for processing.

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});
const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
  encoding: "base64",
});

const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
});
console.log(response.text);

---------------------------------------------------------------

Here's a basic example that takes a single text input:

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "How does AI work?",
  });
  console.log(response.text);
}

await main();

--------------------------------------------------------------------------


## StepWise - Math Problem Solving Features

1. **Image Upload Math Problem Solving**
   - Support for JPEG, PNG, WebP formats
   - Maximum file size: 10MB
   - High-quality image processing

2. **Text Input Math Problem Solving**
   - Up to 500 characters per submission
   - Standard math notation support
   - Multiple problems in one input

3. **Multiple Problem Detection & Solving**
   - Automatically detects all problems in one image/text
   - Solves each problem individually
   - Organized by problem numbers

4. **AI-Powered Step-by-Step Solutions**
   - Uses Gemini 2.0 Flash AI model
   - Comprehensive problem analysis
   - Educational explanations

5. **Problem Statement Identification**
   - Clear problem restatement
   - Identifies what the question is asking

6. **Key Concept Explanation**
   - Main mathematical concepts explained
   - Formula identification
   - Theory behind the solution

7. **Detailed Step-by-Step Breakdown**
   - Each step explained with reasoning
   - Shows WHY each step is performed
   - Simple language for easy understanding

8. **Final Answer Highlighting**
   - Clearly marked final answers
   - Bright gradient highlighting
   - Easy to identify results

9. **Quick Tips for Similar Problems**
   - Memory aids and shortcuts
   - Pattern recognition tips
   - Common pitfalls to avoid

10. **Practice Tips for Improvement**
    - Similar problem types suggested
    - Practice recommendations
    - Skill development guidance

11. **Full-Page Solution View**
    - Clean, distraction-free reading experience
    - Optimized typography and spacing
    - Scrollable content area

12. **Back to Dashboard Navigation**
    - Easy return to input screen
    - Resets for fresh problem solving
    - Smooth animations

13. **Math Symbols Quick Input Keyboard**
    - Common symbols: +, -, ×, ÷, =, ², ³, √, π, ∞
    - Advanced symbols: ∫, ∂, α, β, θ, →, ⁻¹, ᵀ
    - One-click symbol insertion

14. **Drag & Drop Image Upload**
    - Intuitive drag and drop interface
    - Visual feedback during drag
    - Alternative file browser option

15. **Real-time Solving Progress Indicators**
    - Loading animations
    - "Solving..." status display
    - Smooth transitions

16. **Clean Markdown-Free Output**
    - Removes asterisks and formatting symbols
    - Clean text presentation
    - Professional appearance

17. **Color-Coded Solution Sections**
    - Purple/Pink gradients for problem titles
    - Orange/Amber gradients for section headers
    - Green/Teal gradients for final answers
    - Cyan gradients for steps
    - Enhanced readability

Implementation Plan: Save & Track Math Solutions                                                                                                            │
     │                                                                                                                                                             │
     │ 1. Database Schema Updates                                                                                                                                  │
     │                                                                                                                                                             │
     │ - Create new solutions table with:                                                                                                                          │
     │   - id, userId (links to users table), problemNumber (integer 1,2,3...), problemType (image/text), problemContent (text/base64), solution (text), createdAt │
     │   - No auto-increment - manually count existing records to assign next number                                                                               │   
     │                                                                                                                                                             │   
     │ 2. Backend API Changes                                                                                                                                      │   
     │                                                                                                                                                             │   
     │ - Modify /api/solve/route.ts:                                                                                                                               │   
     │   - Extract userId from Clerk auth                                                                                                                          │   
     │   - Count existing solutions for user to get next problemNumber                                                                                             │   
     │   - Auto-save solution to database after successful generation                                                                                              │   
     │   - Return problemNumber in API response                                                                                                                    │   
     │                                                                                                                                                             │   
     │ 3. Frontend Components Updates                                                                                                                              │   
     │                                                                                                                                                             │   
     │ A. ImageUpload.tsx & TextInput.tsx:                                                                                                                         │   
     │ - Accept and store problemNumber returned from API                                                                                                          │   
     │ - Display success toast showing "Saved as Problem #X"                                                                                                       │   
     │                                                                                                                                                             │   
     │ B. Create New Sidebar Component:                                                                                                                            │   
     │ - Floating sidebar with numbered buttons [1] [2] [3]...                                                                                                     │   
     │ - Buttons styled with gradient, clickable                                                                                                                   │   
     │ - Fetches saved solutions from API on mount                                                                                                                 │   
     │ - Clicking button loads that problem's solution into view                                                                                                   │   
     │ - Auto-updates when new solution is saved                                                                                                                   │   
     │                                                                                                                                                             │   
     │ C. Solve Dashboard (page.tsx):                                                                                                                              │   
     │ - Integrate sidebar component                                                                                                                               │   
     │ - Pass callback to update sidebar when new solution created                                                                                                 │   
     │                                                                                                                                                             │
     │ 4. New API Endpoint                                                                                                                                         │   
     │                                                                                                                                                             │   
     │ - Create /api/solutions/route.ts:                                                                                                                           │   
     │   - GET: Fetch all saved solutions for authenticated user                                                                                                   │   
     │   - Returns array of {problemNumber, solution, problemType, createdAt}                                                                                      │   
     │                                                                                                                                                             │   
     │ 5. UI Enhancements                                                                                                                                          │   
     │                                                                                                                                                             │   
     │ - Maintain existing gradient design system                                                                                                                  │   
     │ - Sidebar positioned right side with smooth animations                                                                                                      │   
     │ - Number buttons pulsate on hover                                                                                                                           │   
     │ - Active solution highlighted                                                                                                                               │   
     │                                                                                                                                                             │   
     │ Key Features:                                                                                                                                               │   
     │ - ✅ Manual number counting (1,2,3...) - NO autoincrement                                                                                                    │   
     │ - ✅ Auto-save on successful solve                                                                                                                           │   
     │ - ✅ View saved solutions by clicking number buttons                                                                                                         │   
     │ - ✅ Restrict user limits based on count (future-ready)                                                                                                      │   
     │ - ✅ Same beautiful gradient UI preserved   