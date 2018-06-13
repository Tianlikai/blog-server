const pkg = require('./package')
const config = require('./config/default')
const express = require('express')
// const favicon = require('serve-favicon')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./routes/signup')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise


const app = express()
const port = process.env.PORT || config.port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(favicon(__dirname + '/src/assets/favicon.ico'))

app.use(session({
  name: config.session.key, 
  secret: config.session.secret,
  resave: true, 
  saveUninitialized: false, 
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))

app.use(express.static('dist'))
app.use('/api', route)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app