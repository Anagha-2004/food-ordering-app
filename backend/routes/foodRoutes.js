const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// Get all food items
router.get("/", async (req, res) => {
  const foods = await FoodItem.find();
  res.json(foods);
});

// Add a food item (Admin)
router.post("/", async (req, res) => {
  const newFood = new FoodItem(req.body);
  await newFood.save();
  res.json(newFood);
});

module.exports = router;
