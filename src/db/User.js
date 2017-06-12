var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;


var userSchema = new Schema({
	username: {
		type: String,
		required:true,
		unique:true
	},
	password: {
		type: String,
		required:true
	},
	email: {
		type: String, 
		required: true
	},
	name: {
		type: String
	},

  questionnaire:[{
    title: String,
    description: String,
    components:[String]
  }

  ]

});


userSchema.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, null, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
  	if(err)
  		console.log(err)
  	else{
  		console.log(isMatch);
         done(err, isMatch);
  	}
  });
};


var user = module.exports = mongoose.model('User', userSchema);