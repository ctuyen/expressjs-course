require('dotenv').config()

const express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
//let md5 = require('md5')

let userRoute = require('./routes/user.route')
let authRoute = require('./routes/auth.route')

let authMiddleware = require('./middlewares/auth.middleware')

const app = express()
const port = 8080
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET))

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: 'Everyone' // variable name dung trong .pug
    })
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log('app listening on port ' + port))
