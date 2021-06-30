const jwt = require('jsonwebtoken')
const { CustomError } = require('../helpers/errors')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
// const SECRET_KEY = process.env.JWT_SECRET_KEY
const { User } = require('../schemas/user')

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  console.log(token)
  if (!token) {
    next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET_KEY)
    req.token = token
    req.user = user

    const userInDb = await User.findOne({ _id: user.id })
    console.log(userInDb)
    if (!userInDb || userInDb.token !== token) {
      next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
    }
    next()
  } catch (error) {
    next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
  }
}

module.exports = {
  authMiddleware,
}
