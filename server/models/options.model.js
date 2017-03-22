var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var options = new Schema({
    design: {
      mainPage : {
        _imgLeft:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgRight:[{type: Schema.Types.ObjectId, ref: 'Form'}],
      }
    },
  }
);

options.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Options', options);
