module.exports = {
  //'database': 'mongodb://localhost:27017/ng2_Form',

  // mongo ds145790.mlab.com:45790/saloon -u gooplus -p nkasndasdTY54TGa
  'database': 'mongodb://gooplus:nkasndasdTY54TGa@ds145790.mlab.com:45790/gooplus',
//  'database': 'mongodb://localhost:27017/gooplus',
  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'api_user': 'YOUR SENDGRID USERNAME',
  'api_key': 'YOUR SENDGRID PASSWORD',
  'jwtExpire': '72h', //set the jwtExpire in smaller period in production

  'optionsBatch' : {
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

};
