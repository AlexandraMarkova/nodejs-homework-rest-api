const jwt = require('jsonwebtoken')
const { CustomError } = require('../helpers/errors')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const { User } = require('../schemas/user')

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
    }

    const [, token] = authorization.split(' ')

    if (!token) {
      next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
    }

    const user = jwt.decode(token, process.env.JWT_SECRET_KEY)
    req.token = token
    req.user = user

    const userInDb = await User.findOne({ _id: user.id })
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

// const token = req.headers.authorization?.split(' ')[1]
// // console.log(token)
// if (!token) {
//   next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'))
// }
