import { useContext } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../../Product context/ProductContext";
import { Product } from "../product/Product";

export const Home = () => {
  const { loading, products } = useContext(ProductContext);
  // console.log(products);
  let featured = products.slice(0, 4)
  let newArrivals = products.slice(15, 19)

  if (loading) { 
    return <div className="loading circle">
      <div className="loader"></div>
    </div>;
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <NavLink to="/products">
            <button className="btn-primary">
              Shop Now
            </button>
          </NavLink>
        </div>
        <div className="hero-image">
          <img src="https://websitedemos.net/custom-printing-04/wp-content/uploads/sites/222/2020/02/boy-t2.png" alt="Shopping" />
        </div>
      </section>

      {/* new Arrivals */}
      <section className="featured-products">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>


      {/* categories */}
      <section className="categories">
        <h2>BROWSE BY CATEGORY</h2>
        <div className="category-grid">
          <NavLink to="/category/men" className="category-card">
            <img src="https://mjshopco.vercel.app/assets/menClothing.jpg" alt="Men Clothing" />
            <strong>Men Clothing</strong>
          </NavLink>
          <NavLink to="/category/women" className="category-card">
            <img src="https://mjshopco.vercel.app/assets/womenClothing.jpg" alt="Women" />
            <strong>Women</strong>
          </NavLink>
          <NavLink to="/category/jewelry" className="category-card">
            <img src="https://mjshopco.vercel.app/assets/jewelry.jpg" alt="Jewelry" />
            <strong>Jewelry</strong>
          </NavLink>
          <NavLink to="/category/electronics" className="category-card">
            <img src="https://mjshopco.vercel.app/assets/electronics.jpg" alt="Electronics" />
            <strong>Electronics</strong>
          </NavLink>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Don't Miss Out!</h2>
        <p>Subscribe to get updates on the latest deals and new arrivals.</p>
        <NavLink to="/contact" className="btn-primary">Contact Us</NavLink>
      </section>
    </div>
  );
};
