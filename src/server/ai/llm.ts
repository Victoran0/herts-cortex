import { ChatGroq } from "@langchain/groq"

export const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

export const validator_model = new ChatGroq({
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  temperature: 0.6,
});