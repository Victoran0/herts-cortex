import { createRetrieverTool } from "@langchain/classic/tools/retriever";
import { retriever } from "./vector-store";

export const retrieval_tool = createRetrieverTool(
    retriever,
    {
    name: "search_lecture_notes",
    description:
        "Use this tool to search embedded lecture notes and return relevant passages, summaries, or specific sections needed to answer academic questions."
    }
);