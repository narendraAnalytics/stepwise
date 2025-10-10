"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  Calculator,
  Triangle,
  BarChart3,
  Sigma,
  Hash,
  Compass,
  Target,
  Trophy,
  Flame,
  CheckCircle,
  XCircle,
  ArrowRight,
  Home,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface PracticeCategory {
  id: string;
  name: string;
  icon: any;
  gradient: string;
  iconColor: string;
  description: string;
  emoji: string;
}

const categories: PracticeCategory[] = [
  {
    id: "algebra",
    name: "Algebra",
    icon: Calculator,
    gradient: "from-purple-500 via-pink-500 to-fuchsia-500",
    iconColor: "text-purple-500",
    description: "Equations, expressions & functions",
    emoji: "🎯",
  },
  {
    id: "geometry",
    name: "Geometry",
    icon: Triangle,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    iconColor: "text-blue-500",
    description: "Shapes, angles & proofs",
    emoji: "📐",
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: BarChart3,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    iconColor: "text-orange-500",
    description: "Data analysis & probability",
    emoji: "📊",
  },
  {
    id: "calculus",
    name: "Calculus",
    icon: Sigma,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    iconColor: "text-green-500",
    description: "Derivatives & integrals",
    emoji: "∫",
  },
  {
    id: "arithmetic",
    name: "Arithmetic",
    icon: Hash,
    gradient: "from-pink-500 via-rose-500 to-fuchsia-500",
    iconColor: "text-pink-500",
    description: "Basic operations & fractions",
    emoji: "🔢",
  },
  {
    id: "trigonometry",
    name: "Trigonometry",
    icon: Compass,
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    iconColor: "text-cyan-500",
    description: "Sin, cos, tan & identities",
    emoji: "🧮",
  },
];

const difficulties = [
  { level: "Easy", color: "from-green-500 to-emerald-500", value: "easy" },
  { level: "Medium", color: "from-orange-500 to-amber-500", value: "medium" },
  { level: "Hard", color: "from-red-500 to-pink-500", value: "hard" },
];

