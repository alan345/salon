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
          // host: 'smtp.gmail.com',
          // port: 587,
          // secure: true, // upgrade later with STARTTLS
          auth: {
              user: config.userGmail,
              pass: config.passGmail
          }
      })
      userToSendMail = []

      token._users.forEach(user => {
        if(user.role == 'admin') {
          userToSendMail.push(user.email)
        }
      })

      var html = `

      <div style="height: 150px; width: 100%; background-color: #0a2f87;">
        <img src="/assets/images/mychair-logo-horizontal-white.png" style="max-height: 100%; padding: 15px 0;">
      <div style="padding: 15px; background-color: #ffffff; width: 100%;">
        <p>Hi there!</p>
        <p>[FIRST NAME] [LAST NAME] invited you to join his salon on the My Chair Phyto App.</p>
        <a
          href="http://${req.headers.host}/#/companie/edit/addUser/${req.body.fetchedCompanie}/${req.body.fetchedUser}"
          style="background-color: #0a2f87; padding: 10px 15px; border: none; outline: none;"
        >
          Accept the Invitation
        </a>
      </div>
      <div class="width: 100%; background-color: #eeeeee;">
        <a href="https://www.phyto.com/">Phyto Website</a>
        <a href="mailto:mychair@alesgroup.com?Subject=My%20Chair%20App%20Invitation%20Email">Contact Us</a>
      </div>


      `;
      var mailOptions = {
        //to: userToSendMail,   // ici quand on aura fini les tests, il faudra remplacer par cette ligne
        to: 'alan.szternberg@gmail.com',
        from: config.userGmail,
        subject: 'Salon app | New request  ',
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
