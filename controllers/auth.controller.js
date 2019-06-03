const shortid = require('shortid')
const md5 = require('md5')

const db = require('../db')

module.exports.login = function (req, res, next) {
  res.render('auth/login')
}

module.exports.postLogin = function (req, res) {
  let email = req.body.email
  let password = req.body.pass

  let user = db.get('users').find({ email: email }).value();

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist.'
      ],
      values: req.body
    })
    return
  }

  let hashedPassword = md5(password)

  if (user.pass !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      values: req.body
    })
  }
  
  res.cookie('userId', user.id, {
    signed: true
  })
  res.redirect('/users')
}
