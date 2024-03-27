import express from "express"
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
dotenv.config()

connectDB()
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})