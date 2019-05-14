const express = require('express')
const validate = require('../validate/user.validate')

const controller = require('../controllers/user.controller')

const router = express.Router()

router.get('/', controller.index)

router.get('/cookies', function (req, res, next) {
  res.cookie('user-id', 1234, { maxAge: 100000, httpOnly: true})
  res.send('Cookie sent')
})

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.get)

router.post('/create', validate.postCreate, controller.postCreate)

module.exports = router
