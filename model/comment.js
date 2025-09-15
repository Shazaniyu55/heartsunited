// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
   
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    // If you want to associate comments with posts/articles:
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // change to your Post/Article model
      required: false,
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Comment", commentSchema);
