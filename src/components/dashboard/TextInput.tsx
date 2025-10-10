"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Keyboard, Send, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface SavedSolution {
  id: number;
  problemNumber: number;
  solution: string;
  problemType: string;
  problemContent: string;
  mimeType: string | null;
  createdAt: string;
}

interface TextInputProps {
  onSolutionSaved?: () => void;
  selectedSolution?: SavedSolution | null;
  onBackToDashboard?: () => void;
}

const mathSymbols = [
  { symbol: "+", label: "Plus" },
  { symbol: "-", label: "Minus" },
  { symbol: "×", label: "Multiply" },
  { symbol: "÷", label: "Divide" },
  { symbol: "/", label: "Fraction" },
  { symbol: "=", label: "Equals" },
  { symbol: "²", label: "Square" },
  { symbol: "³", label: "Cube" },
  { symbol: "√", label: "Root" },
  { symbol: "π", label: "Pi" },
  { symbol: "∞", label: "Infinity" },
  { symbol: "(", label: "Open" },
  { symbol: ")", label: "Close" },
  { symbol: "[", label: "L-Bracket" },
  { symbol: "]", label: "R-Bracket" },
  { symbol: ",", label: "Comma" },
  { symbol: "∫", label: "Integral" },
  { symbol: "i", label: "Vector i" },
  { symbol: "j", label: "Vector j" },
  { symbol: "k", label: "Vector k" },
  { symbol: "→", label: "Arrow" },
  { symbol: "∂", label: "Partial" },
  { symbol: "⁻¹", label: "Inverse" },
  { symbol: "ᵀ", label: "Transpose" },
  { symbol: "ₙ", label: "Subscript n" },
  { symbol: "°", label: "Degree" },
];

export default function TextInput({ onSolutionSaved, selectedSolution, onBackToDashboard }: TextInputProps) {
  const [problem, setProblem] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [problemNumber, setProblemNumber] = useState<number | null>(null);
  const maxChars = 500;

  // Load selected solution from sidebar
  useEffect(() => {
    if (selectedSolution && selectedSolution.problemType === "text") {
      // Reset view first to ensure re-render
      setShowSolution(false);
      setSolution(null);
      setProblemNumber(null);
      setProblem("");
      setCharCount(0);

      // Use setTimeout to ensure state update completes before showing solution
      setTimeout(() => {
        setSolution(selectedSolution.solution);
        setProblem(selectedSolution.problemContent);
        setProblemNumber(selectedSolution.problemNumber);
        setCharCount(selectedSolution.problemContent.length);
        setShowSolution(true);
      }, 50);
    }
  }, [selectedSolution?.id, selectedSolution?.problemNumber]);

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
        setProblemNumber(data.problemNumber);
        setShowSolution(true);
        toast.success(`Problem solved and saved as #${data.problemNumber}! 🎉`);
        // Notify parent to refresh sidebar
        if (onSolutionSaved) {
          onSolutionSaved();
        }
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
    setShowSolution(false);
    setProblemNumber(null);
    toast.info("Problem cleared");
  };

  const handleBackToDashboard = () => {
    setShowSolution(false);
    setSolution(null);
    setProblem("");
    setCharCount(0);
    setProblemNumber(null);
    // Notify parent to clear selected solution
    if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {showSolution && solution ? (
          // Full-Page Solution View
          <motion.div
            key="solution-view"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900 overflow-y-auto"
          >
            {/* Top Bar with Back Button */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-orange-200/30 shadow-lg">
              <div className="max-w-5xl mx-auto px-6 py-4">
                <motion.button
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </motion.button>
              </div>
            </div>

            {/* Solution Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-white/80 to-orange-50/50 dark:from-gray-800/80 dark:to-orange-900/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-200/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                  <span>✨</span>
                  Solution
                </h2>
                <div className="space-y-6">
                  {solution.split('\n').map((line, index) => {
                    // Clean up markdown formatting (bold ** and italic *)
                    const cleanLine = line.replace(/\*\*/g, '').replace(/\*/g, '');

                    // Check if line is a problem title
                    if (cleanLine.match(/^Problem \d+:/i)) {
                      return (
                        <h4 key={index} className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mt-12 first:mt-0">
                          {cleanLine}
                        </h4>
                      );
                    }

                    // Check if line is Final Answer (special bright gradient)
                    if (cleanLine.match(/^(\d+\.\s*)?Final Answer:/i)) {
                      return (
                        <h5 key={index} className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mt-6">
                          {cleanLine}
                        </h5>
                      );
                    }

                    // Check if line is a section header (Problem Statement, Step-by-Step Solution, etc.)
                    if (cleanLine.match(/^(\d+\.\s*)?(Problem Statement|Step-by-Step Solution|Quick Tip|Problem Number & Statement|Key Concept|Practice Tip):/i)) {
                      return (
                        <h5 key={index} className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mt-6">
                          {cleanLine}
                        </h5>
                      );
                    }

                    // Check if line is a step (starts with Step or number)
                    if (cleanLine.match(/^(Step \d+|^\d+\.)/i)) {
                      return (
                        <p key={index} className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent ml-4">
                          {cleanLine}
                        </p>
                      );
                    }

                    // Regular text
                    if (cleanLine.trim()) {
                      return (
                        <p key={index} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed ml-4">
                          {cleanLine}
                        </p>
                      );
                    }

                    return null;
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Input View
          <motion.div
            key="input-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
            placeholder="Type your math problem(s) here...
You can solve multiple problems at once!
Examples:
1. 2x + 5 = 15
2. x² + 3x + 2 = 0
3. √(16) + 2³"
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
              <span className="font-bold">Tip:</span> You can solve multiple problems at once! Number them (1., 2., 3.) or separate them clearly. Use standard notation like 2x, 3y, or x², and don&apos;t forget parentheses for complex expressions!
            </span>
          </p>
        </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
