import express from 'express'
import { upload } from '../config/upload.js'
import { askQuestion, getBooks, postBook } from '../controllers/bookController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/', protect, upload.single('book'), postBook)
router.get('/', protect, getBooks)
router.post('/ask-question', protect, askQuestion)

export default router