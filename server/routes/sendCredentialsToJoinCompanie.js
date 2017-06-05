var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');

var User = require('../models/user.model');


router.post('/', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({email: req.body.user.email}, function (err, user) {
        if (err) {
          return res.status(403).json({
            title: 'There was an error',
            error: err
          });
        }
        if (!user) {
          return res.status(403).json({
            title: 'Please check if your email is correct',
            error: {message: 'Please check if your email is correct'}
          })
        }

        user.resetPasswordToken   = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },

    // sending the notification email to the user with the link and the token created above
    function (token, user, done) {
      // var options = {
      //   auth: {
      //     //please edit the config file and add your SendGrid credentials
      //     api_user: config.api_user,
      //     api_key: config.api_key
      //   }
      // };
      //var mailer  = nodemailer.createTransport(sgTransport(options));


      // see https://nodemailer.com/usage/
      var mailer = nodemailer.createTransport({
          service: "Gmail",
          // host: 'smtp.gmail.com',
          // port: 587,
          // secure: true, // upgrade later with STARTTLS
          auth: {
              user: config.userGmail,
              pass: config.passGmail
          }
      })


      var html = `

        You have been invited to a salon.
        To approve, plese use this link to setup your password.
        http://${req.headers.host}/#/user/reset/${token}

      `;
      var mailOptions = {
        to: user.email,
        from: config.userGmail,
        subject: 'Salon app | New Invitation ',
        html: html
      };
      mailer.sendMail(mailOptions, function (err) {
        console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        return res.status(200).json({
          message: 'Success',
          token:'InMail'
        })
      });
    }
  ], function (err) {
    console.log(err)
    if (err) return next(err);
  });
});

module.exports = router;
