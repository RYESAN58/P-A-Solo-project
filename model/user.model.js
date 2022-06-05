const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const USerSchema = new mongoose.Schema({
	FirstName: {
	type: String,
	required: [true, 'Must have a Firstname'],
	minLength: [3, 'Must be more than 2 characters!'],
},
	LastName: {
		type: String,
		required: [true, "Must have a Last Name" ],
    minLength: [3, 'Must be more than 2 characters!']
	},
  email: {
    type: String,
    required: [true, 'Must Add an Email'],
    validate: {
      validator: (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
      message: "Please Enter Valid email"
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [8, "Password must be 8 characters or longer"]
  }
}, {timestamps : true})

USerSchema.virtual('confirmPassword')
  .get(() => this.confirmPassword)
  .set((value) => {
    this.confirmPassword = value;
  });


USerSchema.pre(('validate'), function (next) {
  if (this.password !== this.confirmPassword){
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

USerSchema.pre('save', function (next){
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash; 
      next();
    })
    .catch((err) => {
      console.log("error saving hash")
      console.log(err)
    })
  });


module.exports = mongoose.model("User", USerSchema)