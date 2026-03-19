import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.PERPLEXITY_API_KEY,
});

export async function testAi(){
    model.invoke("What is the capital of France?")
    .then((response) => {
        console.log("AI Response:", response);
    }).catch((error) => {
        console.error("Error invoking AI model:", error);
    });
}