const { HttpCode } = require('../helpers/constants')

const uploadController = async (req, res, next) => {
  console.log(req.file)
  try {
    if (req.file) {
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
