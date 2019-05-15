const express = require('express')
const validate = require('../validate/user.validate')

const controller = require('../controllers/auth.controller')

const router = express.Router()

router.get('/login', controller.login)

router.post('/login', controller.postLogin) 

module.exports = router;
