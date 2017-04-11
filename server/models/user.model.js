var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var user = new Schema({
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    notes: [{
      text: String,
      dateNote: Date
    }],
    resetPasswordToken: String,
    resetPasswordExpires: String,
    profilePic: String,
    lastVisit: Date,
    // you might want more user roles, so an array would be fine
    role: {type: Array, default: ['user']},
    profile : {
      name: String,
      hair : {
        hairDensity : String,
        hairPorosity : String,
        hairTexture : String,
      }
    }

  },
  {
    timestamps: true
  });

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);
