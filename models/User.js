const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  access: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  heading: {
    type: String,
  },
})

module.exports = User = mongoose.model('user', UserSchema)
