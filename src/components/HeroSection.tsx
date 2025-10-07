"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [emblaApi, scrollNext]);

  const bannerImages = [
    "/images/bannerimage.jpg",
    "/images/bannerImage1.png",
    "/images/bannerImage2.jpg",
    "/images/bannerImage3.jpg",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] min-w-0 relative h-full"
              >
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={100}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-[2px]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-20">
        {/* Main Heading */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
              Learn Math
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              The Right Way
            </span>
          </h1>
        </motion.div> */}

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Snap a photo of any math problem and get instant,{" "}
          </span>
          <span className="font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            step-by-step explanations
          </span>
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {" "}that teach concepts, not just answers.
          </span>
        </motion.p>

        {/* Additional tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg mb-12"
        >
          <span className="font-bold bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Perfect for students, parents, and lifelong learners ✨
          </span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center"
        >
          {/* Primary CTA */}
          <Link href="/solve">
            <motion.button
              className="relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-xl opacity-0"
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3 font-extrabold">
                <motion.span
                  whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl filter-none"
                  style={{ WebkitTextFillColor: "initial" }}
                >
                  📸
                </motion.span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                  Start Solving Now
                </span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
