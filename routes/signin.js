const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('登录页')
})

// POST
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('登录')
})

module.exports = router
