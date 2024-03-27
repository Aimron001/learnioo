import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

// Convert the current file's URL to a path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    }
)

export const upload = multer({ storage: storage})

 