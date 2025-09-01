import mongoose from "mongoose";
import axios from "axios";
import Product from "./models/product.model.js"; 
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI
const seedProducts = async () => {
  try {
    // connect db
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ");

    // fetch fakestore products
    const { data } = await axios.get("https://fakestoreapi.com/products");

    // clear existing products (optional)
    await Product.deleteMany({});
    console.log("Old products cleared");

    // insert new ones
    await Product.insertMany(data);
    console.log("FakeStore products inserted ✅");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedProducts();
