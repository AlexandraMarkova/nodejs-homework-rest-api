const express = require('express')
const multer = require('multer')
const path = require('path')

const UPLOAD_DIR = path.resolve('./tmp')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const { authMiddleware } = require('../../middlewares/authMiddleware')

const {
  avatarsController,
} = require('../../controllers/controllersFiles')

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
})

router
  // .post('/avatars', uploadMiddleware.single('avatar'), uploadController)
  // .use('/avatars', express.static(IMG_DIR))
  .patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), avatarsController)

module.exports = router

// по занятию Кирилла--------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, FILE_DIR)
//   },
//   filename: (req, file, cb) => {
//     const [, extension] = file.originalname.split('.')
//     cb(null, `${uuidv4()}.${extension}`)
//   },
// })

// const { uploadController } = require('../../controllers/controllersFiles')

// const uploadMiddleware = multer({ storage })

// router.post('/avatars', uploadMiddleware.single('avatar'), uploadController)
// router.use('/avatars', express.static(FILE_DIR))
