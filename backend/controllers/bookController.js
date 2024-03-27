import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import fs from 'fs'
import pdfParse from 'pdf-parser'


const postBook = asyncHandler(async (req, res) => {
    try {
        if(!req.file){
            res.status(500)
            throw new Error('No file found')
        }
        const bookFile = await Book.create({
            userId: req.user._id,
            book: req.file.path,
            bookname: req.file.originalname
        })
        res.status(201).json(bookFile)
    } catch (error) {
      console.log(error);  
    }
})
const getBooks = asyncHandler(async (req, res) => {
    if (req.user) {
        // console.log(req.user._id)
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
    const dataBuffer = fs.readFileSync(req.body.filepath);
    try {
        const data = await pdfParse(dataBuffer);
        res.status(200).json({text:data.text});

    } catch (error) {
        console.error("Error extracting PDF text", error);
        throw new Error('Failed to extract text from PDF');
    }
})

export { postBook, getBooks, askQuestion } 