var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var social = new Schema({
    name: {type: String},
    date : {
      dateBegin: String,
      dateEnd: String,
    },
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    form: {type: Schema.Types.ObjectId, ref: 'Form'},

  },
  {
    timestamps: true
  });

social.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Social', social);