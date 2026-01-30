"use client"

import {BrainCircuit} from "lucide-react"
import Link from "next/link";

export const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
        <BrainCircuit className="text-white" size={24} />
      </div>
      <span className="text-2xl font-bold tracking-tighter text-white">
        Herts<span className="text-red-600">Cortex</span>
      </span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
      <Link href="#features" className="hover:text-white transition-colors">Features</Link>
      <Link href="#" className="hover:text-white transition-colors">How it works</Link>
      <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all">
        Launch App
      </button>
    </div>
  </nav>
);