var express      = require('express'),
    path         = require('path'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    config       = require('./config/config')

var userRoute    = require('./routes/user')
var promotionRoute    = require('./routes/promotion')
var companieRoute    = require('./routes/companie')
var uploadRoute  = require('./routes/upload')
var forgotRoutes = require('./routes/forgetPassword')
var resetRoutes  = require('./routes/resetPassword')
var userForms    = require('./routes/userForms')
var userProfile  = require('./routes/userProfile')
var adminPage    = require('./routes/admin')
var options    = require('./routes/options')
var presses    = require('./routes/press')
var videos    = require('./routes/video')
var products    = require('./routes/product')

var productBatch    = require('./routes/productBatch')
var productBatchServ    = require('./routes/productBatchServ')
var companieBatchServ    = require('./routes/companieBatchServ')
var sendInvitationToJoinCompanie = require('./routes/sendInvitationToJoinCompanie')
var sendCredentialsToJoinCompanie = require('./routes/sendCredentialsToJoinCompanie')




var app = express()
productBatchServ.jobScedule()
companieBatchServ.jobScedule()

mongoose.Promise = global.Promise  // gets rid of the mongoose promise deprecated warning
mongoose.connect(config.database)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/uploads', express.static(__dirname + '/uploads'))

// CORS setup
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
  next()
})

// setting up routes models
app.use('/user', userRoute)
app.use('/promotion', promotionRoute)
app.use('/profile', userProfile)
app.use('/companie', companieRoute)
app.use('/companie/sendInvitationToJoinCompanie', sendInvitationToJoinCompanie)
app.use('/companie/sendCredentialsToJoinCompanie', sendCredentialsToJoinCompanie)
app.use('/user/forgot', forgotRoutes)
app.use('/user/reset', resetRoutes)
app.use('/uploads', uploadRoute)
app.use('/forms', userForms)
app.use('/press', presses)
app.use('/video', videos)
app.use('/admin', adminPage)
app.use('/options', options)
app.use('/product', products)
app.use('/productBatch', productBatch)
//app.use('/companieBatch', companieBatch)






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
