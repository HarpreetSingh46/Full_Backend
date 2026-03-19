import "dotenv/config";
import readline from 'readline/promises';
import {ChatMistralAI} from "@langchain/mistralai";
import {HumanMessage} from "langchain";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const model = new ChatMistralAI({
  model: 'mistral-small-latest',
  mistralApiKey: process.env.MISTRAL_API_KEY,
});

const messages = []

while(true){
  const userInput = await rl.question("you:  ")
  messages.push(new HumanMessage(userInput))
  const response = await model.invoke(messages)
  messages.push(response)
  console.log("MistralAI: ", response.text)
}



//  const response = await model.invoke("What is the capital of india?")
//   console.log(response.text)

  rl.close();