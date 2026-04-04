import { MistralAI } from '@langchain/mistralai'
import dotenv  from 'dotenv'
dotenv.config()



 const config ={
    GOOGLE_API_KEY:process.env.GOOGLE_API_KEY || "",
    MistralAI_API_KEY:process.env.MistralAI_API_KEY || "",
    COHERE_API_KEY:process.env.COHERE_API_KEY || "",
 } 


 export default config