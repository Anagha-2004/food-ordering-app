const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders - save a new order
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const newOrder = new Order({
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

module.exports = router;
