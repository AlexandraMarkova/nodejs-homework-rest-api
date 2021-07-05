const { HttpCode } = require('../helpers/constants')
const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const IMG_DIR = path.resolve('./public/avatars')

const uploadController = async (req, res, next) => {
  console.log(req.file)
  const [, extension] = req.file.originalname.split('.')

  const fileName = path.join(IMG_DIR, `${uuidv4()}.${extension}`)
  try {
    if (req.file) {
      await fs.rename(req.file.path, fileName)
      return res.status(HttpCode.OK).json({
        status: 'success',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadController,
}
