
var express = require('express'),
    config = require('../config/config'),
    ProductBatch    = require('../models/productBatch.model'),
    Companie    = require('../models/companie.model');


const Magento2 = require('node-magento2');
var schedule = require('node-schedule');


    var jobScedule = function() {
      var j = schedule.scheduleJob('* */5 * * *', function(){
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
      console.log('starting productBatch..')
      var dateBegin = new Date()

      //mageClient.customers.get({
      //mageClient.catalog.companie.get({
      // mageClient.get('/V1/customers/3',{
      //mageClient.get('/V1/companies',{
      //mageClient.get('/V1/customerGroups/47',{
      mageClient.get('/V1/customers/search',{
        search_criteria: '*',
        // fields: {
        //   items: [ "sku" ]
        // }
      })
      .catch(err => { writeLog('error1',  dateBegin, 0,0,0,0,0,0) })
      .then(response => {
        console.log('res')
        console.log(response)
        console.log('res')
        // var nbCompaniesCreated=0
        // var nbCompaniesNotCreated=0
        // var nbCompaniesUpdated=0
        // var nbCompaniesNotUpdated=0
        // var itemsProcessed = 0;
        var logObj = {
          'dateBegin' : new Date(),
          'dateEnd': '',
          'status' : '',
          'total_count' : response.total_count,
          'total_item_treated' : response.items.length,
          'nbCompaniesCreated' : 0,
          'nbCompaniesUpdated' : 0,
          'nbCompaniesNotCreated' : 0,
          'nbCompaniesNotUpdated' : 0,
        }
        let companies = response.items
        companies.forEach((companieMagento , index, array) => {
          console.log('treating companie.. ' + index)
          Companie
          .findOne(
            {
              'magento.id': companieMagento.id
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
                 var companie = new Companie({
                   magento: companieMagento
                 })
                companie.save(function (err, result) {
                  if (err) {
                    logObj.nbCompaniesNotCreated++;
                    logObj.itemsProcessed++;
                    if(itemsProcessed === array.length) {
                      logObj.status = 'error'
                      writeLog(logObj)
                    }
                      // writeLog('error', dateBegin, AA response.total_count, companies.length, nbCompaniesCreated, nbCompaniesUpdated, nbCompaniesNotCreated, nbCompaniesNotUpdated)
                  } else {
                    logObj.nbCompaniesCreated++
                    logObj.itemsProcessed++;
                    if(itemsProcessed === array.length) {
                      logObj.status = 'ok'
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
                  logObj.nbCompaniesNotUpdated++
                  logObj.itemsProcessed++;
                  if(itemsProcessed === array.length) {
                    logObj.status = 'error'
                    writeLog(logObj)
                  }
                    // writeLog('error',  dateBegin, response.total_count, companies.length, nbCompaniesCreated, nbCompaniesUpdated, nbCompaniesNotCreated, nbCompaniesNotUpdated)
                } else {

                  logObj.nbCompaniesUpdated++
                  logObj.itemsProcessed++;
                  if(itemsProcessed === array.length) {
                    logObj.status = 'ok'
                    writeLog(logObj)
                  }
                    //writeLog('ok',  dateBegin, response.total_count, companies.length, nbCompaniesCreated, nbCompaniesUpdated, nbCompaniesNotCreated, nbCompaniesNotUpdated)
                }
              })
            }
          })
        })
      });
    }
    exports.updateFromMagentoToBdd = updateFromMagentoToBdd;

    function writeLog(logObj) {
        logObj.dateEnd = new Date()
        // let logObj = {
        //   'dateBegin' :  dateBegin,
        //   'dateEnd': new Date(),
        //   'status' : status,
        //   'total_count' : total_count,
        //   'total_item_treated' : total_item_treated,
        //   'nbCompaniesCreated' : nbCompaniesCreated,
        //   'nbCompaniesUpdated' : nbCompaniesUpdated,
        //   'nbCompaniesNotCreated' : nbCompaniesNotCreated,
        //   'nbCompaniesNotUpdated' : nbCompaniesNotUpdated,
        // }

          var productBatch = new ProductBatch(logObj)
          console.log(productBatch)
          productBatch.save(function (err, result) {
            if (err) {
              console.log('Error')
              console.log(err)
            }
            console.log('Ok')
            console.log(result)
          })






      //
      //
      // console.log(logObj)
      // var fs = require('fs');
      // fs.appendFileSync('server/log/magentoToDB.txt', '\n' + JSON.stringify(logObj));
    }
