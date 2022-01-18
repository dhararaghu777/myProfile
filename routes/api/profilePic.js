const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const uploadCloud = require('../../middleware/image')

//method: POST
//usage: Setting profile pic
router.post('/', [auth, uploadCloud.single('profile')], async (req, res) => {
  try {
    console.log(req.file)

    if (!req.file) {
      return res.status(400).json({ errors: ['Failed to upload'] })
    }

    const photoURL = req.file.path

    let user = await User.findById(req.user.id)
    user.image = photoURL
    await user.save()

    res.status(200).json({ msg: 'Profile pic uploaded successfully' })
  } catch (err) {
    res.status(500).json({ errors: ['Server error'] })
  }
})

// method: GET
// usage: get profile pic

module.exports = router
