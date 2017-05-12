module.exports = {
  //'database': 'mongodb://localhost:27017/ng2_Form',

  // mongo ds145790.mlab.com:45790/saloon -u gooplus -p nkasndasdTY54TGa
  'database': 'mongodb://gooplus:nkasndasdTY54TGa@ds145790.mlab.com:45790/gooplus',
  //'database': 'mongodb://localhost:27017/gooplus',
  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'api_user': 'YOUR SENDGRID USERNAME',
  'api_key': 'YOUR SENDGRID PASSWORD',
  'jwtExpire': '72h' //set the jwtExpire in smaller period in production
};
