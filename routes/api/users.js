const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');


//------------------------ POST --------------------------------------------

// method: POST
// usage: used to provide user details based on email search

router.post('/',
[check('email','Email is required').not().isEmpty()],
async (req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const email = req.body.email;
    //checking for user

    try {

        let user = await User.findOne({email: email}).select({password: 0});
        if(!user) {
            return res.status(400).json({errors: ['No user exists']});
        }

        if(!user.access) {
            return res.status(400).json({errors: ['No user exists']});
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json({errors: ['Server error']});
    }

    
})

module.exports= router;