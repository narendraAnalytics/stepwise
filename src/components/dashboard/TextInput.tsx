"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Keyboard, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const mathSymbols = [
  { symbol: "+", label: "Plus" },
  { symbol: "-", label: "Minus" },
  { symbol: "×", label: "Multiply" },
  { symbol: "÷", label: "Divide" },
  { symbol: "=", label: "Equals" },
  { symbol: "²", label: "Square" },
  { symbol: "³", label: "Cube" },
  { symbol: "√", label: "Root" },
  { symbol: "π", label: "Pi" },
  { symbol: "∞", label: "Infinity" },
  { symbol: "(", label: "Open" },
  { symbol: ")", label: "Close" },
];

export default function TextInput() {
  const [problem, setProblem] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const maxChars = 500;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setProblem(value);
      setCharCount(value.length);
    }
  };

  const insertSymbol = (symbol: string) => {
    if (problem.length < maxChars) {
      setProblem(problem + symbol);
      setCharCount(problem.length + 1);
    }
  };

  const handleSolve = async () => {
    if (problem.trim().length === 0) {
      toast.error("Please enter a math problem first!");
      return;
    }

    setIsSolving(true);
    setSolution(null);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text',
          content: problem,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSolution(data.solution);
        toast.success("Problem solved! 🎉");
      } else {
        toast.error(data.error || "Failed to solve problem");
      }
    } catch (error) {
      console.error('Error solving problem:', error);
      toast.error("An error occurred while solving the problem");
    } finally {
      setIsSolving(false);
    }
  };

  const handleClear = () => {
    setProblem("");
    setCharCount(0);
    setSolution(null);
    toast.info("Problem cleared");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/50 to-orange-50/30 dark:from-gray-800/50 dark:to-orange-900/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-orange-200/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Keyboard className="w-8 h-8 text-orange-500" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Type Your Math Problem
            </h3>
          </div>
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {charCount}/{maxChars}
          </div>
        </div>

        {/* Math Symbols Helper */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Quick Math Symbols:
          </p>
          <div className="flex flex-wrap gap-2">
            {mathSymbols.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => insertSymbol(item.symbol)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 backdrop-blur-sm rounded-xl font-bold text-lg text-orange-600 dark:text-orange-400 border border-orange-300/30 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                {item.symbol}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6"
        >
          <textarea
            value={problem}
            onChange={handleInputChange}
            placeholder="Type your math problem here... (e.g., 2x + 5 = 15)"
            className="w-full h-48 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl border-2 border-orange-300/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-300 resize-none text-lg font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
            style={{ fontFamily: "monospace" }}
          />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={handleClear}
            className="flex-1 px-6 py-4 rounded-full font-bold text-lg bg-gray-200/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300/70 dark:hover:bg-gray-600/70 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear
          </motion.button>

          <motion.button
            onClick={handleSolve}
            className="relative flex-[2] px-10 py-4 rounded-full font-bold text-lg overflow-hidden group"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            disabled={problem.trim().length === 0 || isSolving}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"
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

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 blur-xl opacity-0"
              whileHover={{ opacity: 0.8, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10 flex items-center justify-center gap-3 font-extrabold">
              {isSolving ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                    Solving...
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                    Solve This Problem!
                  </span>
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* Solution Display */}
        {solution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 backdrop-blur-lg rounded-3xl p-8 border border-cyan-200/30"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <span>✨</span>
              Solution
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans">
                {solution}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl border border-cyan-200/30"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>
              <span className="font-bold">Tip:</span> Use standard notation like 2x, 3y, or x², and don&apos;t forget parentheses for complex expressions!
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
