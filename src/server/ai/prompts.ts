
import { PromptTemplate } from "@langchain/core/prompts";


// add course title to the context
// contact details of lecturers for the specific course
// suggest youtube videos
// step by step graphical, image output for learning curves
// use the fixed database and books from canvas

export const mock = new PromptTemplate({
    template: `You are a context aware summarizing assistant. Summarize the text below.
    Text:
    {document}`,
    inputVariables: ['document'],
    
})