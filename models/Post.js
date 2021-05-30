const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    postedBy:{
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = Post = mongoose.model("posts",PostSchema)