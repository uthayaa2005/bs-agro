import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [prevPage, setPrevPage] = useState("home");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const goPage = (page) => {
    setPrevPage(currentPage);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const filterProducts = (cat) => {
    setActiveFilter(cat);
    goPage("products");
  };

  const openProduct = (id) => {
    setSelectedProduct(id);
    goPage("product-detail");
  };

  const goBack = () => {
    goPage("products");
  };

  return (
    <div className="min-h-screen bg-cr font-dm text-tx overflow-x-hidden">
      <Navbar currentPage={currentPage} goPage={goPage} />
      <Ticker />

      {/* Pages */}
      <div key={currentPage}>
        {currentPage === "home" && (
          <HomePage
            goPage={goPage}
            filterProducts={filterProducts}
            openProduct={openProduct}
          />
        )}
        {currentPage === "products" && (
          <ProductsPage
            openProduct={openProduct}
            initialFilter={activeFilter}
          />
        )}
        {currentPage === "product-detail" && (
          <ProductDetailPage
            productId={selectedProduct}
            goBack={goBack}
            openProduct={openProduct}
            goPage={goPage}
          />
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "reviews" && <ReviewsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>
    </div>
  );
}
