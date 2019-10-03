var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var URLSlug = require('mongoose-url-slugs');

var articleSchema = new Schema({
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
        type: [Schema.Types.ObjectId], //array of comments, because it can be more than one
        ref: "User" // whose id is this
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favorites: {
        type: [Schema.Types.ObjectId], //array of favorites, because it can be more than one
        ref: "User"
    }
})



// Pre save hook
articleSchema.pre("save", function(next) {
    this.slug = this.title.split(" ").join("-");
    next();
})

articleSchema.plugin(URLSlug("title", {field: "slug"})); //slug uniquely identifes an article
var Article = mongoose.model("Article", articleSchema);

module.exports = Article;