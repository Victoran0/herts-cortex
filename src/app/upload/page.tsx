"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  FileJson, 
  Type, 
  X, 
  CheckCircle2, 
  Loader2,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"
import { Footer } from "../_components/Footer";

// trpc api
import { api } from "@/trpc/react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const router = useRouter()

  // tRPC Mutations
  const initializeMutation = api.study.initializeStudySession.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String!);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    // 1. Validation: Ensure there is actually something to upload
    if (!pastedText && files.length === 0) {
      toast.error("No content found", {
        description: "Please paste some text or upload at least one file.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Prepare all files by converting them to Base64 in parallel
      // This is much faster than a 'for' loop
      const fileData = await Promise.all(
        files.map(async (file) => ({
          base64: await fileToBase64(file),
          fileName: file.name,
          fileType: file.type,
        }))
      );

      // 3. Call the UNIFIED mutation
      // We send the title, the pasted text, and the array of files in one go
      const result = await initializeMutation.mutateAsync({
        pastedText: pastedText || undefined,
        files: fileData.length > 0 ? fileData : undefined,
      });

      // 4. Handle Success
      if (result.success && result.studyId) {
        toast.success("Cortex Initialized", {
          description: "All materials have been processed successfully.",
        });

        // Reset local state
        setFiles([]);
        setPastedText("");

        // 5. Redirect to the Study Hub using the new ID
        router.push(`/study/${result.studyId}`);
      }
    } catch (error: any) {
      // 6. Handle Errors (including the AI validation error we set up)
      toast.error("Processing Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-gray-400" />
          <span className="text-xl font-bold tracking-tighter">
            Herts<span className="text-red-600">Cortex</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">System Ready</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Feed the Cortex</h1>
          <p className="text-gray-400">Upload your lecture materials to begin your personalized AI learning session.</p>
        </motion.div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 mb-8">
            <TabsTrigger value="upload" className="data-[state=active]:bg-red-600 text-gray-600 data-[state=active]:text-white">
              <Upload size={16} className="mr-2" /> Upload Files
            </TabsTrigger>
            <TabsTrigger value="paste" className="data-[state=active]:bg-red-600 text-gray-600 data-[state=active]:text-white">
              <Type size={16} className="mr-2" /> Paste Text
            </TabsTrigger>
          </TabsList>

          {/* File Upload Tab */}
          <TabsContent value="upload" className="m-0 p-0">
            <Card className="bg-white/5 border-dashed border-2 border-white/10 hover:border-red-600/50 transition-colors overflow-hidden">
              <CardContent className="p-0">
                <label 
                  className={`flex flex-col items-center justify-center py-[58px] cursor-pointer transition-all ${isDragging ? 'bg-red-600/5' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files) {
                      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
                    }
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
                    <Upload className="text-red-500" size={32} />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, PPTX, DOCX (Max 20MB)</p>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.pptx,.docx" />
                </label>
              </CardContent>
            </Card>

            {/* File List */}
            <div className="mt-6 space-y-3">
              <AnimatePresence>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-500" size={20} />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px] md:max-w-md">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button title="Remove file" onClick={() => removeFile(index)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                      <X size={18} className="text-gray-400" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Paste Text Tab */}
          <TabsContent value="paste">
            <div className="space-y-4 mb-6">
              <Textarea 
                placeholder="Paste your lecture notes, transcript, or any text here..."
                className="min-h-[300px] bg-white/5 border-white/10 focus:border-red-600/50 text-white placeholder:text-gray-600 rounded-2xl p-6 text-lg"
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Button */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button 
            disabled={files.length === 0 && (pastedText.length < 1000) || isProcessing}
            onClick={handleUpload}
            className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Knowledge...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Initialize HertsCortex
              </>
            )}
          </Button>
        </motion.div>

        {/* Info Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          By uploading, you agree to the HertsCortex Academic Integrity guidelines. <br />
          Your data is encrypted and used only for your personal learning session.
        </p>
      </main>

      {/* Footer */}
      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
}