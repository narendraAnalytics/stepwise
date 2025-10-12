import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolveProblemSection from "@/components/SolveProblemSection";
import PracticeSection from "@/components/PracticeSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { syncUser } from "@/lib/syncUser";

export default async function Home() {
  // Sync user to database on page load
  await syncUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900">
      <Navbar />
      <HeroSection />
      <SolveProblemSection />
      <PracticeSection />
      <PricingSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
