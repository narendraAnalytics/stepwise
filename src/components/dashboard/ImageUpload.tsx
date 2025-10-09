"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Upload, Image as ImageIcon, X, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface SavedSolution {
  id: number;
  problemNumber: number;
  solution: string;
  problemType: string;
  problemContent: string;
  mimeType: string | null;
  createdAt: string;
}

interface ImageUploadProps {
  onSolutionSaved?: () => void;
  selectedSolution?: SavedSolution | null;
  onBackToDashboard?: () => void;
}

export default function ImageUpload({ onSolutionSaved, selectedSolution, onBackToDashboard }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [problemNumber, setProblemNumber] = useState<number | null>(null);

  // Load selected solution from sidebar
  useEffect(() => {
    if (selectedSolution && selectedSolution.problemType === "image") {
      // Reset view first to ensure re-render
      setShowSolution(false);
      // Use setTimeout to ensure state update completes before showing solution
      setTimeout(() => {
        setSolution(selectedSolution.solution);
        setProblemNumber(selectedSolution.problemNumber);
        setShowSolution(true);
      }, 0);
      // Don't load the image content for saved solutions (optional)
    }
  }, [selectedSolution?.id, selectedSolution?.problemNumber, selectedSolution?.solution]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("Image size should be less than 10MB");
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setFileName(file.name);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setUploadedImage(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully! 📸");
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setFileName("");
    setMimeType("");
    setSolution(null);
    setShowSolution(false);
    setProblemNumber(null);
    toast.info("Image removed");
  };

  const handleBackToDashboard = () => {
    setShowSolution(false);
    setSolution(null);
    setUploadedImage(null);
    setFileName("");
    setMimeType("");
    setProblemNumber(null);
    // Notify parent to clear selected solution
    if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handleSolve = async () => {
    if (!uploadedImage) return;

    setIsSolving(true);
    setSolution(null);

    try {
      // Extract base64 data from data URL
      const base64Data = uploadedImage.split(',')[1];

      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'image',
          content: base64Data,
          mimeType: mimeType,
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
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-200/30 shadow-lg">
              <div className="max-w-5xl mx-auto px-6 py-4">
                <motion.button
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
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
                className="bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/30"
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
                    if (cleanLine.match(/^Final Answer:/i)) {
                      return (
                        <h5 key={index} className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mt-6">
                          {cleanLine}
                        </h5>
                      );
                    }

                    // Check if line is a section header (Problem Statement, Step-by-Step Solution, etc.)
                    if (cleanLine.match(/^(Problem Statement|Step-by-Step Solution|Quick Tip|Problem Number & Statement|Key Concept|Practice Tip):/i)) {
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
            className="relative"
          >
            {!uploadedImage ? (
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-4 border-dashed rounded-3xl p-12 md:p-20
              transition-all duration-300 cursor-pointer
              bg-gradient-to-br from-white/50 to-purple-50/30 dark:from-gray-800/50 dark:to-purple-900/20
              backdrop-blur-lg shadow-2xl
              ${isDragging
                ? "border-purple-500 bg-purple-100/50 dark:bg-purple-900/30 scale-105"
                : "border-purple-300/50 hover:border-purple-400 hover:scale-102"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <div className="text-center">
              {isUploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Uploading {fileName}...
                  </p>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Upload className="w-24 h-24 mx-auto mb-6 text-purple-500" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Upload Your Math Problem
                  </h3>

                  <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                    Drag and drop an image here, or{" "}
                    <span className="font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      click to browse
                    </span>
                  </p>

                  <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      <span>JPEG, PNG, WebP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Max 10MB</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-white/50 to-purple-50/30 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-200/30"
          >
            <div className="relative">
              <motion.button
                onClick={handleRemoveImage}
                className="absolute -top-4 -right-4 z-10 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="relative w-full h-96 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt="Uploaded math problem"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {fileName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Image uploaded successfully! Ready to solve? 🎉
                </p>
              </div>

              <motion.button
                onClick={handleSolve}
                disabled={isSolving}
                className="relative w-full px-10 py-5 rounded-full font-bold text-lg overflow-hidden group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
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

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 blur-xl opacity-0"
                  whileHover={{ opacity: 0.8, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 flex items-center justify-center gap-3 font-extrabold">
                  {isSolving ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                        Solving...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🧮</span>
                      <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                        Solve This Problem!
                      </span>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
