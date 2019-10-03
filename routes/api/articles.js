var express = require('express');
var router = express.Router();
var User = require("../models/User");
var Article = require("../models/Articles")
var jwt = require("jsonwebtoken");
var authToken = require("../modules/verifyToken");


// Read a single article
router.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.find({slug}, (err, article) => {
        if (err) return res.status("401").json(err);
        return res.status("201").json(article);
    })
})