export default function PracticePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    redirect("/");
  }

  if (!isLoaded) {
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

  const handleStartPractice = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsPracticing(true);
    setCurrentQuestion(0);
    setScore(0);
    setTotalAttempted(0);
    toast.success(`Starting ${categories.find(c => c.id === categoryId)?.name} practice!`);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error("Please enter an answer!");
      return;
    }

    // Simple mock validation (in real app, would check against correct answer)
    const isAnswerCorrect = Math.random() > 0.5; // Mock: 50% chance correct
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setTotalAttempted(prev => prev + 1);

    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setUserAnswer("");
    setCurrentQuestion(prev => prev + 1);

    if (currentQuestion >= 9) {
      // Finished 10 questions
      toast.success(`Practice complete! Score: ${score + (isCorrect ? 1 : 0)}/10`);
      setIsPracticing(false);
      setSelectedCategory(null);
    }
  };

  const handleBackToDashboard = () => {
    setIsPracticing(false);
    setSelectedCategory(null);
    setUserAnswer("");
    setShowFeedback(false);
  };

  const mathSymbols = ["+", "-", "×", "÷", "=", "²", "³", "√", "π", "(", ")", "/"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-indigo-950/20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-200/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/stepwiselogo.png"
                alt="StepWise Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-lg"
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                StepWise
              </span>
            </motion.div>
          </Link>

          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Home
            </motion.button>
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {!isPracticing ? (
            <>
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Practice Makes Perfect
                  </span>
                </h1>
                <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-8">
                  Sharpen your skills with curated problems
                </p>

                {/* Stats Cards */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-gradient-to-br from-white/70 to-purple-50/50 dark:from-gray-800/70 dark:to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-200/30 min-w-[200px]">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Target className="w-6 h-6 text-purple-500" />
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {totalAttempted}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Problems Attempted
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/70 to-orange-50/50 dark:from-gray-800/70 dark:to-orange-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-orange-200/30 min-w-[200px]">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Trophy className="w-6 h-6 text-orange-500" />
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        {totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0}%
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Accuracy Rate
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/70 to-cyan-50/50 dark:from-gray-800/70 dark:to-cyan-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-cyan-200/30 min-w-[200px]">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Flame className="w-6 h-6 text-cyan-500" />
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        0
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Day Streak
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Difficulty Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Select Difficulty
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {difficulties.map((diff) => (
                    <motion.button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(diff.value)}
                      className={`
                        relative px-8 py-4 rounded-full font-bold text-lg transition-all
                        ${selectedDifficulty === diff.value
                          ? `bg-gradient-to-r ${diff.color} text-white shadow-lg scale-110`
                          : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:scale-105'
                        }
                      `}
                      whileHover={{ scale: selectedDifficulty === diff.value ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {diff.level}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Categories Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Choose Your Practice Category
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.div
                        className="relative bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-purple-200/30 h-full cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartPractice(category.id)}
                      >
                        {/* Animated Border */}
                        <motion.div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 blur-xl -z-10`}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Icon */}
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 shadow-lg mx-auto`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ type: "tween", duration: 0.5 }}
                        >
                          <category.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </motion.div>

                        {/* Emoji */}
                        <div className="text-4xl text-center mb-3">{category.emoji}</div>

                        {/* Title */}
                        <h4 className={`text-2xl font-bold text-center mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                          {category.name}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                          {category.description}
                        </p>

                        {/* Start Button */}
                        <motion.button
                          className={`w-full py-3 rounded-full font-bold bg-gradient-to-r ${category.gradient} text-white shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Practice
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            // Practice Area
            <AnimatePresence mode="wait">
              <motion.div
                key="practice-area"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl mx-auto"
              >
                {/* Back Button */}
                <motion.button
                  onClick={handleBackToDashboard}
                  className="mb-6 flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back to Categories
                </motion.button>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Question {currentQuestion + 1} of 10
                    </span>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      Score: {score}/{totalAttempted}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <motion.div
                  className="bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/30 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-6">
                      {categories.find(c => c.id === selectedCategory)?.emoji}
                    </div>
                    <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${categories.find(c => c.id === selectedCategory)?.gradient} bg-clip-text text-transparent`}>
                      {categories.find(c => c.id === selectedCategory)?.name} Problem
                    </h2>
                    <div className="text-xl text-gray-700 dark:text-gray-200 font-mono bg-white/50 dark:bg-gray-900/50 p-6 rounded-2xl">
                      Solve: 2x + 5 = 15
                    </div>
                  </div>

                  {/* Math Symbols */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Quick Symbols:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mathSymbols.map((symbol, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setUserAnswer(prev => prev + symbol)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl font-bold text-lg text-purple-600 dark:text-purple-400 border border-purple-300/30"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {symbol}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Answer Input */}
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full p-6 mb-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border-2 border-purple-300/50 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none text-2xl font-bold text-center"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                  />

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmitAnswer}
                    className="w-full py-5 rounded-full font-bold text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 text-white shadow-lg"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Answer
                  </motion.button>
                </motion.div>

                {/* Feedback Modal */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                      onClick={handleNextQuestion}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={`
                          max-w-md w-full rounded-3xl p-8 text-center shadow-2xl
                          ${isCorrect
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                            : 'bg-gradient-to-br from-red-500 to-pink-500'
                          }
                        `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="mb-6"
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-24 h-24 text-white mx-auto" />
                          ) : (
                            <XCircle className="w-24 h-24 text-white mx-auto" />
                          )}
                        </motion.div>

                        <h3 className="text-4xl font-extrabold text-white mb-4">
                          {isCorrect ? "Correct! 🎉" : "Not Quite! 💪"}
                        </h3>

                        {!isCorrect && (
                          <div className="mb-6 text-white/90">
                            <p className="text-lg font-semibold mb-2">Correct Answer:</p>
                            <p className="text-2xl font-bold">x = 5</p>
                          </div>
                        )}

                        <motion.button
                          onClick={handleNextQuestion}
                          className="w-full py-4 rounded-full font-bold text-xl bg-white text-purple-600 shadow-lg flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Next Question
                          <ArrowRight className="w-6 h-6" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
