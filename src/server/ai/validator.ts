import { ChatGroq } from "@langchain/groq";
import { validator_model } from "./llm";
import z from "zod";
import { title_generation_prompt, validator_prompt } from "./prompts";


const educationalContentSchema = z.object({
    binaryScore: z.string().describe("A binary score of 'TRUE' or 'FALSE' indicating if the content is a study/academic material or not.")
})

export async function validateContentWithAI(content: string): Promise<boolean> {
  // We only send the first 2000 characters to save tokens/time
    const preview = content.substring(0, 2000);

    const score = await validator_prompt.pipe(
        validator_model.withStructuredOutput(educationalContentSchema))
        .invoke({ content: preview }
    )

    return score.binaryScore === "TRUE";
}


/**
 * Generates a concise, catchy academic title based on the provided content.
 */
export async function generateTitleWithAI(content: string): Promise<string> {
    // Use a larger preview for title generation to catch specific topics
    const preview = content.substring(0, 4000);
    
    const title = await title_generation_prompt.pipe(validator_model).invoke({ preview });

    // Clean up the response just in case the LLM adds extra fluff
    return title.content.toString().replace(/["']/g, "").trim();
}