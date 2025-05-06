import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = `${uuidv4()}${ext}`
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })
export const uploadSingle = upload.single('image') 

export const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No se envió ningún archivo' })
  }
  const imageUrl = `/uploads/${req.file.filename}`
  return res.status(200).json({ imageUrl })
}
