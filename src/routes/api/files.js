const express = require('express')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const FILE_DIR = path.resolve('./public/avatars')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  },
})

const { uploadController } = require('../../controllers/controllersFiles')

const uploadMiddleware = multer({ storage })

router.post('/avatars', uploadMiddleware.single('avatar'), uploadController)
router.use('/avatars', express.static(FILE_DIR))

module.exports = router
