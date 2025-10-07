import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StepWise - Learn Math Step by Step",
  description: "AI-powered math tutor that provides detailed, step-by-step solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          modalContent: "relative",
          modalCloseButton: "absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200",
          modalBackdrop: "backdrop-blur-sm bg-black/50",
          card: "shadow-xl border-0 rounded-2xl",
          headerTitle: "text-xl font-bold text-gray-900",
          headerSubtitle: "text-sm text-gray-600",
          formButtonPrimary: "bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 rounded-xl font-semibold py-3",
          socialButtonsBlockButton: "border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium py-3",
          formFieldInput: "rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20",
          userButtonAvatarBox: "w-10 h-10",
          userButtonPopoverCard: "shadow-xl border-0 rounded-xl",
          userButtonPopoverActionButton: "hover:bg-gray-100 rounded-lg"
        },
        layout: {
          showOptionalFields: true,
          socialButtonsPlacement: "top"
        }
      }}
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster
            position="top-right"
            closeButton
            richColors
            expand={true}
            duration={4000}
            toastOptions={{
              style: {
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '16px',
                maxWidth: '400px',
              }
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
