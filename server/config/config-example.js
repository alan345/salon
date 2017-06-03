module.exports = {
  'database': 'mongodb://localhost:27017/gooplus',

  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'userGmail': 'mailGmail@mailGmail.com',
  'passGmail': 'passGmail',
  'jwtExpire': '72h', //set the jwtExpire in smaller period in production
  'optionsBatch' : {
    url: null,
    store: 'default', //set a store to contextualise in
    authentication: {
      integration: {
        consumer_key: 'magento',
        consumer_secret: 'magento',
        access_token: 'magento',
        access_token_secret: 'magento'
      }
    }
  },
  'urlServerMagento' : 'URLMAGENTO'
};
