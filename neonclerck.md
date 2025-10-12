# Clerk Billing Integration - Plan Status Display in Navbar

This guide explains how to implement Clerk Billing with real-time plan status updates in the navbar after user login and plan changes.

## Overview

When a user logs in or upgrades their plan (free � pro � max), the plan status badge in the navbar automatically updates to reflect their current subscription level using Clerk's billing system.

---

## Step 1: Enable Clerk Billing

### 1.1 Dashboard Setup
1. Navigate to [Clerk Dashboard � Billing Settings](https://dashboard.clerk.com/last-active?path=billing/settings)
2. Enable billing for your application
3. Choose payment gateway:
   - **Development**: Use Clerk's shared test Stripe account
   - **Production**: Connect your own Stripe account

### 1.2 Key Information
- **Cost**: 0.7% per transaction + Stripe fees
- **No Stripe Billing needed**: Plans managed in Clerk Dashboard only
- **Stripe is only used for payment processing**

---

## Step 2: Create Plans in Clerk Dashboard

### 2.1 Navigate to Plans
1. Go to [Clerk Dashboard � Plans](https://dashboard.clerk.com/last-active?path=billing/plans)
2. Select **"Plans for Users"** tab (B2C SaaS)
3. Click **"Add Plan"**

### 2.2 Create Three Plans

**Free Plan:**
- Name: `free`
- Price: $0
- Features: Basic access, 2 maths/month

**Pro Plan:**
- Name: `pro`
- Price: $4/month or $40/year
- Features: 8 maths/month, advanced features

**Max Plan:**
- Name: `max`
- Price: $15/month or $150/year
- Features: Unlimited maths, all features

> **Important**: Use lowercase plan names (`free`, `pro`, `max`) as they'll be used in code

---

## Step 3: Server-Side Plan Detection

### 3.1 Create Plan Detection Function

Create `src/lib/get-user-plan.ts`:

```typescript
import { auth } from '@clerk/nextjs/server';

export async function getUserPlan(): Promise<string> {
  try {
    const { has } = await auth();

    // Check Clerk billing plans in order of priority
    if (has({ plan: 'max' })) {
      return 'max';
    } else if (has({ plan: 'pro' })) {
      return 'pro';
    } else {
      return 'free';
    }
  } catch (error) {
    console.error('Error fetching user plan from Clerk:', error);
    return 'free'; // Default fallback
  }
}
```

**How it works:**
- Uses Clerk's `has()` method from the `auth()` object
- Checks if user has a specific plan: `has({ plan: 'planName' })`
- Returns plan as string: 'free', 'pro', or 'max'
- Defaults to 'free' on error

---

## Step 4: API Route for Plan Status

### 4.1 Create API Endpoint

Create `src/app/api/user-plan/route.ts`:

```typescript
import { getUserPlan } from '@/lib/get-user-plan';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const plan = await getUserPlan();

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Purpose:**
- Exposes plan status to frontend via `/api/user-plan`
- Returns JSON: `{ "plan": "pro" }`
- Used by client components to display current plan

---

## Step 5: Plan Status Badge Component

### 5.1 Create Badge Component

Create `src/components/plan-status-badge.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { Crown, Star, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

type PlanType = "free" | "pro" | "max";

interface PlanConfig {
  name: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
  animation: string;
}

const planConfigs: Record<PlanType, PlanConfig> = {
  free: {
    name: "Free",
    icon: <Star className="w-3 h-3" />,
    colors: {
      bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
      text: "text-white",
      border: "border-emerald-400",
      glow: "shadow-emerald-500/50"
    },
    animation: "animate-pulse"
  },
  pro: {
    name: "Pro",
    icon: <Sparkles className="w-3 h-3" />,
    colors: {
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
      text: "text-white",
      border: "border-orange-400",
      glow: "shadow-orange-500/50"
    },
    animation: "animate-bounce"
  },
  max: {
    name: "Max",
    icon: <Crown className="w-3 h-3" />,
    colors: {
      bg: "bg-gradient-to-r from-purple-500 to-pink-500",
      text: "text-white",
      border: "border-purple-400",
      glow: "shadow-purple-500/50"
    },
    animation: "animate-pulse"
  }
};

export default function PlanStatusBadge() {
  const { user } = useUser();
  const [currentPlan, setCurrentPlan] = useState<PlanType | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch actual user plan from API
  useEffect(() => {
    if (user) {
      const fetchUserPlan = async () => {
        try {
          const response = await fetch('/api/user-plan');
          if (response.ok) {
            const { plan } = await response.json();
            setCurrentPlan(plan as PlanType);
          } else {
            setCurrentPlan("free"); // Default fallback
          }
        } catch (error) {
          console.error('Error fetching user plan:', error);
          setCurrentPlan("free"); // Default fallback
        }
      };

      fetchUserPlan();

      // Animate in after a brief delay
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [user]);

  const handlePlanClick = () => {
    if (currentPlan === "free") {
      toast.info("( Upgrade to Pro for more recipes and features!");
    } else if (currentPlan === "pro") {
      toast.info("=Q Upgrade to Max for unlimited access!");
    } else {
      toast.success("=Q You're on the Max plan - enjoying unlimited access!");
    }
  };

  if (!user || !isVisible || !currentPlan) return null;

  const config = planConfigs[currentPlan];

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <Badge
        variant="outline"
        onClick={handlePlanClick}
        className={`
          ${config.colors.bg} ${config.colors.text} ${config.colors.border}
          border-2 backdrop-blur-sm shadow-lg ${config.colors.glow}
          px-3 py-1 text-xs font-semibold uppercase tracking-wide
          hover:scale-110 hover:rotate-1 transition-all duration-300 cursor-pointer
          relative overflow-hidden group hover:shadow-2xl hover:brightness-110
        `}
      >
        <div className={`flex items-center gap-1.5 relative z-10 ${config.animation}`}>
          {config.icon}
          <span>{config.name}</span>
        </div>
      </Badge>
    </div>
  );
}
```

**Key Features:**
- Fetches plan from `/api/user-plan` when user logs in
- Displays color-coded badge (green=Free, orange=Pro, purple=Max)
- Auto-updates when plan changes (through `useEffect` monitoring `user`)
- Shows toast message on click with upgrade suggestions

---

## Step 6: Navbar Integration

### 6.1 Add Badge to Navbar

In `src/components/navbar.tsx`:

```typescript
"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanStatusBadge from "@/components/plan-status-badge";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1>SnapCook</h1>

          {/* Plan Status Badge - only show when signed in */}
          <SignedIn>
            <PlanStatusBadge />
          </SignedIn>
        </div>

        {/* Navigation items */}

        {/* Auth Buttons */}
        <div>
          <SignedOut>
            <Button>Get Started</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
```

**Integration Points:**
- Badge wrapped in `<SignedIn>` - only visible to authenticated users
- Placed next to logo for visibility
- Automatically appears after login
- Re-fetches plan status when user object changes

---

## Step 7: How Plan Status Updates Work

### 7.1 After Login Flow

```
User Logs In
    �
Clerk authenticates user
    �
Navbar renders
    �
<SignedIn> shows PlanStatusBadge
    �
PlanStatusBadge useEffect runs
    �
useUser() hook detects user
    �
Fetch /api/user-plan
    �
API calls getUserPlan()
    �
getUserPlan() uses auth().has({ plan: 'xxx' })
    �
Clerk checks user's active subscription
    �
Returns plan: 'free' | 'pro' | 'max'
    �
Badge displays with correct color/icon
```

### 7.2 After Plan Upgrade Flow

```
User Upgrades Plan (free � pro)
    �
Clerk processes subscription via Stripe
    �
Clerk updates user's plan metadata
    �
User object updates in Clerk
    �
useUser() hook detects change
    �
useEffect re-runs (dependency: [user])
    �
Fetches /api/user-plan again
    �
getUserPlan() checks has({ plan: 'pro' })
    �
Returns 'pro'
    �
Badge updates to PRO (orange)
```

**Automatic Update Trigger:**
- The `useEffect` has `[user]` as dependency
- When user upgrades plan, Clerk updates the user object
- `useUser()` hook re-renders with new data
- `useEffect` runs again, fetching updated plan
- Badge re-renders with new plan status

---

## Step 8: Environment Variables

### 8.1 Required Variables

In `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

## Step 9: Testing Plan Status Changes

### 9.1 Testing in Development

1. **Free Plan (Default):**
   - Create new user
   - Badge shows "FREE" (green)

2. **Upgrade to Pro:**
   - In Clerk Dashboard � Users � Select User
   - Click "Billing" tab
   - Assign "pro" plan manually
   - Refresh app � Badge shows "PRO" (orange)

3. **Upgrade to Max:**
   - Assign "max" plan in Clerk Dashboard
   - Badge shows "MAX" (purple)

### 9.2 Testing in Production

1. User subscribes through pricing page
2. Clerk processes payment via Stripe
3. Plan automatically updates
4. Badge reflects new status on next page load or user object refresh

---

## Step 10: Access Control Based on Plans

### 10.1 Server-Side Protection

Protect routes or features based on plan:

```typescript
// In a page component or API route
import { auth } from '@clerk/nextjs/server';

export default async function PremiumFeature() {
  const { has } = await auth();

  const hasProAccess = has({ plan: 'pro' }) || has({ plan: 'max' });

  if (!hasProAccess) {
    return <h1>Upgrade to Pro to access this feature</h1>;
  }

  return <h1>Premium Content</h1>;
}
```

### 10.2 Client-Side Protection

Using the `<Protect>` component:

```typescript
import { Protect } from '@clerk/nextjs';

export default function ProtectedPage() {
  return (
    <Protect
      plan="pro"
      fallback={<p>Only Pro subscribers can access this.</p>}
    >
      <h1>Exclusive Pro Content</h1>
    </Protect>
  );
}
```

### 10.3 Feature-Based Access

Check by feature instead of plan:

```typescript
const { has } = await auth();
const hasAdvancedFeatures = has({ feature: 'advanced_recipes' });
```

---

## Step 11: Recipe Limits Based on Plan

### 11.1 Implementation Example

From `src/app/api/user-recipe-count/route.ts`:

```typescript
import { getUserPlan } from '@/lib/get-user-plan';

export async function GET() {
  const { userId } = await auth();
  const userPlan = await getUserPlan();

  // Count user's recipes from database
  const recipeCount = await db
    .select({ count: count() })
    .from(recipesTable)
    .where(eq(recipesTable.clerkId, userId));

  // Define limits based on plan
  const planLimits = {
    free: 2,
    pro: 8,
    max: -1  // Unlimited
  };

  const limit = planLimits[userPlan as keyof typeof planLimits];
  const hasReachedLimit = limit !== -1 && recipeCount >= limit;

  return NextResponse.json({
    recipeCount,
    limit,
    hasReachedLimit,
    plan: userPlan,
    remaining: limit === -1 ? -1 : Math.max(0, limit - recipeCount)
  });
}
```

---

## Step 12: Middleware Configuration

### 12.1 Basic Clerk Middleware

In `src/middleware.ts`:

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

**Purpose:**
- Runs on all routes except static files
- Makes `auth()` available in server components
- Enables plan detection via `has()` method

---

## Summary: Complete Architecture

```
