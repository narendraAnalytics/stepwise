"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ImageUpload from "@/components/dashboard/ImageUpload";
import TextInput from "@/components/dashboard/TextInput";
import SavedSolutionsSidebar from "@/components/dashboard/SavedSolutionsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SavedSolution {
  id: number;
  problemNumber: number;
  solution: string;
  problemType: string;
  problemContent: string;
  mimeType: string | null;
  createdAt: string;
}

interface UsageData {
  plan: "free" | "pro" | "max";
  usageCount: number;
  limit: number;
  remaining: number;
  canSolve: boolean;
}

export default function SolveDashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("image");
  const [selectedSolution, setSelectedSolution] = useState<SavedSolution | null>(null);
  const [refreshSidebar, setRefreshSidebar] = useState(0);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);

  // Fetch user usage data
  useEffect(() => {
    const fetchUsage = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/user/usage");
          const data = await response.json();
          setUsageData(data);
        } catch (error) {
          console.error("Error fetching usage:", error);
        } finally {
          setIsLoadingUsage(false);
        }
      }
    };

    fetchUsage();
  }, [isSignedIn, refreshSidebar]); // Refreshes when refreshSidebar changes

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    redirect("/");
  }

  if (!isLoaded || isLoadingUsage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const handleSolutionSelect = (solution: SavedSolution) => {
    // Switch to the correct tab based on problem type (image or text)
    setActiveTab(solution.problemType);

    // Clear first, then set - forces re-render for each new solution
    setSelectedSolution(null);
    setTimeout(() => {
      setSelectedSolution(solution);
    }, 0);
  };

  const handleSolutionSaved = () => {
    setRefreshSidebar(prev => prev + 1);
  };

  const handleLimitReached = () => {
    // Refresh usage data when limit is reached
    setRefreshSidebar(prev => prev + 1);
  };

  const handleBackToDashboard = () => {
    setSelectedSolution(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900">
      <DashboardNavbar />

      {/* Saved Solutions Sidebar */}
      <SavedSolutionsSidebar
        onSelectSolution={handleSolutionSelect}
        refreshTrigger={refreshSidebar}
      />

      {/* Main Dashboard Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                Welcome Back, {user?.firstName || user?.username || "Solver"}!
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Ready to solve some math problems? ✨
            </p>

            {/* Usage Indicator */}
            {usageData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-block"
              >
                <div className={`px-6 py-3 rounded-full font-bold text-base ${
                  usageData.plan === "max"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                    : usageData.plan === "pro"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-slate-600 to-gray-600"
                } text-white shadow-lg`}>
                  {usageData.limit === -1
                    ? `✨ Unlimited Problems (${usageData.plan.toUpperCase()} Plan)`
                    : `📊 ${usageData.usageCount}/${usageData.limit} Problems Used This Month`
                  }
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Input Method Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 gap-6 bg-transparent p-0">
                <TabsTrigger
                  value="image"
                  className="relative rounded-3xl font-bold text-lg py-6 px-8 border-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-pink-500/50 data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:scale-105"
                >
                  <span className="mr-3 text-2xl">📸</span>
                  Upload Image
                </TabsTrigger>
                <TabsTrigger
                  value="text"
                  className="relative rounded-3xl font-bold text-lg py-6 px-8 border-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:via-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-orange-500/50 data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:scale-105"
                >
                  <span className="mr-3 text-2xl">✏️</span>
                  Type Problem
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="mt-8">
                <ImageUpload
                  key={selectedSolution?.id || 'empty'}
                  onSolutionSaved={handleSolutionSaved}
                  selectedSolution={selectedSolution}
                  onBackToDashboard={handleBackToDashboard}
                  canSolve={usageData?.canSolve ?? true}
                  usageData={usageData}
                  onLimitReached={handleLimitReached}
                />
              </TabsContent>

              <TabsContent value="text" className="mt-8">
                <TextInput
                  key={selectedSolution?.id || 'empty'}
                  onSolutionSaved={handleSolutionSaved}
                  selectedSolution={selectedSolution}
                  onBackToDashboard={handleBackToDashboard}
                  canSolve={usageData?.canSolve ?? true}
                  usageData={usageData}
                  onLimitReached={handleLimitReached}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/30 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <span>💡</span>
                Quick Tip
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Pro Tip:
                </span>{" "}
                For best results, make sure your math problem is clearly visible and well-lit when taking a photo. You can also type complex equations using standard math notation!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
