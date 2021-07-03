const { HttpCode } = require('../helpers/constants')

const uploadController = async (req, res, next) => {
  try {
    return res.status(HttpCode.OK).json({
      status: 'success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadController,
}
