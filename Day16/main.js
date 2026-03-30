import {PDFParse} from "pdf-parse"
import dotenv from 'dotenv'
dotenv.config()
import fs  from 'fs'
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters';
import {MistralAIEmbeddings} from '@langchain/mistralai'
let dataBuffer = fs.readFileSync('./story.pdf')

const parser =  new PDFParse({
    data: dataBuffer
})

const data = await parser.getText();

const embeddings = new MistralAIEmbeddings({
    apiKey:process.env.MISTRAL_API_KEY,
    model:"mistral-embed"
})
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:300,
    chunkOverlap:0,
})

const chunks = await splitter.splitText(data.text)

const docs = await Promise.all(chunks.map(async (chunk)=>{
    const embedding = await embeddings.embedQuery(chunk)
    return{
        text:chunk,
        embedding
    }
}))

console.log(docs)