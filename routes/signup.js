const express = require('express')
const sha1 = require('sha1')
const router = express.Router()
const User = require('../models/users')

router.post('/register', (req, res) => {
  let insertUser = {
    name: req.body.name,
    password: sha1(req.body.password),
    re_password: sha1(req.body.re_password)
  }
  User.create(insertUser, (err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
})

module.exports = router

