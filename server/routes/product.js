"use strict";

const Magento2 = require('node-magento2');


const options = {
  url: null,
  store: 'default', //set a store to contextualise in
  authentication: {
    login: {
      type: 'admin',
      username: 'gooplus',
      password: 'Gooplus123'
    },
    integration: {
      consumer_key: 'mfgc7teo5vwgu1pkc2v7097sv0b7l702',
      consumer_secret: 'o5g34phwlo6lyfaljgsfkam8pa08evm2',
      access_token: 'lefasu9mgavnxd3353yqi0mxj2tv9dc2',
      access_token_secret: 'kn3n1e8y2mip33v4gtvfpajsceb3n105'
    }
  }
}
const mageClient = new Magento2('http://52.2.61.43/', options)
mageClient.init();

var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Product    = require('../models/product.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});

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
          req.user = doc;
          next();
        }
      })
    }
  })
});



//update
router.put('/:id', function (req, res, next) {
  Product.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
        item.name = req.body.name
        item.date = req.body.date
        item.owner = req.body.owner
        item.form = req.body.form


        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            });
          }
          res.status(201).json({
            message: '',
            obj: result
          });
        });

    }
  })
});

router.post('/', function (req, res, next) {
  console.log(req.body)
  delete req.body._id
  var product = new Product(req.body)
//  var product = new Product(req.body)
//   delete product._id
  // console.log(product)



  product.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      })
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
})



function updateFromMagentoToBdd() {

  mageClient.catalog.product.get({
    search_criteria: {
      filter_groups: [
        {
        filters: [ {
          // field: "price", value: 10, condition_type: "lt"
          field: "name",
          value: '%',
          condition_type: "like"
        }]
      }
      ],
      "current_page": 1,
      "page_size": 2
    },
    // fields: {
    //   items: [ "sku" ]
    // }
  })
  .catch(err => { console.log('b'); })
  .then(response => {
      //console.log('aa')
      //console.log(JSON.stringify(response.items))
      let products = response.items
      console.log('e')
      //console.log(response.items)
      products.forEach(productMagento => {
        //console.log(productMagento)
        //console.log(new Product(productMagento))
  console.log('d')
         var product = new Product({
           magento: productMagento
         })
         //console.log(product)

        product.save(function (err, result) {
          if (err) {
            console.log('c')
            // return res.status(403).json({
            //   title: 'There was an issue',
            //   error: {message: 'The email you entered already exists'}
            // })
          }
          console.log('a')
          // res.status(200).json({
          //   message: 'Registration Successfull',
          //   obj: result
          // })


        })


      })
    });
}
// get all forms from database
router.get('/page/:page', function (req, res, next) {
  //console.log(mageClient)
  // mageClient.get('/V1/products', {searchCriteria: { 'sku' : 'L1014N' }}) //Get a list of all products
  //   .then(products => {
  //     console.log(products)
  //     //do something with the returned product data
  //   })
// mageClient.catalog.product.get('L1014N').then(product => {
//   console.log(product)
// })
updateFromMagentoToBdd()














  var itemsPerPage = 5
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  //var limit = (itemsPerPage * pageNumber) + itemsPerPage

  Product.find().count((err, totalItems) => {
    if(err) {
      res.send(err);
    } else {
      Product
      .find()
      .populate('form')
      .limit(itemsPerPage)
      .skip(skip)
      .exec(function (err, item) {
        if (err) {
          return res.status(404).json({
            message: 'No results',
            err: err
          })
        } else {
          Product
          .find()
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
    }

  })
})




// getting user forms to display them on front end
router.get('/:id', function (req, res, next) {
  Product
  .findById({_id: req.params.id})
  .populate('form')
  .populate('owner')
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
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

router.delete('/:id', function (req, res, next) {
  Product.findById((req.params.id), function (err, item) {
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
      });
    }


    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      });
    })
  });
});


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
      });
    }
    // checking if the owner of the form is correct
    if (form.owner != req.user._id.toString()) {
      return res.status(401).json({
        title: 'Not your form!',
        error: {message: 'Users do not match, not your form'}
      });
    }
    res.status(200).json({
      obj: form
    });
  });
});

module.exports = router;
