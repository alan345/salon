var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Video    = require('../models/video.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken')

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err)
})

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization']
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
      })
    }
    if (decoded) {
      User.findById(decoded.user._id, function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          })
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if (doc) {
          req.user = doc
          next()
        }
      })
    }
  })
})



//update
router.put('/:id', function (req, res, next) {
  Video.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No forms found for this user',
        err: err
      })
    } else {
      console.log(req.body)
        item.title = req.body.title
        item.embed = req.body.embed
        item.categories = req.body.categories


        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            })
          }
          res.status(201).json({
            message: 'Updated successfully',
            obj: result
          })
        })

    }
  })
})

router.post('/', function (req, res, next) {
  console.log(req.body)
  //var Video = new Video(req.body)
  var video = new Video(req.body)


  video.save(function (err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'Error'}
      })
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
})




// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 5
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  //console.log(req.query.categories)
  var categories = []
  if(typeof req.query.categories === 'string') {
    categories = [req.query.categories]
  } else {
    categories = req.query.categories
  }

  var matchRules = []
  categories.forEach(function (categ) {
    categorie = JSON.parse(categ)
    if(categorie.name) {
      matchRules.push({
         '$elemMatch': categorie
       })
    }
  })

  Video
  .find({
    categories: {
       "$all": matchRules
     }
  })
  .limit(itemsPerPage)
  .skip(skip)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      Video
      .find({
          categories: {
             "$all": matchRules
           }
        })
      .count()
      .exec(function (err, count) {
      res.status(200).json({
          paginationData : {
            totalItems: count,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage
          },
          data: item
        })
      })
    }
  })
})




// getting user forms to display them on front end
router.get('/:id', function (req, res, next) {
  Video
  .findById({_id: req.params.id})
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No forms found for this user',
        err: err
      })
    } else {
      res.status(200).json({
        message: 'Success',
        item: item
      })
    }
  })
})



// getting user forms to display them on front end
router.get('/countNewItemForUser/:id', function (req, res, next) {

  User
  .findOne({_id: req.params.id})
  .exec(function (err, user) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    } else {
      Video
      .find({createdAt:{"$gt": user.trackinPage.lastVisitPageVideo}})
      .count()
      .exec(function (err, item) {
        if (err) {
          return res.status(404).json({
            message: 'No forms found for this user',
            err: err
          })
        } else {
          res.status(200).json({
            message: 'Success',
            item: item
          })
        }
      })
    }
  })

})


router.delete('/:id', function (req, res, next) {
  Video.findById((req.params.id), function (err, item) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }

    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      })
    })
  })
})


// retrieving a single form
router.get('/edit/:id', function (req, res, next) {
  Form.findById((req.params.id), function (err, form) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!form) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }
    // checking if the owner of the form is correct
    if (form.owner != req.user._id.toString()) {
      return res.status(401).json({
        title: 'Not your form!',
        error: {message: 'Users do not match, not your form'}
      })
    }
    res.status(200).json({
      obj: form
    })
  })
})

module.exports = router
