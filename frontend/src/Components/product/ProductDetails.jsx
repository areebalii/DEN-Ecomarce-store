import { NavLink, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Product context/ProductContext";
import "./ProductDetails.css"

export const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [Quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { loading, products, addToCart } = useContext(ProductContext);

  useEffect(() => {
    if (!loading) {
      const findProduct = products.find((item) => {
        return item.id == id || item._id == id;
      })
      setProduct(findProduct)
    }
  }, [id, loading, products]);

  if (loading || !product) {
    return <h1 className="loading">Loading...</h1>
  }
  if (!product && !loading) {
    <p>Product not found.</p>;
  }
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1) setQuantity(value)
  }

  const relatedProducts = products.filter((item) => {
    return item.category === product.category && item.id !== product.id
  }).slice(0, 8)



  return (
    <>
      <div className="product-detail">
        <img
          src={product.image.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`}
          alt={product.title}
          className="detail-image"
        />
        <div className="detail-info">
          <h2>{product.title}</h2>
          {/* Availability */}
          <p className={`availability ${product.rating.count > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.rating.count > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* description */}
          <p>{product.description}</p>
          <p className="rating">⭐ {product.rating.rate} / 5</p>

          {/* size */}
          {product.category && product.category.includes("clothing") && (
            <label>
              Size:
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>
          )}

          {/* quantity */}
          <label>
            Quantity:
            <input type="number" min="1" value={Quantity} onChange={handleQuantityChange} className="quantity" />
          </label>
          {/* price */}
          <p className="price">${product.price}</p>
          <button className="btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>

      {/* related products */}
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="related-grid">
          {relatedProducts.map((item) => (
            <div className="related-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</h4>
              <p>${item.price}</p>
              <NavLink to={`/products/${item.id}`} className="detail-btn">
                View Details
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* reviews */}
      <section className="reviews">
        <h3>Customer Reviews</h3>
        <div className="review-grid">
          <div className="review-card">
            <p className="review-text">"Absolutely loved the quality of the t-shirt. Fits perfectly and the material is top-notch!"</p>
            <p className="review-author">– Sarah M. ⭐⭐⭐⭐⭐</p>
          </div>
          <div className="review-card">
            <p className="review-text">"Fast delivery and great customer service. The print was just as I expected."</p>
            <p className="review-author">– James L. ⭐⭐⭐⭐☆</p>
          </div>
          <div className="review-card">
            <p className="review-text">"Nice design and color. I’ve already recommended it to friends!"</p>
            <p className="review-author">– Priya R. ⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </section>


    </>
  )
}