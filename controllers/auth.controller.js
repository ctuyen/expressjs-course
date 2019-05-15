const shortid = require('shortid')
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

  if (user.pass !== password) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      values: req.body
    })
  }
  
  res.cookie('userId', user.id)
  res.redirect('/users')
}
