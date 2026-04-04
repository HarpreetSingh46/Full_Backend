import { ChatGoogle } from "@langchain/google";
import {ChatMistralAI} from "@langchain/mistralai";
import {ChatCohere} from "@langchain/cohere";
import config from "../config/config.js";



 export const geminiModel = new ChatCohere({
    model:"gemini-flash-latest",
    apikey:config.GOOGLE_API_KEY,
 })


 export const mistralAIModel = new ChatMistralAI({
    model : "mistral-medium-latest",
    apiKey: config.MistralAI_API_KEY,
 })
 export const cohereModel = new  ChatCohere({
    model : "cohere-command-a-03-2025",
    apiKey: config.COHERE_API_KEY,
 })

