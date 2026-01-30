import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const docSplits = async (text: string) => {
    return await textSplitter.splitText(text)
}