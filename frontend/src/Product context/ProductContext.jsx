// ProductContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "../api"; // axios instance

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchFilterProduct, setSearchFilterProduct] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fakeRes = await fetch("https://fakestoreapi.com/products");
        const fakeData = await fakeRes.json();

        const customRes = await API.get("/products");
        const customData = customRes.data;

        const combined = [...fakeData, ...customData];
        setProducts(combined);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchFilterProduct.toLowerCase())
  );

  // ✅ Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

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

