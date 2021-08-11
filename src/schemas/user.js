const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')

const SALT_FACTOR = 6
const { Subscription } = require('../helpers/constants')

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      },
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: uuidv4(),
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR),
  )
  next()
})

userSchema.methods.validPassport = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = {
  User,
}
