
var express = require('express'),
    config = require('../config/config'),
    ProductBatch    = require('../models/productBatch.model'),
    Product    = require('../models/product.model');


const Magento2 = require('node-magento2');
var schedule = require('node-schedule');


    var jobScedule = function() {
      var j = schedule.scheduleJob('* */5 * * *', function(){
        console.log('BatchProductScheduled')
        updateFromMagentoToBdd()
      });
    }
    exports.jobScedule = jobScedule;


    const optionsBatch = config.optionsBatch
    // const optionsBatch = {
    //   url: null,
    //   store: 'default', //set a store to contextualise in
    //   authentication: {
    //     login: {
    //       type: 'admin',
    //       username: 'gooplus',
    //       password: 'Gooplus123'
    //     },
    //     integration: {
    //       consumer_key: 'ieu6lhumh4kxfmc0df6wax3e1p5fsbjy',
    //       consumer_secret: '4jywk7kygkc0aqwl6wrlcs8ntnoavqyr',
    //       access_token: '1b2f3hojr2mdio0exhtj3d116fft8qde',
    //       access_token_secret: 'v2cd0wqqwe4i0tkd08x99tnjvncj9dwo'
    //     }
    //   }
    // }
    //const mageClient = new Magento2('http://52.2.61.43/', optionsBatch)

    const mageClient = new Magento2(config.urlServerMagento, optionsBatch)
    mageClient.init();





    function updateFromMagentoToBdd() {

      var logObj = {
        'type' : 'product',
        'dateBegin' : new Date(),
        'dateEnd': '',
        'status' : '',
        'total_count' : 0,
        'total_item_treated' : 0,
        'nbProductsCreated' : 0,
        'nbProductsUpdated' : 0,
        'nbProductsNotCreated' : 0,
        'nbProductsNotUpdated' : 0,
      }

      console.log('starting productBatch..')
      var dateBegin = new Date()

      //mageClient.customers.get({
      //mageClient.catalog.product.get({
      // mageClient.get('/V1/customers/3',{
      mageClient.get('/V1/products',{
        search_criteria: '*',
      })
      .catch(err => {
        logObj.status = 'error_connexion_Magento'
        writeLog(logObj)
      })
      .then(response => {
        var itemsProcessed = 0
        logObj.total_count = response.total_count
        logObj.total_item_treated = response.items.length

        let products = response.items
        products.forEach((productMagento, index, array) => {
          console.log('treating product.. ' + index)
          Product
          .findOne(
            {
              'magento.id': productMagento.id
            }
          )
          .exec(function (err, item) {
            if (err) {
              logObj.status = 'not reach  product element'
              writeLog(logObj)
            }
            if (!item) {
                 var product = new Product({
                   magento: productMagento
                 })
                product.save(function (err, result) {
                  if (err) {
                    logObj.nbProductsNotCreated++
                    itemsProcessed++
                    if(itemsProcessed === array.length) {
                      logObj.status = 'error_2'
                      writeLog(logObj)
                    }
                  } else {
                    logObj.nbProductsCreated++
                    itemsProcessed++
                    if(itemsProcessed === array.length) {
                      logObj.status = 'ok'
                      writeLog(logObj)
                    }
                  }
                })
            } else {
              // update
              for (var prop in productMagento) {
                if(prop !== '__v' && prop !== 'updatedAt' && prop !== 'createdAt')
                  item['magento'][prop] = productMagento[prop]
              }
              item.save(function (err, result) {
                if (err) {
                  console.log(err)
                  logObj.nbProductsNotUpdated++
                  itemsProcessed++

                  if(itemsProcessed === array.length) {
                    logObj.status = 'error_1'
                    writeLog(logObj)
                  }
                } else {
                  logObj.nbProductsUpdated++
                  itemsProcessed++
                  if(itemsProcessed === array.length) {
                    logObj.status = 'ok'
                    writeLog(logObj)
                  }
                }
              })
            }
          })
        })
      })
    }
    exports.updateFromMagentoToBdd = updateFromMagentoToBdd

    function writeLog(logObj) {
        logObj.dateEnd = new Date()
          var productBatch = new ProductBatch(logObj)
          productBatch.save(function (err, result) {
            if (err) {
              console.log('Error')
              console.log(err)
            }
            console.log('Ok')
            console.log(result)
          })

    }
