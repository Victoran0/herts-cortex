import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
import { llm } from "./llm";
import { personaPrompt, personaPrompts } from "./prompts";

const State = new StateSchema({
  messages: MessagesValue,
});

const personaNode: GraphNode<typeof State> = async (state) => {
    console.log('The current state:\n', state.messages)
    const document = state.messages[state.messages.length - 1]?.content
    const persona: keyof typeof personaPrompts = state.messages[state.messages.length - 1]?.additional_kwargs?.persona as keyof typeof personaPrompts
    console.log('The doc: \n', document)
    
    const aiMsg = await personaPrompt(persona).pipe(llm).invoke({ content: document });
    console.log('The llm response: \n', aiMsg?.toFormattedString().substring(0, 500))
    return { messages: [aiMsg] };
};

const graph = new StateGraph(State)
  .addNode("persona_node", personaNode)
  .addEdge(START, "persona_node")
  .addEdge("persona_node", END)
  .compile();

export const invoke_agent =  async (document: string, persona: string) => {
    const response = await graph.invoke({ messages: [{ role: "user", content: document,
      additional_kwargs: { persona: persona }, }] });
    console.log('The AI response:\n', response)
    return response.messages[response.messages.length -1]?.content;
}