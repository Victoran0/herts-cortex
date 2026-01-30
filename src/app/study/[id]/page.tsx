"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Zap, 
  Baby, 
  Laugh, 
  FileQuestion, 
  PenTool, 
  Library, 
  TrendingUp, 
  MessageSquare,
  ChevronRight,
  Sparkles,
  History
} from "lucide-react";
import Link from "next/link";

// Shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StudyModule = ({ icon: Icon, title, description, color, onClick, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
    className="cursor-pointer group"
    onClick={onClick}
  >
    <Card className="h-full bg-white/5 border-white/10 hover:border-red-600/50 transition-all overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${color}`} />
      <CardContent className="p-6 flex flex-col h-full">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
          <Icon className="text-white group-hover:text-red-500 transition-colors" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-600 mb-2 flex items-center gap-2">
          {title}
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function StudyHub() {
  // Mock state for progress - in reality, this would come from Drizzle/tRPC
  const [hasTakenAssessment, setHasTakenAssessment] = useState(true); 
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Header Section */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Herts<span className="text-red-600">Cortex</span>
            </Link>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="bg-red-600/10 text-red-500 border-red-600/20">
                CS502: Artificial Intelligence
              </Badge>
              <span className="text-xs text-gray-500 italic">Lecture_Notes_Final.pdf</span>
            </div>
          </div>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <History className="mr-2 h-4 w-4" /> History
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Welcome & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Cortex is <span className="text-red-600">Primed.</span>
            </motion.h1>
            <p className="text-gray-400 text-lg">
              Your material has been indexed. How would you like to master this topic today?
            </p>
          </div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-900/20 to-transparent border border-red-500/20 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-300">Mastery Level</span>
              <TrendingUp size={18} className="text-red-500" />
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">{hasTakenAssessment ? progress : "--"}%</span>
              <span className="text-gray-500 text-sm mb-1">overall score</span>
            </div>
            <Progress value={hasTakenAssessment ? progress : 0} className="h-2 bg-white/5" />
            <p className="text-xs text-gray-500 mt-4">
              {hasTakenAssessment 
                ? "You're doing great! Focus on 'Neural Networks' to improve." 
                : "Take your first mock exam to unlock progress tracking."}
            </p>
          </motion.div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Section: Explainers */}
          <div className="col-span-full mt-8 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-red-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">AI Personas & Explanations</h2>
          </div>

          <StudyModule 
            icon={Brain}
            title="Deep Breakdown"
            description="Get a structured, logical breakdown of complex topics within your notes."
            color="bg-blue-500"
            delay={0.1}
          />
          <StudyModule 
            icon={Laugh}
            title="Sassy Tutor"
            description="Funny, sarcastic, and slightly unhinged real-life examples to make it stick."
            color="bg-orange-500"
            delay={0.2}
          />
          <StudyModule 
            icon={MessageSquare}
            title="Brain Rot Mode"
            description="Explained using Gen Z slangs and informal internet culture. No cap."
            color="bg-purple-500"
            delay={0.3}
          />
          <StudyModule 
            icon={Baby}
            title="ELI5 Mode"
            description="Explain like I'm a toddler. Simple analogies and zero academic jargon."
            color="bg-green-500"
            delay={0.4}
          />

          {/* Section: Assessments */}
          <div className="col-span-full mt-12 mb-4 flex items-center gap-2">
            <PenTool size={18} className="text-red-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Assessment Center</h2>
          </div>

          <StudyModule 
            icon={FileQuestion}
            title="Mock Exam"
            description="Full-length exam simulation based on your specific lecture content."
            color="bg-red-500"
            delay={0.5}
          />
          <StudyModule 
            icon={Zap}
            title="Quick MCQs"
            description="Rapid-fire multiple choice questions to test your memory on the fly."
            color="bg-yellow-500"
            delay={0.6}
          />
          <StudyModule 
            icon={PenTool}
            title="Theory Write-up"
            description="Write an essay response and get graded instantly with feedback."
            color="bg-pink-500"
            delay={0.7}
          />

          {/* Section: Resources */}
          <div className="col-span-full mt-12 mb-4 flex items-center gap-2">
            <Library size={18} className="text-red-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Knowledge Base</h2>
          </div>

          <StudyModule 
            icon={Library}
            title="Deep Roots"
            description="Curated external resources to learn the basics of this subject from scratch."
            color="bg-cyan-500"
            delay={0.8}
          />
        </div>
      </main>
    </div>
  );
}