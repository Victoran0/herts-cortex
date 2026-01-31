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
  Sparkles,
  History,
  Highlighter, 
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"; 

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Footer } from "@/app/_components/Footer";
import { StudyModule } from "./StudyModule";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownRenderer } from "@/components/markdown-renderer";



export default function StudyHub() {
  // Mock state for progress - in reality, this would come from Drizzle/tRPC
  const [hasTakenAssessment, setHasTakenAssessment] = useState(true); 
  const [progress, setProgress] = useState(65);
  const params = useParams();
  const studyId = params.id as string;

  // Fetch the document data from Drizzle via tRPC
  const { data: studySession, isLoading, error } = api.study.getById.useQuery(
    { id: studyId },
    { enabled: !!studyId } // Only run if ID exists
  );

  // State for the AI Interaction
  const [isOpen, setIsOpen] = useState(false);
  const [activePersona, setActivePersona] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState("");

  if (error) return <div className="text-white p-10 text-center">Session not found.</div>;

  const personaMutation = api.study.askPersona.useMutation({
    onSuccess: (data) => setAiResponse(data.response as string),
  });

  const handlePersonaClick = (personaKey: string, title: string, icon: any) => {
    if (!studySession) return;
    
    setActivePersona({ title, icon });
    setAiResponse(""); // Clear previous response
    setIsOpen(true);
    
    personaMutation.mutate({
      docContent: studySession.docContent,
      persona: personaKey as any
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Section */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Herts<span className="text-red-600">Cortex</span>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <div className="hidden md:flex items-center gap-2">
              {/* DYNAMIC TITLE BADGE */}
              {isLoading ? (
                <Skeleton className="h-6 w-48 bg-white/10 rounded-full" />
              ) : (
                <Badge variant="outline" className="bg-red-600/10 text-red-500 border-red-600/20 px-3 py-1">
                  {studySession?.title}
                </Badge>
              )}
              <span className="text-xs text-gray-500 italic">
                {isLoading ? "..." : "Active Session"}
              </span>
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
              {isLoading ? (
                <Skeleton className="h-12 w-64 bg-white/10" />
              ) : (
                <>Cortex is <span className="text-red-600">Primed.</span></>
              )}
            </motion.h1>
            <p className="text-gray-400 text-lg">
              {isLoading 
                ? "Analyzing your materials..." 
                : `Knowledge base for "${studySession?.title}" is ready. How would you like to master this today?`}
            </p>
          </div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-br from-red-900/20 to-transparent border border-red-500/20 rounded-3xl p-6"
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
            icon={Highlighter}
            title="The Gist"
            description="Cut the fluff. Get a high-level summary of the most important concepts and key takeaways."
            color="bg-indigo-500"
            delay={0.1}
            onClick={() => handlePersonaClick("summary", "The Gist", Highlighter)}
          />
          <StudyModule 
            icon={Brain}
            title="Deep Breakdown"
            description="Get a structured, logical breakdown of complex topics within your notes."
            color="bg-blue-500"
            delay={0.1}
            onClick={() => handlePersonaClick("breakdown", "Deep Breakdown", Brain)}
          />
          <StudyModule 
            icon={Laugh}
            title="Sassy Tutor"
            description="Funny, sarcastic, and slightly unhinged real-life examples to make it stick."
            color="bg-orange-500"
            delay={0.2}
            onClick={() => handlePersonaClick("sassy", "Sassy Tutor", Laugh)}
          />
          <StudyModule 
            icon={MessageSquare}
            title="Brain Rot Mode"
            description="Explained using Gen Z slangs and informal internet culture. No cap."
            color="bg-purple-500"
            delay={0.3}
            onClick={() => handlePersonaClick("genz", "Brain Rot Mode", MessageSquare)}
          />
          <StudyModule 
            icon={Baby}
            title="ELI5 Mode"
            description="Explain like I'm a toddler. Simple analogies and zero academic jargon."
            color="bg-green-500"
            delay={0.4}
            onClick={() => handlePersonaClick("toddler", "ELI5 Mode", Baby)}
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
            onClick={() => handlePersonaClick("exam", "Mock Exam", FileQuestion)}
          />
          <StudyModule 
            icon={Zap}
            title="Quick MCQs"
            description="Rapid-fire multiple choice questions to test your memory on the fly."
            color="bg-yellow-500"
            delay={0.6}
            onClick={() => handlePersonaClick("mcq", "Quick MCQs", Zap)}
          />
          <StudyModule 
            icon={PenTool}
            title="Theory Write-up"
            description="Write an essay response and get graded instantly with feedback."
            color="bg-pink-500"
            delay={0.7}
            onClick={() => handlePersonaClick("theory", "Theory Write-up", PenTool)}
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
            onClick={() => handlePersonaClick("deep_roots", "Deep Roots", Library)}
          />
        </div>
      </main>

      {/* AI INTERACTION PANEL */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="right" 
          // w-full: mobile
          // sm:max-w-[90%]: tablets
          // lg:max-w-[60vw]: desktops (60% of page)
          className="w-full sm:max-w-[90%] lg:max-w-[60vw] bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/10 text-white p-0 shadow-2xl shadow-red-600/5 h-full flex flex-col overflow-hidden pb-5"
        >
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-600/50 to-transparent z-50" />

          <div className="flex flex-col h-full">
            {/* Header Area - Fixed at top */}
            <SheetHeader className="flex-none p-8 border-b border-white/5 bg-black/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
                    {activePersona?.icon && <activePersona.icon className="text-red-500" size={28} />}
                  </div>
                  <div>
                    <SheetTitle className="text-white text-3xl font-bold tracking-tight">
                      {activePersona?.title}
                    </SheetTitle>
                    <SheetDescription className="text-gray-500 flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Context: {studySession?.title}
                    </SheetDescription>
                  </div>
                </div>
                
                {/* Optional: Add a "Copy" or "Export" button here later */}
              </div>
            </SheetHeader>

            {/* Content Area - Scrollable */}
            <ScrollArea className="flex-1 h-full w-full">
              <div className="max-w-4xl mx-auto p-8">
                {personaMutation.isPending ? (
                  <div className="space-y-6 py-10">
                    <Skeleton className="h-10 w-1/2 bg-white/5" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full bg-white/5" />
                      <Skeleton className="h-4 w-[95%] bg-white/5" />
                      <Skeleton className="h-4 w-[98%] bg-white/5" />
                    </div>
                    <Skeleton className="h-40 w-full bg-white/5 rounded-2xl" />
                    <div className="flex items-center gap-3 text-red-500">
                      <Loader2 className="animate-spin" size={20} />
                      <span className="text-sm font-bold uppercase tracking-widest">Cortex is synthesizing knowledge...</span>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="pb-20"
                  >
                    <MarkdownRenderer content={aiResponse} />
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      <footer className="mt-16">
        <Footer />
      </footer>
    </div>
  );
}