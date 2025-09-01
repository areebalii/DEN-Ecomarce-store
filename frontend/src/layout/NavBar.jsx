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
  const [menuOpen, setMenuOpen] = useState(false); // 👈 mobile menu toggle

  useEffect(() => {
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.name) {
          setUserName(storedUser.name);
        } else {
          setUserName("User");
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setUserName("User");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          E-Store
        </NavLink>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Search Box (hidden on very small screens) */}
        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchFilterProduct}
            onChange={(e) => setSearchFilterProduct(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/products");
                setMenuOpen(false);
              }
            }}
          />
          <button type="submit" onClick={() => navigate("/products")}>
            <i className="fas fa-search"></i>
          </button>

          {searchFilterProduct && (
            <div className="search-suggestions">
              {filteredProducts.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/products/${item._id}`);
                    setSearchFilterProduct("");
                    setMenuOpen(false);
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
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/products" className="nav-item" onClick={() => setMenuOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/contact" className="nav-item" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/cart" className="nav-item cart" onClick={() => setMenuOpen(false)}>
            🛒
          </NavLink>

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
                  <NavLink
                    to="/add-product"
                    className="dropdown-item add-product"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    ➕ Add Product
                  </NavLink>
                  <button
                    className="dropdown-item logout"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="nav-item" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item" onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
