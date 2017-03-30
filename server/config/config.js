module.exports = {
  //'database': 'mongodb://localhost:27017/ng2_Form',
  'database': 'mongodb://gooplus:LrrpmFpiVe4lVJAS1SO3Q06cR0aWa2zAfM4MkOiDZqVt9UkN97lQze2kfTebQMKJGBEnEgS1JksWrNQaB0X5C8gmBL2Lwv0E@ds145800.mlab.com:45800/saloon', //'mongodb://localhost:27017/ng2_Form',
  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'api_user': 'YOUR SENDGRID USERNAME',
  'api_key': 'YOUR SENDGRID PASSWORD',
  'jwtExpire': '72h' //set the jwtExpire in smaller period in production
};
