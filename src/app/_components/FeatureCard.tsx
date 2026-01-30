"use client"
import { motion } from "motion/react";


export const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: false }}
    className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 hover:border-red-600/50 transition-all group"
  >
    <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-red-500" size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);