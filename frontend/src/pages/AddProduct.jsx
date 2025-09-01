import React, { useState, useContext } from "react";
import { ProductContext } from "../Product context/ProductContext";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // ✅ add category state
  const [image, setImage] = useState(null);

  const { setProducts } = useContext(ProductContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category); // ✅ send category
    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setProducts((prev) => [...prev, data]);
      alert("Product added successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory(""); // ✅ reset category
      setImage(null);
    } else {
      alert(data.message || "Failed to add product");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Product description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* ✅ Category input */}
        <input
          type="text"
          placeholder="Product category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
