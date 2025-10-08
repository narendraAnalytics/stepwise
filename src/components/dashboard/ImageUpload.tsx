"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");

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
    toast.info("Image removed");
  };

  const handleSolve = () => {
    if (uploadedImage) {
      toast.success("Processing your math problem... 🧮");
      // TODO: Implement actual solving logic
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
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
                  <span className="text-2xl">🧮</span>
                  <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                    Solve This Problem!
                  </span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
