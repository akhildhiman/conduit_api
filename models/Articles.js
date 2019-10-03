var mongoose = require("mongoose");
var URLSlug = require('mongoose-url-slugs');

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    commentsId: {
        type: [Schema.Types.ObjectId], //array of comments
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favorites: {
        type: Schema.Types.ObjectId,
    }
})

articleSchema.plugin(URLSlug("title", {field: Slug})); //slug uniquely identifes an article

var Article = mongoose.model("Article, articleSchema");

module.exports = Article;