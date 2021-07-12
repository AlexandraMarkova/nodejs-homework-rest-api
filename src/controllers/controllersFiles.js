const { HttpCode } = require('../helpers/constants')
const { updateAvatar } = require('../services/fileService')

const avatarsController = async (req, res, next) => {
  try {
    const { id } = req.user

    const url = await updateAvatar(id, req.file)

    res.status(HttpCode.OK).json({
      status: 'Success',
      avatarURL: url,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  avatarsController,
}
