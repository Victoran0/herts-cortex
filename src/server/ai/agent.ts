import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";
import { llm } from "./llm";
import { mock } from "./prompts";

const State = new StateSchema({
  messages: MessagesValue,
});

const mockNode: GraphNode<typeof State> = async (state) => {
    console.log('The current state:\n', state.messages)
    const document = state.messages[state.messages.length - 1]?.content
    console.log('The doc: \n', document)
    const input = await mock.format({document: document})
    const aiMsg = await llm.invoke(input)
    console.log('The llm response: \n', aiMsg?.toFormattedString().substring(0, 500))
    return { messages: [aiMsg] };
};

const graph = new StateGraph(State)
  .addNode("mock_node", mockNode)
  .addEdge(START, "mock_node")
  .addEdge("mock_node", END)
  .compile();

export const invoke_agent =  async (document: string) => {
    const response = await graph.invoke({ messages: [{ role: "user", content: document }] });
    console.log('The AI response:\n', response)
}