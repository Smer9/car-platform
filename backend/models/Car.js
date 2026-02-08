const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
    price: Number,
    type: {
      type: String,
      enum: ["rent", "sale"]
    },
    image: String,
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
