import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Study', 
  description: "An AI agent designed to assist University of Hertfordshire students with their studies, providing personalized support and resources.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function StudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}