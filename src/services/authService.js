/* eslint-disable no-useless-catch */
// const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { User } = require('../schemas/user')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY
const { CustomError } = require('../helpers/errors')
const { HttpCode } = require('../helpers/constants')

const signup = async (body) => {
  try {
    const user = new User({ ...body })
    await user.save()
    return user
  } catch (error) {
    throw error
  }
}

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user.verify) {
      throw new CustomError(HttpCode.UNAUTHORIZED, 'Invalid credentials')
    }
    if (!user || !user.validPassport(password)) {
      throw new CustomError(HttpCode.UNAUTHORIZED, 'Email or password is wrong')
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    )

    return await User.findByIdAndUpdate(user._id, { token }, { new: true })
  } catch (error) {
    throw error
  }
}

const logout = async (id) => {
  try {
    return await User.findByIdAndUpdate(id, { token: null }, { new: true })
  } catch (error) {
    throw error
  }
}

const current = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw error
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
}
