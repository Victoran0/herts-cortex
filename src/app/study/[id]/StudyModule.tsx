"use client"

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const StudyModule = ({ icon: Icon, title, description, color, onClick, delay }: any) => (
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