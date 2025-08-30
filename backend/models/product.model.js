// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

export default mongoose.model("Product", productSchema);
