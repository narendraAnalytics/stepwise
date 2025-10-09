"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BookmarkIcon, X } from "lucide-react";
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

interface SavedSolutionsSidebarProps {
  onSelectSolution: (solution: SavedSolution) => void;
  refreshTrigger?: number;
}

export default function SavedSolutionsSidebar({ onSelectSolution, refreshTrigger }: SavedSolutionsSidebarProps) {
  const [solutions, setSolutions] = useState<SavedSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const fetchSolutions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/solutions');
      const data = await response.json();

      if (data.success) {
        setSolutions(data.solutions);
      } else {
        toast.error("Failed to load saved solutions");
      }
    } catch (error) {
      console.error('Error fetching solutions:', error);
      toast.error("Error loading solutions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [refreshTrigger]);

  const handleSolutionClick = (solution: SavedSolution) => {
    setSelectedNumber(solution.problemNumber);
    onSelectSolution(solution);
    toast.success(`Loaded Problem #${solution.problemNumber}`);
  };

  if (!isOpen) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-l-2xl shadow-2xl"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookmarkIcon className="w-6 h-6" />
        </motion.button>
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-yellow-50 text-sm font-medium rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          View Saved Problems
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-32 bottom-20 w-24 bg-gradient-to-b from-white/95 to-purple-50/95 dark:from-gray-800/95 dark:to-purple-900/95 backdrop-blur-lg shadow-2xl border-l-4 border-purple-300/50 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-200/30">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Saved
          </h3>
          <motion.button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Solutions List */}
      <div className="overflow-y-auto h-full pb-24 px-3 pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-500">Loading...</p>
          </div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-8">
            <BookmarkIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No saved solutions yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {solutions.map((solution, index) => (
              <motion.button
                key={solution.id}
                onClick={() => handleSolutionClick(solution)}
                className={`
                  relative w-full aspect-square rounded-2xl font-bold text-xl
                  transition-all duration-300 shadow-lg hover:shadow-2xl
                  ${selectedNumber === solution.problemNumber
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-fuchsia-500 text-white scale-110'
                    : 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300'
                  }
                `}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="relative z-10">{solution.problemNumber}</span>
                {selectedNumber === solution.problemNumber && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
