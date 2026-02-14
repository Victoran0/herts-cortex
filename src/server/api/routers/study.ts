import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import pdf from "pdf-parse"; 
import mammoth from "mammoth";
import { parseOfficeAsync } from 'officeparser';
import { TRPCError } from "@trpc/server";
import { generateTitleWithAI, validateContentWithAI } from "@/server/ai/validator";
import { invoke_agent } from "@/server/ai/agent";


export const studyRouter = createTRPCRouter({
  initializeStudySession: publicProcedure
    .input(z.object({
      title: z.string().optional(), // Make title optional now!
      pastedText: z.string().optional(),
      files: z.array(z.object({
        base64: z.string(),
        fileName: z.string(),
        fileType: z.string(),
      })).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      let combinedContent = "";
      
      // 1. Add Pasted Text if it exists
      if (input.pastedText) {
        combinedContent += `--- Pasted Notes ---\n${input.pastedText}\n\n`;
      }

      // 2. Process Files in Parallel
      if (input.files && input.files.length > 0) {
        const filePromises = input.files.map(async (file) => {
          const buffer = Buffer.from(file.base64, 'base64');
          let text = "";

          try {
            if (file.fileType.includes("pdf")) {
              const data = await pdf(buffer);
              text = data.text;
            } else if (file.fileType.includes("officedocument.wordprocessingml.document")) {
              const data = await mammoth.extractRawText({ buffer });
              text = data.value;
            } else if (file.fileType.includes("officedocument.presentationml.presentation")) {
              text = await parseOfficeAsync(buffer);
            }
            return `--- File: ${file.fileName} ---\n${text}\n\n`;
          } catch (err) {
            console.error(`Error parsing ${file.fileName}:`, err);
            return "";
          }
        });

        const results = await Promise.all(filePromises);
        combinedContent += results.join("");
      }

      // 3. Validation: Ensure we actually have content
      if (combinedContent.trim().length < 50) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The provided content is too short to be a lecture note.",
        });
      }

      // 1. AI Validation (Gatekeeping)
      const isValid = await validateContentWithAI(combinedContent);
      if (!isValid) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "This content doesn't look like study material. HertsCortex only processes academic notes.",
        });
      }

      // 2. AI Title Generation
      // If the user left the title blank, let the AI decide.
      const finalTitle = input.title && input.title.trim().length > 0 
        ? input.title 
        : await generateTitleWithAI(combinedContent);

      // 3. Save to Drizzle
      const newDoc = await ctx.prisma.document.create({
        data: {
          title: finalTitle,
          docContent: combinedContent,
          userId: "guest_user",
        },
      });

      return { 
        success: true, 
        studyId: newDoc?.chatId,
        generatedTitle: finalTitle 
      };
    }),
    
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const doc = await ctx.prisma.document.findUnique({
        where: { chatId: input.id },
      });

      if (!doc) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Study session not found",
        });
      }

      return doc;
    }),

  askPersona: publicProcedure
    .input(z.object({
      docContent: z.string(),
      persona: z.enum(["summary", "breakdown", "sassy", "genz", "toddler", "exam"])
    }))
    .mutation(async ({ input }) => {
      const response = await invoke_agent(input.docContent, input.persona);
      return { response };
    }),
  

});

// f4fcb249-3d89-41d6-8755-807369a76f1f