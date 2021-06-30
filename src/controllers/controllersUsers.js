const { HttpCode, Subscription } = require('../helpers/constants')
const { User } = require('../schemas/user')

const { signup, login, logout, current } = require('../services/authService')

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
    return res.status(HttpCode.CREATED).json({
      status: 'Created',
      user: {
        email: newUser.email,
        subscription: Subscription.STARTER,
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

    // return
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

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
}
