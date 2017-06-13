
var express = require('express'),
    config = require('../config/config'),
    ProductBatch    = require('../models/productBatch.model'),
    Companie    = require('../models/companie.model');


const Magento2 = require('node-magento2');
var schedule = require('node-schedule');


    var jobScedule = function() {
      var j = schedule.scheduleJob('* * 10 * * *', function(){
        console.log('BatchCompanieScheduled')
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
        'type' : 'companie',
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


      console.log('starting companieBatch..')
      var dateBegin = new Date()

      //mageClient.customers.get({
      //mageClient.catalog.companie.get({
      // mageClient.get('/V1/customers/3',{
      //mageClient.get('/V1/companies',{
      //mageClient.get('/V1/customerGroups/47',{
      mageClient.get('/V1/customers/search',{
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

        let companies = response.items
        companies.forEach((companieMagento, index, array) => {
          console.log('treating companie.. ' + index)
          Companie
          .findOne(
            {
              'magento.id': companieMagento.id
            }
          )
          .exec(function (err, item) {
            if (err) {
              logObj.status = 'not reach  companie element'
              writeLog(logObj)
            }
            if (!item) {
                 var companie = new Companie({
                   magento: companieMagento
                 })
                companie.save(function (err, result) {
                  if (err) {
                    logObj.nbProductsNotCreated++
                    itemsProcessed++
                    logObj.status = err
                    if(itemsProcessed === array.length) {

                      writeLog(logObj)
                    }
                  } else {
                    logObj.nbProductsCreated++
                    itemsProcessed++
                    if(itemsProcessed === array.length) {
                      //logObj.status = 'ok'
                      writeLog(logObj)
                    }
                  }
                })
            } else {
              // update
              for (var prop in companieMagento) {
                if(prop !== '__v' && prop !== 'updatedAt' && prop !== 'createdAt')
                  item['magento'][prop] = companieMagento[prop]
              }
              item.save(function (err, result) {
                if (err) {
                  //console.log(err)
                  logObj.nbProductsNotUpdated++
                  itemsProcessed++
                  logObj.status = err
                  if(itemsProcessed === array.length) {
                    //logObj.status = 'error_1'
                    writeLog(logObj)
                  }
                } else {
                  logObj.nbProductsUpdated++
                  itemsProcessed++
                  if(itemsProcessed === array.length) {
                    //logObj.status = 'ok'
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
          if(!logObj.status)
            logObj.status = 'ok'
          logObj.dateEnd = new Date()
          var productBatch = new ProductBatch(logObj)
          productBatch.save(function (err, result) {
            if (err) {
              //console.log('Error')
              //console.log(err)
            }
            //console.log('Ok')
            //console.log(result)
          })

    }
