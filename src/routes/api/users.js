const express = require('express')
const router = express.Router()

const {
  signupController,
  loginController,
  logoutController,
  currentController,
  verify,
  repeatEmailVerify,
} = require('../../controllers/controllersUsers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { userValidation } = require('../../middlewares/validationMiddleware')

router
  .post('/signup', userValidation, signupController)
  .post('/login', userValidation, loginController)
  .post('/logout', authMiddleware, logoutController)
  .get('/current', authMiddleware, currentController)
  .get('/verify/:token', verify)
  .post('/verify', repeatEmailVerify)

module.exports = router
