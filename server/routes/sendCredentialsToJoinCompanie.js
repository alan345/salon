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
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Email from My Chair App by Phyto Paris</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
            <tr>
              <td align="center" bgcolor="#0a2f87" height="150">
                <img
                  src="https://raw.githubusercontent.com/alan345/salon/master/src/assets/images/mychair-logo-horizontal-white.png"
                  alt="Invitation from My Chair App by Phyto Paris" width="305" height="100" style="display: block;"
                />
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>Hi there!</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0 30px 0;">
                      [FIRST NAME] [LAST NAME] invited you to join his salon on the My Chair Phyto App.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
                      <a
                        href="http://${req.headers.host}/#/user/reset/${token}"
                        style="color: #ffffff; text-decoration: none;"
                      >
                        Accept the Invitation
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#eeeeee">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td style="padding: 15px 15px 15px 15px;">
                    <a href="https://www.phyto.com/" style="text-decoration: none;">Phyto Website</a>
                  </td>
                  <td style="padding: 15px 15px 15px 15px;">
                    <a href="mailto:mychair@alesgroup.com?Subject=My%20Chair%20App%20Invitation%20Email" style="text-decoration: none;">Contact Us</a>
                  </td>
                 </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>

      `;
      var mailOptions = {
        to: user.email,
        from: config.userGmail,
        subject: 'My Chair by Phyto Paris | New Invitation ',
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
