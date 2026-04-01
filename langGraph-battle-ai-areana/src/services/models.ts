import { ChatGoogle } from "@langchain/google";
import config  from "../config/config.js";
import {ChatMistralAI} from "@langchain/mistralai"
export  const model  =  new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: config.GOOGLE_API_KEY

})

export  const mistralai =  new ChatMistralAI({
    model  :"mistral-medium-latest",
    apiKey : config.MISTRAL_API_KEY
})
