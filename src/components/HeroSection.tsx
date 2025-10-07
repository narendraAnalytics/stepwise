"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
              Learn Math
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              The Right Way
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          Snap a photo of any math problem and get instant,{" "}
          <span className="font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            step-by-step explanations
          </span>{" "}
          that teach concepts, not just answers.
        </motion.p>

        {/* Additional tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-12"
        >
          Perfect for students, parents, and lifelong learners ✨
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA */}
          <Link href="/solve">
            <motion.button
              className="relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-xl opacity-0"
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3 font-extrabold">
                <motion.span
                  whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl filter-none"
                  style={{ WebkitTextFillColor: "initial" }}
                >
                  📸
                </motion.span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                  Start Solving Now
                </span>
              </span>
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/about">
            <motion.button
              className="relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden group border-2 border-transparent"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Background */}
              <motion.div
                className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                whileHover={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                }}
              />

              {/* Border gradient on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0"
                whileHover={{ opacity: 1 }}
                style={{ padding: "2px", zIndex: -1 }}
              />

              {/* Button text */}
              <span className="relative z-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent font-extrabold">
                Learn More
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Math Symbols Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {["∑", "π", "∫", "√", "÷", "×", "+", "="].map((symbol, index) => (
            <motion.div
              key={index}
              className="absolute text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + index * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
