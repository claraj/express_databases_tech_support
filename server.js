const express = require('express')
const ticketRoutes = require('./routes/ticket_manager.js')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

app.use(session({
  secret: '123456789',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded( {extended: false}))


// Make flash messages available in all views
// middleware function, called before all routes 
app.use(function (req, res, next) {
    console.log('this is the middleware getting the flash')
    // req.flash(key) reads the message and adds it to locals - variables used to render template
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use('/', ticketRoutes)

app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next) {
    console.error(err)
    console.error(err.stack)  // for server developers
    res.status(500).send('Server error') // for client 
})

const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port', server.address().port)
})