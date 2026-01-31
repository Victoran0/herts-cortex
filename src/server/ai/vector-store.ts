import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embedding";


// {
//   pageContent: "Gradient descent minimizes the loss function...",
//   metadata: {
//     study_id: "chat_456",
//     document_id: "lecture_3",
//     source: "cs229_week3.pdf"
//   }
// }

const vector_store = (): Chroma => {
    const vectorStore = new Chroma(embeddings, {
        collectionName: "hertsCortex"
    });

    return vectorStore;
}

export const retriever = vector_store().asRetriever();