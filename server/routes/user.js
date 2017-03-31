var express = require('express'),
  router = express.Router(),
  passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  fs = require('fs'),
  multer = require('multer'),
  mime = require('mime'),
  path = require('path'),
  crypto = require("crypto"),
  gm = require('gm').subClass({imageMagick: true});

var User = require('../models/user.model');

// user register
router.post('/register', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: passwordHash.generate(req.body.password)
  });
  console.log(user)
  user.save(function (err, result) {
    if (err) {
      console.log(err)
      console.log(result)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
});

// user login
router.post('/login', function (req, res, next) {
  User.findOne({email: req.body.email.toLowerCase()}, function (err, doc) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!doc) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: {message: 'Please check if your password or email are correct'}
      })
    }
    if (!passwordHash.verify(req.body.password, doc.password)) {
      return res.status(403).json({
        title: 'You cannot log in',
        error: {message: 'Please check your password or email'}
      })
    }
    var token = jwt.sign({user: doc}, config.secret, {expiresIn: config.jwtExpire});
    return res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: doc._id
    })
  })
});







// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 5;
  var currentPage = Number(req.params.page);
  var pageNumber = currentPage - 1;
  var skip = (itemsPerPage * pageNumber);
  var limit = (itemsPerPage * pageNumber) + itemsPerPage;



  User.find().count((err, totalItems) => {
    if(err)
      res.send(err);
    else
        User.aggregate(
        [
          { $skip : skip },
          { $limit : itemsPerPage }

        ], function(err, data) {
             if (err) {
               res.send(err);
             }
             else {
               var jsonOb =
                {
                  "paginationData" : {
                    "totalItems": totalItems,
                    "currentPage" : currentPage,
                    "itemsPerPage" : itemsPerPage
                  },
                  "data": data
                };

               res.send(jsonOb);
             }
           }
        );

  });

});


module.exports = router;
