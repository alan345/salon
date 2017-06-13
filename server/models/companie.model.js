var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var companie = new Schema({
  //  _id: String,
    address:{
      address : {type: String, default: ['']},
      city : {type: String, default: ['']},
      state : {type: String, default: ['']},
      zip : {type: String, default: ['']},
    },
    phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    typeCompanie: {type: String, default: ['salon']},
    _users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    magento: {
      id: {type: String, unique: true, required: true},
      group_id: {type: Number},
      created_at: {type: Date},
      updated_at: {type: Date},
      created_in: {type: String},
      email: {type: String},
      firstname: {type: String},
      lastname: {type: String},
      gender: {type: Number},
      store_id: {type: Number},
      website_id: {type: Number},
      addresses: [{
        id: {type: String},
        customer_id: {type: String},
        region: {
          region_code: {type: String},
          region: {type: String},
          region_id: {type: Number}

        },
        region_id: {type: Number},
        country_id: {type: String},
        street: [{type: String}],
        telephone: {type: String},
        postcode: {type: String},
        city: {type: String},
        firstname: {type: String},
        lastname: {type: String}
      }

      ]
    }


  },
  {
    timestamps: true
  });

companie.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Companie', companie);
