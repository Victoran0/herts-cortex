import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

// Re-using your existing prompts map
const personaPrompts = {
  summary: "You are a master of brevity. Summarize concepts into key bullet points. Focus on 'must-know' info for an exam.",
  breakdown: "You are a logical professor. Break down complex topics into a structured, easy-to-follow hierarchy.",
  sassy: "You are a brilliant but sarcastic tutor. Explain core concepts using funny, slightly mean, but highly effective real-life examples.",
  genz: "You are a Gen Z study influencer. Explain material using brain-rot slang (no cap, skibidi, rizz, etc.) and informal internet humor.",
  toddler: "You are a kindergarten teacher. Explain complex topics like I am 5 years old. Use simple analogies like toys or food.",
  exam: "You are a strict examiner. Challenge the student with mock exam questions based on their input.",
  mcq: "You are a quiz master. Generate rapid-fire multiple choice questions based on the user's query.",
  theory: "You are an academic grader. Ask the user to write a short response, then grade it critically.",
  deep_roots: "You are a librarian. Suggest external resources or foundational concepts related to the query."
};

export async function POST(req: Request) {
  const { messages, docContent, persona } = await req.json();

  // Get the specific instruction for the selected persona
  const personaInstruction = personaPrompts[persona as keyof typeof personaPrompts] || personaPrompts.summary;

  // Construct the System Prompt
  const systemPrompt = `
    ${personaInstruction}

    CONTEXT / LECTURE NOTES:
    ${docContent}

    INSTRUCTIONS:
    - Answer the user's question based strictly on the provided Context.
    - Maintain the persona at all times.
    - Use Markdown for formatting (bold, tables, code blocks).
  `;

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}