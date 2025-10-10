"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Type, Zap, BookOpen, Save, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingMathSymbol = ({ symbol, delay, duration, x, y }: { symbol: string; delay: number; duration: number; x: number; y: number }) => (
  <motion.div
    className="absolute text-4xl opacity-20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
      {symbol}
    </span>
  </motion.div>
);

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function SolveProblemSection() {
  const features = [
    {
      icon: Camera,
      title: "Upload Photo",
      description: "Snap a picture of any math problem",
      gradient: "from-pink-500 via-purple-500 to-fuchsia-500",
      iconColor: "text-pink-500",
    },
    {
      icon: Type,
      title: "Type Problem",
      description: "Or type it out with math symbols",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      iconColor: "text-orange-500",
    },
    {
      icon: Zap,
      title: "Instant Solution",
      description: "AI-powered answers in seconds",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      iconColor: "text-blue-500",
    },
    {
      icon: BookOpen,
      title: "Step-by-Step",
      description: "Detailed explanations for learning",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      iconColor: "text-purple-500",
    },
    {
      icon: Save,
      title: "Save & Review",
      description: "Access your solutions anytime",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      iconColor: "text-green-500",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey",
      gradient: "from-cyan-500 via-sky-500 to-blue-500",
      iconColor: "text-cyan-500",
    },
  ];

  const mathSymbols = ["∑", "∫", "π", "√", "∞", "∂", "α", "β", "θ", "≈", "×", "÷"];

  return (
    <section id="solve-problem" className="relative min-h-screen py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-fuchsia-50/50 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-fuchsia-950/20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-fuchsia-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
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
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
              Solve Any Math Problem
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              In Seconds
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Upload a photo or type your problem.
            </span>
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              {" "}Get instant, detailed solutions with step-by-step explanations.
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
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                <AnimatedCounter end={10000} />+
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Problems Solved
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                <AnimatedCounter end={5000} />+
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Happy Students
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                99%
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 mt-2">
                Accuracy Rate
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Visual Demo with Floating Symbols */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Floating Math Symbols */}
              {mathSymbols.map((symbol, index) => (
                <FloatingMathSymbol
                  key={index}
                  symbol={symbol}
                  delay={index * 0.3}
                  duration={3 + (index % 3)}
                  x={10 + (index * 15) % 80}
                  y={5 + (index * 20) % 90}
                />
              ))}

              {/* Central Demo Card */}
              <motion.div
                className="relative bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/50"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl opacity-30 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <motion.div
                      className="inline-block text-6xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      🧮
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                      How It Works
                    </h3>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6">
                    {[
                      { step: "1", text: "Upload photo or type problem", icon: "📸" },
                      { step: "2", text: "AI analyzes instantly", icon: "🤖" },
                      { step: "3", text: "Get step-by-step solution", icon: "✨" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                          {item.step}
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-3xl">{item.icon}</span>
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-white/70 to-purple-50/50 dark:from-gray-800/70 dark:to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-200/30 h-full"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Animated Border */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 blur-sm -z-10`}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <h4 className={`text-xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
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
          <Link href="/solve">
            <motion.button
              className="relative px-12 py-6 rounded-full font-bold text-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500"
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 blur-2xl opacity-0"
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3 font-extrabold">
                <motion.span
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-3xl"
                >
                  🚀
                </motion.span>
                <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-200 bg-clip-text text-transparent">
                  Start Solving Now - It's Free!
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
            No credit card required • Unlimited problems • Instant results
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
