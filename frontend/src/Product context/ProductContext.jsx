import { createContext, useState, useEffect } from "react";
import API from "../api"; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchFilterProduct, setSearchFilterProduct] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch Products (only from MongoDB)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch Cart from DB
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setCart([]);
        return;
      }
      try {
        const res = await API.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };
    fetchCart();
  }, [token]);

  // ✅ Get productId (MongoDB always)
  const getProductId = (productOrId) => {
    if (!productOrId) return null;
    if (typeof productOrId === "string") return productOrId;
    return productOrId._id; // Always MongoDB _id
  };

  // ✅ Add to Cart
  const addToCart = async (product, quantity = 1) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    const productId = getProductId(product);
    if (!productId) {
      console.error("Invalid productId", product);
      return;
    }

    try {
      const res = await API.post(
        "/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items);
      console.log("Added to cart:", productId, quantity);
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (product, qty) => {
    if (!token) {
      alert("Please login first!");
      return;
    }
    const productId = getProductId(product);
    try {
      const res = await API.post(
        "/cart/add",
        { productId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (product) => {
    if (!token) {
      alert("Please login first!");
      return;
    }
    const productId = getProductId(product);
    try {
      const res = await API.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  // ✅ Clear Cart
  const clearCart = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }
    try {
      const res = await API.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error clearing cart", err);
    }
  };

  // ✅ Search filter
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchFilterProduct.toLowerCase())
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        searchFilterProduct,
        setSearchFilterProduct,
        filteredProducts,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
