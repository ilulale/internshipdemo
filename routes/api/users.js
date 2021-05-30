const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const nodemailer = require('nodemailer');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          isValid: false
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                sendMail(user.email,user._id)
                res.json(user)
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  
  router.get('/verify/:id',async (req,res) => {
    const {id} = req.params
    console.log(id)
    const user = await User.findOne({_id: id})
    if(user){
        user.isVerified = true
        await user.save()
        res.redirect('/')
    }else{
        res.json('User not found')
    }
  })
  

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            isVerified: user.isVerified,
            lastLogin : user.lastLogin
          };
      user.lastLogin = Date.now()
      user.save().then(user => {
        console.log('date saved!!')
      })
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600// 1 hour in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  const sendMail = (email,id) => {
    const myEmail = require('../../config/keys').EMAIL
    const pass = require('../../config/keys').PASS
    console.log('sending mail')
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: myEmail,
            pass: pass
        }
    })
    var mailOptions
    let sender = "Kshitij"
    mailOptions = {
        from: sender,
        to: email,
        subject: "Email Confirmation",
        html: `Click <a href=http://localhost:5000/api/users/verify/${id}> here </a> to verify your Email. Thanks`
    }

    Transport.sendMail(mailOptions,function(error,response){
        if(error){
            console.log(error)
        }else{
            console.log('Mail Sent!')
        }
    })
}


  
module.exports = router;
