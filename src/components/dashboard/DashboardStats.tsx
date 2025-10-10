"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Flame, Star } from "lucide-react";

const statsData = [
  {
    icon: Trophy,
    label: "Problems Solved",
    value: "0",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Flame,
    label: "Current Streak",
    value: "0 days",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: Target,
    label: "Accuracy",
    value: "0%",
    color: "from-cyan-500 to-teal-500",
    bgColor: "from-cyan-500/10 to-teal-500/10",
    iconColor: "text-cyan-500",
  },
  {
    icon: Star,
    label: "Level",
    value: "Beginner",
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-500/10 to-amber-500/10",
    iconColor: "text-yellow-500",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`
              relative bg-gradient-to-br ${stat.bgColor}
              backdrop-blur-lg rounded-3xl p-6
              border border-purple-200/30 dark:border-purple-700/30
              shadow-xl hover:shadow-2xl transition-all duration-300
              overflow-hidden
            `}
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0`}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon with animation */}
            <motion.div
              className="relative mb-4"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Stats Content */}
            <div className="relative">
              <motion.h3
                className={`text-4xl font-extrabold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </div>

            {/* Decorative element */}
            <motion.div
              className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
