import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import { Client } from "@octoai/client"
import dotenv from 'dotenv'
dotenv.config()



const postBook = asyncHandler(async (req, res) => {
    try {
        if(!req.file){
            res.status(500)
            throw new Error('No file found')
        }
        console.log("before creating")
        const bookFile = await Book.create({
            userId: req.user._id,
            book: req.file.path,
            bookname: req.file.originalname
        })
        console.log("after creating")
        res.status(201).json(bookFile)
    } catch (error) {
      console.log(error);  
    }
})
const getBooks = asyncHandler(async (req, res) => {
    if (req.user) {
        const books = await Book.find({userId: req.user._id})
        if (books){
            res.status(200).json(books)
        }
      } else {
        res.status(404)
        throw new Error('User not found')
      }
})
const askQuestion = asyncHandler(async (req, res) => {
    const client = new Client(process.env.OCTOAI_TOKEN)
    const completion = await client.chat.completions.
    create({
        "model":"llama-2-13b-chat-fp16",
        "messages": [
            {
                "role": "system",
                "content":"You are friendly assistant! You answer questions based on the context given. If you don't receive the context, you answer to the best of your knowledge.",

            }, {
                "role": "user",
                "content":`context: ${req.body.content}
                        question: ${req.body.question}`,
            }
        ]
    })
    res.status(200).json({answer: completion.choices[0].message.content});
}
)

export { postBook, getBooks, askQuestion } 