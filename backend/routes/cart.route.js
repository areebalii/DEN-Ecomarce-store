import express from "express";
import Cart from "../models/cart.model.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

//  Add to cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity) || 1;
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) || 1 });
    }

    await cart.save();
    await cart.populate("items.product"); // ✅ return with product details
    res.json(cart);
  } catch (err) {
    console.error("❌ Error in /add:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// 🛒 Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product"); // ✅ add populate

    res.json(cart || { user: req.user.id, items: [] });
  } catch (err) {
    console.error("❌ Error in /:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✏️ Update quantity
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    console.error("❌ Error in /update:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ❌ Remove item
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    console.error("❌ Error in /remove:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🧹 Clear cart
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error in /clear:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
