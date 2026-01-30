import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import pdf from "pdf-parse"; 
import mammoth from "mammoth";
import { parseOfficeAsync } from 'officeparser';
import { invoke_agent } from "@/server/ai/agent";


export const studyRouter = createTRPCRouter({
  // 1. Mutation for simple pasted text
  processText: publicProcedure
    .input(z.object({ 
      text: z.string().min(1000),
      title: z.string().optional() 
    }))
    .mutation(async ({ input }) => {
      console.log("--- Processing Raw Text ---");
      console.log("Title:", input.title ?? "Untitled Note");
      console.log("Content Preview:", input.text.substring(0, 200) + "...");

      // if the content does not seem to be a lecture note or study material, return an error
      invoke_agent(input.text);
      
      // In the future, this is where LangChain & Chroma logic goes
      return { success: true, message: "Text received and logged" };
    }),

  // 2. Mutation for Files (PDF, DOCX, PPTX)
  processFile: publicProcedure
    .input(z.object({
      base64: z.string(), // The file content as a base64 string
      fileName: z.string(),
      fileType: z.string(),
    }))
    .mutation(async ({ input }) => {
      console.log(`--- Processing File: ${input.fileName} ---`);
      
      // Convert Base64 back to a Buffer
      const buffer = Buffer.from(input.base64, 'base64');
      let extractedText = "";

      try {
        if (input.fileType.includes("pdf")) {
          const data = await pdf(buffer);
          extractedText = data.text;
        } 
        else if (input.fileType.includes("officedocument.wordprocessingml.document")) {
          const data = await mammoth.extractRawText({ buffer });
          extractedText = data.value;
        } 
        else if (input.fileType.includes("officedocument.presentationml.presentation")) {
          const ast = await parseOfficeAsync(buffer);
          extractedText = ast.toString();
        }

        console.log("Extracted Text Length:", extractedText.length);
        console.log("Extracted Content Preview:", extractedText.substring(0, 500) + "...");

        // if the content does not seem to be a lecture note or study material, return an error
        invoke_agent(extractedText);

        return { 
          success: true, 
          fileName: input.fileName,
          textLength: extractedText.length 
        };

      } catch (error) {
        console.error("Parsing Error:", error);
        throw new Error(`Failed to parse ${input.fileName}`);
      }
    }),
});