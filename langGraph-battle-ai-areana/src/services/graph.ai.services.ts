import {StateSchema, MessagesValue  , StateGraph, START,END, Graph} from "@langchain/langgraph"
import type  {GraphNode} from '@langchain/langgraph'
import { HumanMessage } from "@langchain/core/messages"   // ✅ FIX

const State = new StateSchema({
    messages:MessagesValue,
})

const solutionNode:GraphNode<any> = (state)=>{
    console.log(state.messages)
    return{
        messages: state.messages[0]
    }
}

const graph = new StateGraph(State) 
    .addNode("solution",solutionNode)
    .addEdge(START,"solution")
    .compile();

export default async function (userMessage:string) {
    const result = await graph.invoke({
        messages:[
            new HumanMessage(userMessage)
        ]
    })
    return result.messages
}