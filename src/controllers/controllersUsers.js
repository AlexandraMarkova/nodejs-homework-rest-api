const { HttpCode, Subscription } = require('../helpers/constants')
const { User } = require('../schemas/user')

const { signup, login, logout, current } = require('../services/authService')
const { sendVerifyEmail } = require('../services/emailService')

const signupController = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'Email in use',
    })
  }
  try {
    const newUser = await signup(req.body)
    const { email, verifyToken } = newUser

    try {
      await sendVerifyEmail(email, verifyToken)
    } catch (e) {
      console.log(e.message)
    }
    return res.status(HttpCode.CREATED).json({
      status: 'Created',
      user: {
        email: newUser.email,
        subscription: Subscription.STARTER,
        avatarURL: newUser.avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const newUser = await login(email, password)

    res.status(HttpCode.OK).json({
      status: 'Success',
      token: newUser.token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const logoutController = async (req, res, next) => {
  try {
    const id = req.user.id
    await logout(id)
    res.status(HttpCode.OK).json({
      status: 'Success',
    })
  } catch (error) {
    next(error)
  }
}

const currentController = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await current(id)
    res.status(HttpCode.OK).json({
      status: 'Success',
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    const user = await User.findOne({ verifyToken: req.params.token })
    if (user) {
      await User.findByIdAndUpdate(
        user._id,
        { verify: true, verifyToken: null }, { new: true }
      )
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Verification successful' },
      })
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Invalid token. Contact to administration',
    })
  } catch (error) {
    next(error)
  }
}

const repeatEmailVerify = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (user) {
      const { verifyToken, email } = user
      await sendVerifyEmail(verifyToken, email)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Verification email resubmitted' },
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User not found',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
  verify,
  repeatEmailVerify,
}
