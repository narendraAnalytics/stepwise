"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Home } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Logo Image with Glow Effect */}
            <motion.div className="relative">
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-0"
                whileHover={{ opacity: 0.6, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ type: "tween", duration: 0.5 }}
              >
                <Image
                  src="/images/stepwiselogo.png"
                  alt="StepWise Logo"
                  width={56}
                  height={56}
                  className="relative object-contain drop-shadow-lg"
                />
              </motion.div>
            </motion.div>

            {/* Logo Text */}
            <motion.div className="flex flex-col">
              <motion.span
                className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
                whileHover={{
                  backgroundImage: "linear-gradient(to right, rgb(147, 51, 234), rgb(192, 38, 211), rgb(219, 39, 119))",
                  filter: "brightness(1.2)",
                }}
              >
                StepWise
              </motion.span>
              <motion.span
                className="text-xs font-semibold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, x: 2 }}
                transition={{ duration: 0.2 }}
              >
                Learn math the right way.
              </motion.span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Right Side - Home Button & User Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          {/* Animated Home Button */}
          <Link href="/">
            <motion.button
              className="relative px-6 py-3 rounded-full font-bold overflow-hidden group flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-500"
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
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 blur-lg opacity-0"
                whileHover={{ opacity: 0.7, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 font-extrabold">
                <motion.div
                  whileHover={{
                    rotate: [0, -15, 15, -15, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
                </motion.div>
                <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-200 bg-clip-text text-transparent">
                  Home
                </span>
              </span>
            </motion.button>
          </Link>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-purple-500 shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
                }
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
