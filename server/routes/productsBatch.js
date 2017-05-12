
var express = require('express'),
    Product    = require('../models/product.model');
const Magento2 = require('node-magento2');
var schedule = require('node-schedule');



    var jobScedule = function() {
      var j = schedule.scheduleJob('20 * * * *', function(){
        console.log('BatchProductScheduled')
        updateFromMagentoToBdd()
      });
    }
    exports.jobScedule = jobScedule;



    const optionsBatch = {
      url: null,
      store: 'default', //set a store to contextualise in
      authentication: {
        login: {
          type: 'admin',
          username: 'gooplus',
          password: 'Gooplus123'
        },
        integration: {
          consumer_key: 'ieu6lhumh4kxfmc0df6wax3e1p5fsbjy',
          consumer_secret: '4jywk7kygkc0aqwl6wrlcs8ntnoavqyr',
          access_token: '1b2f3hojr2mdio0exhtj3d116fft8qde',
          access_token_secret: 'v2cd0wqqwe4i0tkd08x99tnjvncj9dwo'
        }
      }
    }
    const mageClient = new Magento2('http://52.2.61.43/', optionsBatch)
    mageClient.init();


    function updateFromMagentoToBdd() {
      mageClient.catalog.product.get({
        search_criteria: {
          filter_groups: [{filters: [
            //   {
            //   // field: "price", value: 10, condition_type: "lt"
            //   field: "name",
            //   value: '%',
            //   condition_type: "like"
            // }
          ]}],
          "current_page": 1,
          "page_size": 10000
        },
        // fields: {
        //   items: [ "sku" ]
        // }
      })
      .catch(err => { writeLog('error1',0,0,0,0,0,0) })
      .then(response => {
          var nbProductsCreadted=0
          var nbProductsNotCreadted=0
          var nbProductsUpdated=0
          var nbProductsNotUpdated=0
          var itemsProcessed = 0;
          let products = response.items
          products.forEach((productMagento , index, array) => {
              Product
              .findOne(
                {
                  'magento.id': productMagento.id
                }
              )
              .exec(function (err, item) {
                if (err) {
                  return res.status(403).json({
                    title: 'There was a problem',
                    error: err
                  });
                }
                if (!item) {
                     var product = new Product({
                       magento: productMagento
                     })
                    product.save(function (err, result) {
                      if (err) {
                        nbProductsNotCreadted++;
                        itemsProcessed++;
                        if(itemsProcessed === array.length)
                          writeLog('error', response.total_count, products.length, nbProductsCreadted, nbProductsUpdated, nbProductsNotCreadted, nbProductsNotUpdated)
                      } else {
                        nbProductsCreadted++
                        itemsProcessed++;
                        if(itemsProcessed === array.length)
                          writeLog('ok', response.total_count, products.length, nbProductsCreadted, nbProductsUpdated, nbProductsNotCreadted, nbProductsNotUpdated)
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
                      nbProductsNotUpdated++
                      itemsProcessed++;
                      if(itemsProcessed === array.length)
                        writeLog('error', response.total_count, products.length, nbProductsCreadted, nbProductsUpdated, nbProductsNotCreadted, nbProductsNotUpdated)
                    } else {

                      nbProductsUpdated++
                      itemsProcessed++;
                      if(itemsProcessed === array.length)
                        writeLog('ok', response.total_count, products.length, nbProductsCreadted, nbProductsUpdated, nbProductsNotCreadted, nbProductsNotUpdated)
                    }
                  })
                }
              })
          })



        });
    }


    function writeLog(
      status,
      total_count,
      total_item_treated,
      nbProductsCreadted,
      nbProductsUpdated,
      nbProductsNotCreadted,
      nbProductsNotUpdated) {

      let logObj = {
        'date': new Date(),
        'status' : status,
        'total_count' : total_count,
        'total_item_treated' : total_item_treated,
        'nbProductsCreadted' : nbProductsCreadted,
        'nbProductsUpdated' : nbProductsUpdated,
        'nbProductsNotCreadted' : nbProductsNotCreadted,
        'nbProductsNotUpdated' : nbProductsNotUpdated,
      }
      var fs = require('fs');
      fs.appendFileSync('server/log/magentoToDB.txt', '\n' + JSON.stringify(logObj));
    }
