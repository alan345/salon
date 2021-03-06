var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');

    var User = require('../models/user.model');
    var Companie = require('../models/companie.model');


// requesting password reset and setting the fields resetPasswordToken to a newly generated token
// and resetPasswordExpires to the exact date the form is submitted so we can set/check the validity of the timestamp (token is valid for only one hour)
// after that, the user must request a new password reset.

router.post('/', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {

      User.findOne({email: req.body.fetchedUser}, function (err, user) {
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




        Companie
        .findOne({_id:req.body.fetchedCompanie})
        .populate(
          {
            path: '_users',
            model: 'User',
          })
        .exec(function (err, item) {
          if (err) {
            return res.status(404).json({
              message: '',
              err: err
            })
          } if (!item) {
            return res.status(404).json({
              title: 'No obj found',
              error: {message: 'Obj not found!'}
            })
          } else {
            done(err, item, user);
            res.status(200).json({
              message: 'Success',
              item: item
            });
          }
        })

      });
    },

    // sending the notification email to the user with the link and the token created above
    function (token, user, done) {

      var mailer = nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: config.userGmail,
              pass: config.passGmail
          }
      })
      userToSendMail = []
      console.log('tt')
      token._users.forEach(user => {
        if(user.role == 'admin') {
          userToSendMail.push(user.email)
        }
      })
      console.log(user)
      var html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Invitation from My Chair App by Phyto Paris</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
            <tr>
              <td align="center" bgcolor="#0a2f87" height="150">
                <img
                  src="http://${req.headers.host}/assets/images/mychair-logo-horizontal-white.png"
                  alt="Request from My Chair  by Phyto Paris" width="305" height="100" style="display: block; color: #ffffff;"
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
                      ${user.profile.name} ${user.profile.lastName} has requested to join your salon on the My Chair by Phyto Paris App. Click on the link below to accept the request. This link will expire in 48 hours.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
                      <a
                        href="http://${req.headers.host}/#/companie/edit/addUser/${req.body.fetchedCompanie}/${req.body.fetchedUser}"
                        style="color: #ffffff; text-decoration: none;"
                      >
                        Accept Request
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
                    <a href="https://www.phyto.com/" style="color: #ffffff; text-decoration: none;">Phyto Website</a>
                  </td>
                  <td style="padding: 15px 15px 15px 15px;">
                    <a href="mailto:mychair@alesgroup.com?Subject=My%20Chair%20App%20Invitation%20Email" style="color: #ffffff; text-decoration: none;">Contact Us</a>
                  </td>
                 </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>


      `;
      //console.log('aa')
      var mailOptions = {
        to: userToSendMail,   // ici quand on aura fini les tests, il faudra remplacer par cette ligne
        //to: 'alan.szternberg@gmail.com',
        //to: 'doriane@mouret.org',
        from: config.userGmail,
        subject: 'My Chair by Phyto Paris | New Request  ',
        html: html
      };
      console.log('bb')
      mailer.sendMail(mailOptions, function (err) {
        console.log('info', 'An e-mail has been sent with further instructions.');
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
