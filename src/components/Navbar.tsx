"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    icon: "🏠",
  },
  {
    name: "Solve Problem",
    href: "/solve",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: "∑",
  },
  {
    name: "History",
    href: "/history",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    icon: "📚",
  },
  {
    name: "Practice",
    href: "/practice",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    icon: "✏️",
  },
  {
    name: "About",
    href: "/about",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-600",
    icon: "ℹ️",
  },
];

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const [authInProgress, setAuthInProgress] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // Monitor authentication completion
  useEffect(() => {
    if (isLoaded && isSignedIn && authInProgress) {
      setAuthInProgress(false);
      toast.success("🎉 Welcome! You're ready to solve math problems!");
    }
  }, [isLoaded, isSignedIn, authInProgress]);

  const handleAuthStart = () => {
    setAuthInProgress(true);
  };

  const handleRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/solve");
    }, 800);
  };

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
                className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0"
                whileHover={{ opacity: 0.6, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
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

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link key={link.name} href={link.href}>
              <motion.div
                className="relative group flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Animated icon/symbol on hover */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    scale: { type: "spring", stiffness: 400, damping: 10 },
                    rotate: { duration: 0.5 }
                  }}
                >
                  {/* Glowing effect behind icon */}
                  <motion.div
                    className={`
                      absolute inset-0 rounded-full blur-xl
                      bg-gradient-to-r ${link.gradient}
                      opacity-0
                    `}
                    whileHover={{ opacity: 0.7, scale: 1.8 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon/Symbol */}
                  <motion.span
                    className={`
                      relative text-4xl font-bold
                      bg-gradient-to-r ${link.gradient}
                      bg-clip-text text-transparent
                      drop-shadow-lg
                    `}
                    whileHover={{
                      filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.8))",
                    }}
                  >
                    {link.icon}
                  </motion.span>
                </motion.div>

                {/* Text label */}
                <motion.span
                  className={`
                    text-sm font-bold
                    bg-gradient-to-r ${link.gradient}
                    bg-clip-text text-transparent
                    opacity-0
                  `}
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.span>

                {/* Animated underline */}
                <motion.div
                  className={`
                    absolute -bottom-2 left-0 right-0 h-1 rounded-full
                    bg-gradient-to-r ${link.gradient}
                    opacity-0
                  `}
                  whileHover={{ opacity: 1, scaleX: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA Button & User Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/"
              signUpForceRedirectUrl="/"
            >
              <motion.button
                onClick={handleAuthStart}
                className="relative px-6 py-3 rounded-full font-bold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
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
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-lg opacity-0"
                  whileHover={{ opacity: 0.7, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2 font-extrabold">
                  <motion.span
                    whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-xl filter-none"
                    style={{ WebkitTextFillColor: 'initial' }}
                  >
                    🧮
                  </motion.span>
                  <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                    Solve Math!
                  </span>
                </span>
              </motion.button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <motion.button
              onClick={handleRedirect}
              className="relative px-6 py-3 rounded-full font-bold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              disabled={isRedirecting}
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-lg opacity-0"
                whileHover={{ opacity: 0.7, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2 font-extrabold">
                <motion.span
                  animate={isRedirecting ? {
                    rotate: 360,
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={isRedirecting ? {
                    rotate: { duration: 0.6, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                  } : { duration: 0.5 }}
                  whileHover={!isRedirecting ? { rotate: [0, 10, -10, 10, 0] } : {}}
                  className="text-xl filter-none"
                  style={{ WebkitTextFillColor: 'initial' }}
                >
                  🧮
                </motion.span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                  {isRedirecting ? "Loading..." : "Solve Math!"}
                </span>
              </span>
            </motion.button>

            {/* User Avatar with Profile & Sign Out */}
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
          </SignedIn>
        </motion.div>
      </div>
    </nav>
  );
}
