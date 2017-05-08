// Requires Mongoose
var mongoose = require("mongoose");

// Schema class.

var Schema = mongoose.Schema;

// Creates Schema.

var ArticleSchema = new Schema({
  // Both of these are required.
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create and export model with schema.
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;