const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // store image URL (Cloudinary, local path, etc.)
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    timePosted: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Blog", blogSchema);
