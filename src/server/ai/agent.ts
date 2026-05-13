import { MemorySaver, StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
import { llm } from "./llm";
import { personaPrompt, personaPrompts } from "./prompts";
import { mcqSchema } from "./validator";
import { AIMessage } from "node_modules/@langchain/core/dist/messages/ai";
import { v4 as uuidv4 } from 'uuid';


const State = new StateSchema({
  messages: MessagesValue,
});

const routePersona = async (state: typeof State.State) => {
    // console.log('The current state:\n', state.messages)
    // Get the persona from the most recent message (the initial user message)
    const lastMessage = state.messages[state.messages.length - 1];
    const persona: keyof typeof personaPrompts = lastMessage?.additional_kwargs?.persona as keyof typeof personaPrompts
    
    if (persona === "mcq") {
      return "mcqNode"
    }

    return 'multiPersonaNode'
};

const mcqNode: GraphNode<typeof State> = async (state) => {
    const lastMessage = state.messages[state.messages.length - 1];
     const message = lastMessage?.content as string;
     const document = lastMessage?.additional_kwargs?.document as string;
     if (!document || !message) {
        throw new Error("Missing document or message in the state.");
    }

    const llmWithStructuredOutput = llm.withStructuredOutput(mcqSchema, {
        name: "generate_mcq"
    });

    const structuredResponse = await personaPrompt("mcq").pipe(llmWithStructuredOutput).invoke({ content: document, query: message });
    
    return { 
        messages:[new AIMessage({ content: JSON.stringify(structuredResponse) })] 
    };
};

const multiPersonaNode: GraphNode<typeof State> = async (state) => {
    const message = state.messages[state.messages.length - 1]?.content as string;
    const lastMessage = state.messages[state.messages.length - 1];
    const document = lastMessage?.additional_kwargs?.document as string;
    const persona = lastMessage?.additional_kwargs?.persona as keyof typeof personaPrompts;

    if (!document || !message) {
        throw new Error("Missing document or message in the state.");
    }

    const aiMsg = await personaPrompt(persona).pipe(llm).invoke({ content: document, query: message });
    return { messages: [aiMsg] };
}

const checkpointer = new MemorySaver();

export const graph = new StateGraph(State)
  .addNode("mcqNode", mcqNode)
  .addNode("multiPersonaNode", multiPersonaNode)
  .addConditionalEdges(START, routePersona, {
      mcqNode: "mcqNode",
      multiPersonaNode: "multiPersonaNode"
  })
  .addEdge("mcqNode", END)
  .addEdge("multiPersonaNode", END)
  .compile({ checkpointer });

// 6. Invoke the Agent
export const invoke_agent = async (document: string, persona: string, message: string) => {
    const thread_id = uuidv4();
    const config = { configurable: {thread_id: thread_id } };
  //  Only pass the document when the state is empty, i.e new convo after adding memory
    const response = await graph.invoke({ 
        messages:[{ 
            role: "user", 
            content: message,
            additional_kwargs: { persona: persona, document: document }, 
        }] 
    }, config
    );
    const graphState = await graph.getState(config)
    console.log('The current state of the graph:\n', graphState);
    console.log('The AI response:\n', response);
    
    const finalContent = response.messages[response.messages.length - 1]?.content;

    // If you routed to the mcqNode, parse the structured string back into a JS object
    if (persona === "mcq" && typeof finalContent === "string") {
        return JSON.parse(finalContent); 
    }

    return finalContent;
};