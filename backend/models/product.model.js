import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // keep the original FakeStore ID
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
