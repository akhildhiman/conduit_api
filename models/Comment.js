var mongoose = require("mongoose");
var URLSlug = require('mongoose-url-slugs');


var commentSchema = new mongoose.Schema({
    articleId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

commentSchema.plugin(URLSlug("title", {field: "slug"}));

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;



