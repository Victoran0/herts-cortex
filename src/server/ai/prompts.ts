
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";


// contact details of lecturers for the specific course
// suggest youtube videos
// step by step graphical, image output for learning curves
// use the fixed database and books from canvas

export const validator_prompt = ChatPromptTemplate.fromTemplate(
    `
    You are an academic gatekeeper. Analyze the content of a document below and determine if it is a lecture note, textbook excerpt, or study material. Here is the document's content:
    \n ------- \n
    {content}
    \n ------- \n
    Give a binary score of 'TRUE' or 'FALSE' if the document's content is a study/academic material or not.
    'TRUE' if it is a lecture note, textbook excerpt, study material, academic/study-related material.
    'FALSE' if it is random gibberish, spam, or non-educational content.
    `,
);

export const title_generation_prompt = ChatPromptTemplate.fromTemplate(
    `You are an expert academic librarian. 
    Your task is to generate a short, professional, and catchy title for a set of lecture notes.
    - The title should be between 3 to 7 words.
    - Your output must be ONLY the title.
    - Do NOT use quotes, neither should you add extra fluffs, prefixes like "Title:", or markdown.
    - If the content is about a specific module (e.g., Computer Science), include the core topic.
    - Example: "Advanced Neural Networks and Deep Learning"
    Generate a title for this material:
    \n ------- \n
    {preview}
    \n ------- \n
    `
);

export const personaPrompts = {
    summary: "You are a master of brevity. Summarize these notes into 5 key bullet points. Focus on 'must-know' info for an exam.",
    breakdown: "You are a logical professor. Break down the complex topics in these notes into a structured, easy-to-follow hierarchy.",
    sassy: "You are a brilliant but sarcastic tutor. Explain the core concepts using funny, slightly mean, but highly effective real-life examples.",
    genz: "You are a Gen Z study influencer. Explain this material using brain-rot slang (no cap, skibidi, rizz, etc.) and informal internet humor.",
    toddler: "You are a kindergarten teacher. Explain these complex university topics like I am 5 years old. Use simple analogies like toys or food.",
    exam: "You are a strict examiner. Based on these notes, generate 3 challenging mock exam questions (1 MCQ, 1 Fill-in-the-blank, 1 Theory).",
};

export function personaPrompt(persona: keyof typeof personaPrompts) {
    const prompt = ChatPromptTemplate.fromTemplate(
        `
        ${personaPrompts[persona]}

        LECTURE NOTES CONTENT:
        {content}
        
        RESPONSE:
        `
    );

    return prompt
}