import express from "express";
import Product from "../models/product.model.js";
import multer from "multer";
import path from "path";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 📦 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ msg: "Error fetching products" });
  }
});

// ➕ Add new product (protected)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category, count } = req.body;
    const image = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    const product = new Product({
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate: (Math.random() * 5).toFixed(1),
        count: count || Math.floor(Math.random() * 200),
      },
      createdBy: req.user.id,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ msg: "Error adding product" });
  }
});

export default router;
