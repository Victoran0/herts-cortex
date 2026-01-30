"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  UploadCloud, 
  Zap, 
  GraduationCap, 
  MessageSquareQuote, 
  FileText, 
  BarChart3, 
  Sparkles,
  ArrowRight
} from "lucide-react";

// --- Components ---
import { Navbar } from "./_components/Navbar";
import { FeatureCard } from "./_components/FeatureCard";
import { Footer } from "./_components/Footer";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={16} className="text-red-500" />
            <span className="text-xs font-medium tracking-widest uppercase">Powered by Groq & LangChain</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
          >
            Master Your Modules <br /> with <span className="text-red-600">Intelligence.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The ultimate AI tutor for University of Hertfordshire students. 
            Upload your lecture notes and let HertsCortex transform complex subjects into simple, fun, and exam-ready knowledge.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all flex items-center gap-2 group">
              <Link href={'/upload'}>Start Learning Now</Link>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-lg transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to Ace.</h2>
          <p className="text-gray-500">Tailored for the modern student workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={UploadCloud}
            title="Smart Ingestion"
            description="Drop your PDFs, PowerPoints, or Word docs. Our RAG system processes them instantly to build your personal knowledge base."
            delay={0.1}
          />
          <FeatureCard 
            icon={MessageSquareQuote}
            title="Gen Z Explanations"
            description="Confused? Ask for an explanation in brain-rot slang, sarcastic humor, or real-life examples that actually make sense."
            delay={0.2}
          />
          <FeatureCard 
            icon={Zap}
            title="ELI5 Mode"
            description="Complex quantum physics? We'll explain it like you're five years old. Simple analogies, zero jargon."
            delay={0.3}
          />
          <FeatureCard 
            icon={GraduationCap}
            title="Mock Exams"
            description="Generate MCQs, fill-in-the-blanks, and theory questions based specifically on your uploaded lecture slides."
            delay={0.4}
          />
          <FeatureCard 
            icon={FileText}
            title="Theory Scoring"
            description="Write your practice essays and get instant feedback, scoring, and tips on how to improve your academic writing."
            delay={0.5}
          />
          <FeatureCard 
            icon={BarChart3}
            title="Progress Tracking"
            description="Visualize your improvement over time. HertsCortex identifies your weak spots and suggests where to focus next."
            delay={0.6}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-900/20 to-red-600/20 border border-red-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full" />
          <h2 className="text-4xl font-bold mb-6">Ready to boost your grades?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join other UH students using HertsCortex to study smarter, not harder.
          </p>
          <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
            <Link href={'/upload'}>Get Started for Free</Link>
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}