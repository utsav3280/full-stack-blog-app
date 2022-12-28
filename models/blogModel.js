const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    userId: { type: ObjectId, ref: "User" },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    author: { type: String }
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;