"use client";

import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Award, BookOpen, Rocket, Target, Shield, Zap, Globe } from "lucide-react";

const FloatingElement = ({ icon: Icon, delay, x, y, color }: { icon: any; delay: number; x: number; y: number; color: string }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      type: "tween",
    }}
  >
    <div className={`${color} opacity-30`}>
      <Icon className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
    </div>
  </motion.div>
);

export default function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Student-Centered",
      description: "We put students first, making math accessible and enjoyable for everyone.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      iconColor: "text-pink-500",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "Cutting-edge AI technology that adapts to your learning style.",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      iconColor: "text-purple-500",
    },
    {
      icon: Award,
      title: "Quality Education",
      description: "Expert-crafted solutions that ensure accuracy and clarity.",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      iconColor: "text-orange-500",
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Learn from anywhere, anytime, on any device.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      iconColor: "text-blue-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Students Helped", icon: Users, gradient: "from-purple-600 to-pink-600" },
    { number: "99%", label: "Success Rate", icon: Target, gradient: "from-blue-600 to-cyan-600" },
    { number: "24/7", label: "Available", icon: Zap, gradient: "from-orange-600 to-amber-600" },
    { number: "100%", label: "Secure", icon: Shield, gradient: "from-green-600 to-emerald-600" },
  ];

  const floatingIcons = [
    { icon: BookOpen, x: 10, y: 20, color: "text-purple-400" },
    { icon: Rocket, x: 80, y: 15, color: "text-pink-400" },
    { icon: Sparkles, x: 15, y: 70, color: "text-blue-400" },
    { icon: Award, x: 85, y: 75, color: "text-orange-400" },
  ];

  return (
    <section id="about" className="relative min-h-screen py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400/15 to-fuchsia-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
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
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About StepWise
            </span>
            <br />
            <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Your Math Learning Partner
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              We're on a mission to make math learning fun, accessible, and effective for students everywhere.
            </span>
            <span className="font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              {" "}Using AI technology to transform how students understand and master mathematics.
            </span>
          </motion.p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <FloatingElement
                key={index}
                icon={item.icon}
                delay={index * 0.4}
                x={item.x}
                y={item.y}
                color={item.color}
              />
            ))}

            <motion.div
              className="relative bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="inline-block text-6xl mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    type: "tween",
                  }}
                >
                  💡
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Our Story
                </h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                  <p>
                    <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      StepWise was born from a simple belief:
                    </span>{" "}
                    every student deserves access to quality math education, regardless of their location or resources.
                  </p>
                  <p>
                    We've built an AI-powered platform that doesn't just give answers—it teaches students{" "}
                    <span className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      how to think, solve, and understand
                    </span>{" "}
                    mathematical concepts.
                  </p>
                  <p>
                    Our team of educators and engineers work together to create a learning experience that's both{" "}
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      powerful and personalized
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
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
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 blur-sm -z-10`}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <value.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <h4 className={`text-xl font-bold mb-2 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div className="relative bg-gradient-to-br from-white/60 to-purple-50/60 dark:from-gray-800/60 dark:to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/40">
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 rounded-3xl opacity-20 blur-2xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                  <div className={`text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative inline-block bg-gradient-to-br from-white/70 to-purple-50/70 dark:from-gray-800/70 dark:to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/40 max-w-4xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-30 blur-2xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="inline-block text-6xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎯
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
                Our Mission
              </h3>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  To empower students worldwide
                </span>{" "}
                with the tools, knowledge, and confidence they need to{" "}
                <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  excel in mathematics
                </span>{" "}
                and beyond.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
