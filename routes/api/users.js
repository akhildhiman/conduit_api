var express = require('express');
var router = express.Router();
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var authToken = require("../modules/verifyToken");

console.log("inside");
console.log(authToken.verifyToken);

// Getting users saved in the database 
router.get('/', function(req, res, next) {
  User.find((err, users) => {
    res.json(users)
  })
});

// Welcome Route
router.post("/welcome", (req, res) => {
  console.log("inside welcome")
  res.send("Hi there")
})

// Creating an user, and saving in the database
router.post("/register", (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    console.log(user)
    if (err) console.log(err)
  })
})

// Login route
router.post("/login", (req, res) => {
  var email = req.body.email;
  User.findOne({email}, (err, user) => {
    console.log(user);

    // if (err) returconsole.log(err);
    if(!user) return "no"
    user.validatePassword(req.body.password);

    // Generate token for the user
    var token = jwt.sign({userId: user.id}, "secret"); //pass payload
    res.json({user, token});
  })
})

router.use(authToken.verifyToken);


// Delelte an user
router.delete("/delete", (req, res) => {
  User.findByIdAndDelete(req.userId, (err, user) => {
    console.log("inside ")
    if (err) return json(err);
    return res.json(user);
  })
})

// Get a single user
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.json(err);
    return res.json(user);
  })
})

// Update a single user
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => { //new true updates the user object, because by default, it returns the old object.
    if (err) return res.json(err);
    return res.json(user);
  })
})





module.exports = router;
