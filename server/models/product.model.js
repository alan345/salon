var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var product = new Schema({
    bdd:{
      perso: {type: String, default: ['']},
    },
    magento: {
      id: {type: String, unique: true, required: true},
      sku: {type: String, unique: true, required: true},
      name: {type: String},
      price: {type: Number},
      weight:{type: String},
      custom_attributes:[{
        attribute_code : {type: String},
        value : {type: String},
      }]
    }
  },
  {
    timestamps: true
  });

product.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Product', product);
