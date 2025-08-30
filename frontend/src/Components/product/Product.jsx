import { NavLink } from "react-router-dom"
import { ProductContext } from "../../Product context/ProductContext"

export const Product = ({ product }) => {
  if (!product) return null

  return (
    <>
      <div className="product-card" key={product.id}>
        <img
          src={
            product.image?.startsWith("http")
              ? product.image // already a full URL (fake store API)
              : `http://localhost:5000/uploads/${product.image}` //  backend image
          }
          alt={product.title}
          style={{ width: "200px" }}
        />



        <h3>
          {product.title.length >= 19 ? `${product.title.slice(0, 18)}...` : product.title}
        </h3>

        <p className="price">${product.price || "19.99"}</p>

        <div className="btn">
          <NavLink to={`/products/${product.id || product._id}`} className="detail-btn">
            View Details
          </NavLink>
          {/* <button className="addToCart" onClick={() => addToCart(product)}>🛒</button> */}
        </div>
      </div>
    </>
  )
}
