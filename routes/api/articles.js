var express = require('express');
var router = express.Router();
var User = require("../../models/User");
var slug = require("mongoose-url-slugs");
var Article = require("../../models/Articles")
var jwt = require("jsonwebtoken");
var authToken = require("../../modules/verifyToken");





// // Read a single article
// router.get("/:slug", (req, res) => {
//     var slug = req.params.slug;
//     console.log("inside single article");
//     Article.find({slug}, (err, article) => {
//         if (err) return res.status("401").json(err);
//         return res.status("201").json(article);
//     })
// })


// Only logged in users can access the routes below
router.use(authToken.verifyToken);


// Get articles saved in the database
router.get("/", function(req, res) {
    Article.find((err, articles) => {
        console.log("inside get articles");
        if (err) return res.json({message: "No article"});
        return res.json(articles);
    })
});


// Create an article
router.post("/", (req, res) => {
    console.log("inside article")
    Article.create(req.body, (err, article) => {
        console.log(article);
        console.log(err);   
        if (err) return res.json({message: "Error while creating an article"})
        return res.json(article);
    });
});


// Delete the article
router.delete("/:slug", (req, res) => {
    var slug = req.params.slug;
    var loggedInUser = req.userId;
    Article.findOne({slug}, (err, article) => {
        console.log("inside delete article");
        if (err) return res.json({message:"error deleting an article"});
        // return res.json(article);
        if(!article) return res.json({message: "no article found to delete"})
        if (loggedInUser == article.userId) // if the user is a loggedin user
        console.log("inside delete article");
        Article.findOneAndDelete({slug}, (err, deletedArticle) => {
            console.log("inside delete article");
            if (err) console.log("error69");
            return res.json(deletedArticle);
        })
    })
})


module.exports = router;



