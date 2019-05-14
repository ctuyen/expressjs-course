const express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')

let userRoute = require('./routes/user.route')

const app = express()
const port = 8080
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: 'Everyone' // variable name dung trong .pug
    })
})

app.use('/users', userRoute)

app.listen(port, () => console.log('app listening on port ' + port))
