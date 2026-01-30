import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY, // Defaults to process.env.HUGGINGFACEHUB_API_KEY
  model: "BAAI/bge-base-en-v1.5", // Defaults to `BAAI/bge-base-en-v1.5` if not provided
  provider: "auto", // Falls back to auto selection mechanism within Hugging Face's inference API if not provided
});