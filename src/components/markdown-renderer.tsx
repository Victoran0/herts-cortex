"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Required for math styling

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
            // Style Headings
            h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-red-600/30 pb-2">
                {children}
            </h1>
            ),
            h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-red-500 mt-8 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full inline-block" />
                {children}
            </h2>
            ),
            h3: ({ children }) => (
            <h3 className="text-lg font-medium text-gray-200 mt-6 mb-2 italic">
                {children}
            </h3>
            ),
            // Style Tables (The most important part for your response)
            table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="w-full text-sm text-left border-collapse">
                {children}
                </table>
            </div>
            ),
            thead: ({ children }) => (
            <thead className="bg-red-600/10 text-red-400 uppercase text-xs font-bold">
                {children}
            </thead>
            ),
            th: ({ children }) => <th className="px-4 py-3 border-b border-white/10">{children}</th>,
            td: ({ children }) => <td className="px-4 py-3 border-b border-white/5 text-gray-300">{children}</td>,
            
            // Style Lists
            ul: ({ children }) => <ul className="space-y-2 my-4 list-disc list-inside text-gray-400">{children}</ul>,
            ol: ({ children }) => <ol className="space-y-2 my-4 list-decimal list-inside text-gray-400">{children}</ol>,
            li: ({ children }) => <li className="marker:text-red-500">{children}</li>,
            
            // Style Code Blocks
            code: ({ children }) => (
            <code className="bg-black/50 text-red-400 px-1.5 py-0.5 rounded font-mono text-sm border border-white/10">
                {children}
            </code>
            ),
            pre: ({ children }) => (
            <pre className="bg-[#050505] border border-white/10 rounded-2xl p-4 my-6 overflow-x-auto font-mono text-sm text-green-400 shadow-inner">
                {children}
            </pre>
            ),
            // Style Blockquotes/Takeaways
            blockquote: ({ children }) => (
            <div className="my-6 p-4 bg-red-600/5 border-l-4 border-red-600 rounded-r-xl italic text-gray-300">
                {children}
            </div>
            ),
            hr: () => <hr className="my-10 border-white/10" />,
        }}
        >
        {content}
        </ReactMarkdown>
    );
}