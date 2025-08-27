import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../Product context/ProductContext";
import "./Navbar.css";

export const NavBar = () => {
  const { searchFilterProduct, setSearchFilterProduct, filteredProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          E-Store
        </NavLink>

        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchFilterProduct}
            onChange={(e) => setSearchFilterProduct(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/products");
              }
            }}
          />
          <button type="submit" onClick={() => navigate("/products")}>
            <i className="fas fa-search"></i>
          </button>

          {/* 🔎 Search Suggestions */}
          {searchFilterProduct && (
            <div className="search-suggestions">
              {filteredProducts.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                    setSearchFilterProduct("");
                  }}
                >
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="no-results">No products found</div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/products" className="nav-item">Products</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/cart" className="nav-item cart">🛒</NavLink>
        </div>
      </div>
    </nav>
  );
};
