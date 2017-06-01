module.exports = {
  //'database': 'mongodb://localhost:27017/ng2_Form',

  // mongo ds145790.mlab.com:45790/saloon -u gooplus -p nkasndasdTY54TGa
  'database': 'mongodb://gooplus:nkasndasdTY54TGa@ds145790.mlab.com:45790/gooplus',
  //'database': 'mongodb://localhost:27017/gooplus',
  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'api_user': 'YOUR SENDGRID USERNAME',
  'api_key': 'YOUR SENDGRID PASSWORD',
  'jwtExpire': '72h', //set the jwtExpire in smaller period in production

  'optionsBatch' : {
    url: null,
    store: 'default', //set a store to contextualise in
    authentication: {
      // login: {
      //   type: 'admin',
      //   username: 'gooplus',
      //   password: 'Gooplus123'
      // },
      integration: {
        consumer_key: 'fnegvd8shdkhln98ewqtgteiagdaodnf',
        consumer_secret: 'ad4iyytaytcmpabx2q8xtwlm4wu1dvxj',
        access_token: 'mqky34othuojbsmuyrrywsi0tas8kdcf',
        access_token_secret: '3ia5ugl5m44i2ff3amcatnux2ugiy9v6'
      }
    }
  },
  'urlServerMagento' : 'http://52.2.61.43/'

};
