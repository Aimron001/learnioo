import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from './config/db.js'
import bookRoutes from './routes/bookRoutes.js'
import cookieParser from "cookie-parser"
dotenv.config()

connectDB()
const port = process.env.PORT || 8000
const app = express()

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 
  };

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/uploads", express.static('../uploads'));
app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
app.use(notFound)
app.use(errorHandler)