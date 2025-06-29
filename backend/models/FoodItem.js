const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
