"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const FloatingMathSymbol = ({ symbol, delay, duration, x, y }: { symbol: string; delay: number; duration: number; x: number; y: number }) => (
  <motion.div
    className="absolute text-4xl opacity-20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
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

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Active",
      badgeColor: "from-green-500 to-emerald-500",
      description: "Always free",
      features: [
        { text: "2 maths response per month", included: true },
        { text: "No Email Support", included: false },
        { text: "NO Tutor Support", included: false },
      ],
      gradient: "from-slate-500 via-gray-500 to-zinc-500",
      buttonText: "Current Plan",
      buttonGradient: "from-gray-500 to-slate-500",
    },
    {
      name: "Pro Plan",
      price: { monthly: 4, yearly: 48 },
      badge: "Most Popular",
      badgeColor: "from-purple-500 to-pink-500",
      description: "Billed annually",
      features: [
        { text: "8 maths response per month", included: true },
        { text: "Email support", included: true },
        { text: "Priority responses", included: true },
      ],
      gradient: "from-purple-500 via-pink-500 to-fuchsia-500",
      buttonText: "Subscribe",
      buttonGradient: "from-purple-500 to-pink-500",
      popular: true,
    },
    {
      name: "Max Plan",
      price: { monthly: 15, yearly: 180 },
      badge: "Best Value",
      badgeColor: "from-cyan-500 to-blue-500",
      description: "Billed annually",
      features: [
        { text: "Unlimited maths response", included: true },
        { text: "Email support", included: true },
        { text: "24/7 Tutor Support", included: true },
        { text: "Custom problem sets", included: true },
      ],
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      buttonText: "Subscribe",
      buttonGradient: "from-cyan-500 to-blue-500",
    },
  ];

  const mathSymbols = ["∑", "∫", "π", "√", "∞", "∂", "α", "β"];

  return (
    <section id="pricing" className="relative min-h-screen py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-br from-cyan-50/50 via-blue-50/30 to-indigo-50/50 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-indigo-950/20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mathSymbols.map((symbol, index) => (
          <FloatingMathSymbol
            key={index}
            symbol={symbol}
            delay={index * 0.4}
            duration={4 + (index % 3)}
            x={15 + (index * 12) % 70}
            y={10 + (index * 15) % 80}
          />
        ))}
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
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Choose the perfect plan for your learning journey.
            </span>
            <span className="font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}Start free, upgrade anytime.
            </span>
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className={`font-bold text-lg ${!isYearly ? "text-purple-600 dark:text-purple-400" : "text-gray-500"}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isYearly ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{
                  x: isYearly ? 32 : 4,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`font-bold text-lg ${isYearly ? "text-purple-600 dark:text-purple-400" : "text-gray-500"}`}>
              Yearly
              <span className="ml-2 text-sm bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Save 20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                >
                  <div className={`bg-gradient-to-r ${plan.badgeColor} text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1`}>
                    <Sparkles className="w-4 h-4" />
                    {plan.badge}
                  </div>
                </motion.div>
              )}

              <motion.div
                className={`relative bg-gradient-to-br from-white/90 to-purple-50/70 dark:from-gray-800/90 dark:to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 h-full ${
                  plan.popular ? "border-purple-300 dark:border-purple-600" : "border-purple-200/50"
                }`}
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated Glow on Hover */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl -z-10`}
                  transition={{ duration: 0.3 }}
                />

                {/* Plan Header */}
                <div className="text-center mb-8">
                  {!plan.popular && (
                    <div className={`inline-block bg-gradient-to-r ${plan.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold mb-4`}>
                      {plan.badge}
                    </div>
                  )}

                  <h3 className={`text-3xl font-extrabold mb-2 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mt-4`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {plan.price.monthly > 0 && isYearly ? plan.description : "Always free"}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + featureIndex * 0.1 }}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          feature.included
                            ? `bg-gradient-to-r ${plan.gradient}`
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        ) : (
                          <X className="w-4 h-4 text-gray-400" strokeWidth={3} />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${feature.included ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <Link href="/solve">
                  <motion.button
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white relative overflow-hidden shadow-lg ${
                      plan.name === "Free" ? "bg-gray-400 cursor-not-allowed" : ""
                    }`}
                    whileHover={plan.name !== "Free" ? { scale: 1.05, y: -3 } : {}}
                    whileTap={plan.name !== "Free" ? { scale: 0.98 } : {}}
                    disabled={plan.name === "Free"}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${plan.buttonGradient}`}
                      animate={{
                        backgroundPosition: plan.name !== "Free" ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
                      }}
                      transition={{
                        duration: 3,
                        repeat: plan.name !== "Free" ? Infinity : 0,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                    />
                    <span className="relative z-10">{plan.buttonText}</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          className="text-center mt-12 text-sm font-semibold text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          All plans include access to our AI-powered math solver • Cancel anytime • No hidden fees
        </motion.p>
      </div>
    </section>
  );
}
