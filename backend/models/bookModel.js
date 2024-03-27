import mongoose from 'mongoose'


const bookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    book: {
        type: 'string',
        required: true
    },
    bookname: {
        type: 'string',
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book