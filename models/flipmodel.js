const mongoose = require('mongoose');

// Define a schema for the blog using Mongoose
const flipSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  imgUrl: { type: String, required: true }, 
  location: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
});

// Export the model based on the schema
module.exports = mongoose.model('model', flipSchema);