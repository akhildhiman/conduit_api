var mongoose = require("mongoose");
var bcrypt = require("bcrypt");


var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})


// Hashing the password
userSchema.pre("save", function(next) {
    console.log(this.password);
    this.password = bcrypt.hashSync(this.password, 10)
    console.log(this.password);
    next();
})

// Validate the password
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


// Creating the User model
var User = mongoose.model("User", userSchema); // create User model at the bottom




module.exports = User;