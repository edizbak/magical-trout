const minimist = require('minimist')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const express = require('express')

const app = express()

// get port from passed in args from scripts/start.js
const port = minimist(process.argv.slice(2)).port || 4000

const users = [
  {
    username: 'admin',
    password: 'password123',
  },
  {
    username: 'lambda',
    password: 'test',
  },
]

const matchesUsernameAndPassword = (body = {}) =>
  users.some(user => user.username === body.username && user.password === body.password)

const ensureLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/unauthorized')
  }
}

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(morgan('dev'))

app.use(
  session({
    name: 'cypress-session-cookie',
    secret: 'sekret',
    resave: false,
    saveUninitialized: false,
  }),
)

app.set('views', __dirname)
app.set('view engine', 'hbs')

app.get('/', (req, res) => res.redirect('/login'))

app.get('/login', (req, res) => {
  res.render('./login.hbs')
})

app.get('/dashboard', ensureLoggedIn, (req, res) => {
  res.render('./dashboard.hbs', {
    user: req.session.user,
  })
})

app.get('/unauthorized', (req, res) => {
  res.render('./unauthorized.hbs')
})

app.listen(port)

