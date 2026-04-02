import {StateSchema, MessagesValue  , StateGraph, START,END, Graph, ReducedValue} from "@langchain/langgraph"
import type  {GraphNode} from '@langchain/langgraph'
import { HumanMessage } from "@langchain/core/messages"   // ✅ FIX
import { z} from 'zod'
import { mistralai , cohereModel } from "./models.js"
const State = new StateSchema({
    messages:MessagesValue,
    solution_1: new ReducedValue(z.string().default(""),{
        reducer :(current,next)=>{
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""),{
        reducer :(current,next)=>{
            return next
        }
    }),

    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score:0,
        solution_2_score:0,
    }),
        {
            reducer :(current,next)=>{
                return next
            }
        }
)
})

const solutionNode:GraphNode<any> = async (state)=>{
    const [mistral_solution , cohere_solution]= await Promise.all([
        mistralai.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ])
    return{
        solution_1:mistral_solution.text,
        solution_2:cohereModel.text,
    }
}

const graph = new StateGraph(State) 
    .addNode("solution",solutionNode)
    .addEdge(START,"solution")
    .addEdge("solution",END)
    .compile();

export default async function (userMessage:string) {
    const result = await graph.invoke({
        messages:[
            new HumanMessage(userMessage)
        ]
    })
    console.log(result)
    return result.messages
}