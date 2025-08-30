import { useContext, useState } from "react";
import { ProductContext } from "../../Product context/ProductContext";
import { Product } from "./Product";
import "./ProductDetails.css";

export const Products = () => {
  const { loading, filteredProducts } = useContext(ProductContext);
  const [selectCategory, setSelectCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const Categories = ["All", "Electronics", "Clothing", "jewelery", "Books"];
  const productPerPage = 12;

  // Apply category filter on top of search filter
  const categoryFilteredProducts =
    selectCategory === "All"
      ? filteredProducts
      : filteredProducts.filter((pro) =>
          pro.category.toLowerCase().includes(selectCategory.toLowerCase())
        );

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = categoryFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(categoryFilteredProducts.length / productPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="all-products">
        <h2>All Products</h2>
      </div>
      <div className="products-page">
        {/* Left Sidebar: Categories */}
        <aside className="category-sidebar">
          <h3>Categories</h3>
          <ul>
            {Categories.map((cat) => (
              <li
                key={cat}
                className={selectCategory === cat ? "active-category" : ""}
                onClick={() => {
                  setSelectCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Content: Products */}
        <section className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`page-btn ${
                currentPage === idx + 1 ? "active" : ""
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
