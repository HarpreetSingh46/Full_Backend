import "dotenv/config";
import readline from 'readline/promises';
import {ChatMistralAI} from "@langchain/mistralai";
import {HumanMessage , createAgent} from "langchain";
import { sendEmail } from "./mail.service.js";
import { tool } from "langchain";
import * as z from "zod";
import { describe } from "zod/v4/core";
const emailTool = tool(
  sendEmail,
  {
    name:"sendEmail",
    description:"use this tool to send email to anyone",
    schema:z.object({
      to:z.string().describe("subject of the email"),
      html:z.string().describe("html content of the email"),
      subject:z.string().describe("subject of the email"),
    })
  }
)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const model = new ChatMistralAI({
  model: 'mistral-small-latest',
  mistralApiKey: process.env.MISTRAL_API_KEY,
});

const agent =  createAgent({
  model,
  tools:[emailTool]
})

const messages = []

while(true){
  const userInput = await rl.question("you:  ")
  messages.push(new HumanMessage(userInput))
  const response = await agent.invoke({ 
     messages 
    })
  messages.push(response.messages[response.messages.length - 1  ])
  console.log("MistralAI: ", response )
}



//  const response = await model.invoke("What is the capital of india?")
//   console.log(response.text)

  rl.close();