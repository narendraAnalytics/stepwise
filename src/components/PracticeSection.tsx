"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Triangle, BarChart3, Sigma, Target, Flame, Trophy, CheckCircle, TrendingUp, Zap } from "lucide-react";

const FloatingProblem = ({ problem, delay, x, y }: { problem: string; delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute text-sm md:text-base font-mono bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-purple-200/50"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
      {problem}
    </span>
  </motion.div>
);

export default function PracticeSection() {
  const features = [
    {
      icon: Target,
      title: "6 Math Categories",
      description: "From Algebra to Calculus",
      color: "text-purple-500",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor accuracy & improvement",
      color: "text-orange-500",
    },
    {
      icon: Zap,
      title: "3 Difficulty Levels",
      description: "Easy, Medium, and Hard",
      color: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Instant Feedback",
      description: "Learn from every answer",
      color: "text-green-500",
    },
    {
      icon: Flame,
      title: "Daily Streaks",
      description: "Build consistent practice habits",
      color: "text-red-500",
    },
    {
      icon: TrendingUp,
      title: "Improve Skills",
      description: "Get better with each problem",
      color: "text-cyan-500",
    },
  ];

  const miniCategories = [
    {
      name: "Algebra",
      icon: Calculator,
      emoji: "🎯",
      gradient: "from-purple-500 via-pink-500 to-fuchsia-500",
      difficulty: "Easy",
    },
    {
      name: "Geometry",
      icon: Triangle,
      emoji: "📐",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      difficulty: "Medium",
    },
    {
      name: "Statistics",
      icon: BarChart3,
      emoji: "📊",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      difficulty: "Easy",
    },
    {
      name: "Calculus",
      icon: Sigma,
      emoji: "∫",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      difficulty: "Hard",
    },
  ];

  const floatingProblems = ["2x + 5 = ?", "∫ x² dx", "sin²θ + cos²θ", "√16 = ?", "3! = ?"];

  return (
    <section id="practice" className="relative min-h-screen py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-purple-50/50 via-indigo-50/30 to-violet-50/50 dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-violet-950/20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 -right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 -left-20 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Practice & Master
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              Your Math Skills
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Build confidence through guided practice.
            </span>
            <span className="font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              {" "}Track your progress and improve every day.
            </span>
          </motion.p>

          {/* Stats Counter */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                6
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Math Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                1000+
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Practice Problems
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                3
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Difficulty Levels
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content - 2 Column Layout (Reversed) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Features List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Why Practice with StepWise?
            </h3>

            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 backdrop-blur-lg flex items-center justify-center shadow-lg border border-purple-200/30`}
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} strokeWidth={2.5} />
                </motion.div>

                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Category Cards Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Floating Math Problems */}
              {floatingProblems.map((problem, index) => {
                // Fixed positions to avoid hydration mismatch
                const positions = [
                  { x: 10, y: 15 },
                  { x: 65, y: 25 },
                  { x: 20, y: 60 },
                  { x: 70, y: 70 },
                  { x: 40, y: 40 },
                ];
                return (
                  <FloatingProblem
                    key={index}
                    problem={problem}
                    delay={index * 0.5}
                    x={positions[index].x}
                    y={positions[index].y}
                  />
                );
              })}

              {/* Central Category Cards Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                {miniCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <motion.div
                      className="relative bg-gradient-to-br from-white/90 to-purple-50/70 dark:from-gray-800/90 dark:to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-200/50"
                      whileHover={{
                        scale: 1.1,
                        y: -10
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Animated Glow */}
                      <motion.div
                        className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl -z-10`}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon */}
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-3 shadow-lg mx-auto`}
                        whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                        transition={{ type: "tween", duration: 0.5 }}
                      >
                        <category.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </motion.div>

                      {/* Emoji */}
                      <div className="text-3xl text-center mb-2">{category.emoji}</div>

                      {/* Name */}
                      <h4 className={`text-lg font-bold text-center mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        {category.name}
                      </h4>

                      {/* Difficulty Badge */}
                      <motion.div
                        className={`
                          text-xs font-bold text-center py-1 px-3 rounded-full mx-auto w-fit
                          ${category.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                          ${category.difficulty === 'Medium' ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}
                          ${category.difficulty === 'Hard' ? 'bg-gradient-to-r from-red-500 to-pink-500' : ''}
                          text-white shadow-md
                        `}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {category.difficulty}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Center Glow Effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-indigo-500/30 rounded-full blur-3xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/practice">
            <motion.button
              className="relative px-12 py-6 rounded-full font-bold text-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 blur-2xl opacity-0"
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3 font-extrabold">
                <motion.span
                  whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.2 }}
                  transition={{ type: "tween", duration: 0.5 }}
                  className="text-3xl"
                >
                  🎯
                </motion.span>
                <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-200 bg-clip-text text-transparent">
                  Start Practicing Now!
                </span>
              </span>
            </motion.button>
          </Link>

          <motion.p
            className="mt-6 text-sm font-semibold text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Free practice • Instant feedback • Track your progress
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
