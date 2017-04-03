var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');
    Options    = require('../models/options.model'),

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});



//Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {message: 'Authentication failed, malformed jwt'}
      });
    }
    if (decoded) {
      User.findById(decoded.user._id, function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          });
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      })
    }
  })
});




router.get('/', function (req, res, next) {
  Options
  .findOne()
  .populate('design.mainPage._imgLeft')
  .populate('design.mainPage._imgRight')
  .exec(function (err, obj) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!obj) {
      return res.status(403).json({
        title: 'Wrong ',
        error: {message: 'Please check'}
      })
    }
    return res.status(200).json({
      message: 'Successfull',
      obj: obj
    })
  });
});


//get all forms from database. Must be depracted
router.get('/pureOptions', function (req, res, next) {
  Options.findOne({}, function (err, obj) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!obj) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: {message: 'Please check if your password or email are correct'}
      })
    }
    return res.status(200).json({
      message: 'Successfull',
      obj: obj
    })
  })
});





//
// {
//     "_id": {
//         "$oid": "58dd4ad1734d1d01a23880fa"
//     },
//     "design": {
//         "mainPage": {
//             "_imgLeft": "58dd48ae81954008430443a6",
//             "_imgRight": "58dd48ae81954008430443a6"
//         }
//     }
// }

//update
router.put('/:id', function (req, res, next) {
  Options.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'Not found',
        err: err
      })
    } else {
        item.design = req.body.design
        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            });
          }
          res.status(201).json({
            message: 'Successfully',
            obj: result
          });
        });

    }
  })
});















module.exports = router;
