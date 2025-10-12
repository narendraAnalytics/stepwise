![StepWise Banner](public/bannerImage.png)

# StepWise - AI-Powered Math Learning Platform

**Learn math the right way. One step at a time.**

StepWise transforms math problems into learning opportunities by providing detailed, step-by-step solutions that teach concepts, not just answers.

## 🎯 One-Line Pitch

StepWise is an AI-powered math tutor that uses advanced image recognition and Gemini AI to break down math problems into clear, understandable steps—teaching the "why" behind each solution.

## ✨ Key Features

### 🔐 **User Authentication & Plans**
- Secure authentication powered by **Clerk**
- Three subscription tiers:
  - **Free Plan**: 2 problems/month
  - **Pro Plan**: 8 problems/month ($4/month or $40/year)
  - **Max Plan**: Unlimited problems ($15/month or $150/year)

### 📸 **Dual Input Methods**
- **Image Upload**: Snap a photo of handwritten or printed math problems
- **Text Input**: Type math problems directly with symbol keyboard support
- Drag & drop functionality for easy image uploads

### 🤖 **AI-Powered Solutions**
- Powered by **Gemini 2.0 Flash** AI model
- Detects and solves multiple problems in a single image
- Provides comprehensive breakdowns:
  - Problem statement identification
  - Key concept explanations
  - Step-by-step solutions with reasoning
  - Final answer highlighting
  - Quick tips for similar problems
  - Practice recommendations

### 💾 **Solution History**
- Auto-saves every solved problem to your personal library
- Numbered problem tracking (Problem #1, #2, #3...)
- Easily revisit past solutions anytime
- Database-backed storage with Neon PostgreSQL

### 🎨 **Beautiful UI/UX**
- Modern gradient design with Tailwind CSS
- Smooth animations with Framer Motion
- Responsive design for all devices
- Clean, distraction-free reading experience
- Math symbol quick-input keyboard

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Authentication**: Clerk (with billing integration)
- **Database**: Neon PostgreSQL + Drizzle ORM
- **AI Model**: Google Gemini 2.0 Flash
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Clerk account ([clerk.com](https://clerk.com))
- A Neon database ([neon.tech](https://neon.tech))
- A Google Gemini API key ([aistudio.google.com](https://aistudio.google.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stepwise.git
   cd stepwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (use `.env.example` as reference):
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here

   # Google Gemini AI API
   GEMINI_API_KEY=your_gemini_api_key_here

   # Neon Database Connection
   DATABASE_URL=your_neon_database_url_here

   # Clerk redirect URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   ```

4. **Set up the database**
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy on Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/stepwise)

## 🧮 Supported Math Topics

- Basic Arithmetic
- Pre-Algebra & Algebra
- Geometry
- Trigonometry
- Pre-Calculus & Calculus
- Statistics
- Word Problems
- Matrix Operations
- Vector Mathematics

## 👥 Who It's For

- **Students (Grade 5-12)**: Understand homework and prepare for tests
- **Parents**: Confidently help children without doing work for them
- **Adult Learners**: Refresh math skills for career or education
- **Tutors**: Quick resource for explaining concepts

## 🎓 Educational Philosophy

Unlike other math apps that simply provide answers, StepWise is built on the principle that **understanding beats memorization**. Each solution includes:
- Clear explanations of mathematical concepts
- Common mistake warnings
- Concept connections to build genuine understanding
- Multiple solution approaches when applicable

## 📸 Gemini AI Image Recognition Capabilities

StepWise leverages Google's Gemini 2.0 Flash model for powerful image recognition:
- ✅ Excellent OCR for handwritten math
- ✅ Handles messy writing and photos at angles
- ✅ Recognizes mathematical symbols (∫, ∑, √, π, etc.)
- ✅ Processes multiple problems in one image
- ✅ Works with diagrams, graphs, and geometric figures

## 📊 Database Schema

- **Users Table**: Stores user information synced from Clerk
- **Solutions Table**: Saves all solved problems with metadata
  - Auto-numbered problems (1, 2, 3...)
  - Tracks problem type (image/text)
  - Stores original problem content
  - Saves full AI-generated solution
  - Links to user via Clerk ID

## 🔐 Authentication & Billing

StepWise uses **Clerk Billing** for seamless subscription management:
- Secure authentication with social logins
- Stripe integration for payments (0.7% + Stripe fees)
- Automatic plan status detection
- Usage limit enforcement based on plan tier
- Real-time plan status badge in navbar

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful math reasoning
- **Clerk** for authentication and billing infrastructure
- **Neon** for serverless PostgreSQL database
- **Vercel** for deployment platform
- **shadcn/ui** for beautiful UI components

## 📧 Contact

For questions or support, reach out at: narendra.insights@gmail.com

---

**Mission Statement**: StepWise believes every student can understand math with the right guidance. We're building an AI tutor that's patient, clear, and always available—making quality math education accessible to everyone.

*Built with ❤️ for students everywhere*
