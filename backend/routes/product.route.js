import express from "express";
import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Middleware: check auth
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const rawToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(400).json({ msg: "Invalid token" });
  }
};

// multer logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Upload new product (protected)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category, count } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate: (Math.random() * 5).toFixed(1), // random rating 0-5
        count: count || Math.floor(Math.random() * 200), // use given count or random
      },
      createdBy: req.user,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding product" });
  }
});

export default router;
