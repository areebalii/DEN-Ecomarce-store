import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Product context/ProductContext";
import "./Navbar.css";

export const NavBar = () => {
  const { searchFilterProduct, setSearchFilterProduct, filteredProducts } =
    useContext(ProductContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user")); 
      if (storedUser?.name) {
        setUserName(storedUser.name); // ✅ real name
      } else {
        setUserName("User");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          E-Store
        </NavLink>

        {/* Search Box */}
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

          {/* Suggestions */}
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

        {/* Links */}
        <div className="navbar-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item">
            About
          </NavLink>
          <NavLink to="/products" className="nav-item">
            Products
          </NavLink>
          <NavLink to="/contact" className="nav-item">
            Contact
          </NavLink>
          <NavLink to="/cart" className="nav-item cart">
            🛒
          </NavLink>

          {/* If logged in */}
          {token ? (
            <div className="user-dropdown">
              <button
                className="nav-item user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {userName} ⬇
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <NavLink to="/add-product" className="dropdown-item add-product" onClick={() => setDropdownOpen(false)}>
                    ➕ Add Product
                  </NavLink>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    🚪 Logout
                  </button> 
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
