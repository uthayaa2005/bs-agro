import React, { useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import { parseHash, hashFor } from "./utils/historyNav";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const applyRoute = useCallback((route) => {
    setCurrentPage(route.page);
    setSelectedProduct(route.productId);
    setActiveFilter(route.filter);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initial = parseHash();
    applyRoute(initial);
    window.history.replaceState(initial, "", hashFor(initial));

    const onPopState = (event) => {
      const route = event.state || parseHash();
      applyRoute(route);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [applyRoute]);

  const navigate = (page, options = {}) => {
    const route = {
      page,
      productId:
        options.productId !== undefined
          ? options.productId
          : page === "product-detail"
            ? selectedProduct
            : null,
      filter:
        options.filter !== undefined
          ? options.filter
          : page === "products"
            ? activeFilter
            : "All",
    };

    applyRoute(route);
    window.history.pushState(route, "", hashFor(route));
  };

  const goPage = (page) => {
    const filter = page === "products" ? "All" : undefined;
    navigate(page, filter !== undefined ? { filter } : {});
  };

  const filterProducts = (cat) => {
    navigate("products", { filter: cat });
  };

  const openProduct = (id) => {
    navigate("product-detail", { productId: id });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("products", { filter: activeFilter });
    }
  };

  return (
    <div className="min-h-screen bg-cr font-dm text-tx overflow-x-hidden">
      <Navbar currentPage={currentPage} goPage={goPage} />
      <Ticker />

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
        {currentPage === "product-detail" && selectedProduct && (
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
