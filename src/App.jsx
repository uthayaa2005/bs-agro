import React, { useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import WhatsAppFloat from "./components/WhatsAppFloat";
import TrustStrip from "./components/TrustStrip";
import MobileBottomBar from "./components/MobileBottomBar";
import StructuredData from "./components/StructuredData";
import { products } from "./data/data";
import { migrateHashToPath, parsePath, pathFor } from "./utils/historyNav";
import { applyPageSeo } from "./utils/seo";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const routeRef = useRef({ page: "home", productId: null, filter: "All" });

  const applyRoute = useCallback((route) => {
    const prev = routeRef.current;
    const pageChanged = prev.page !== route.page;
    const productChanged = prev.productId !== route.productId;

    setCurrentPage(route.page);
    setSelectedProduct(route.productId);
    setActiveFilter(route.filter);

    if (pageChanged || productChanged) {
      window.scrollTo(0, 0);
    }

    routeRef.current = route;
  }, []);

  useEffect(() => {
    const fromHash = migrateHashToPath();
    const initial = fromHash || parsePath();
    applyRoute(initial);
    window.history.replaceState(initial, "", pathFor(initial));

    const onPopState = (event) => {
      const route = event.state || parsePath();
      applyRoute(route);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [applyRoute]);

  useEffect(() => {
    const product =
      currentPage === "product-detail" && selectedProduct
        ? products.find((p) => p.id === selectedProduct)
        : null;
    applyPageSeo({
      page: currentPage,
      product,
      filter: activeFilter,
    });
  }, [currentPage, selectedProduct, activeFilter]);

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
    window.history.pushState(route, "", pathFor(route));
  };

  const goPage = (page) => {
    const filter = page === "products" ? "All" : undefined;
    navigate(page, filter !== undefined ? { filter } : {});
  };

  const filterProducts = (cat) => {
    navigate("products", { filter: cat });
  };

  const updateProductsFilter = useCallback((cat) => {
    const route = { page: "products", productId: null, filter: cat };
    setActiveFilter(cat);
    routeRef.current = route;
    window.history.replaceState(route, "", pathFor(route));
  }, []);

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
      <StructuredData
        page={currentPage}
        product={
          currentPage === "product-detail" && selectedProduct
            ? products.find((p) => p.id === selectedProduct)
            : null
        }
      />
      <Navbar currentPage={currentPage} goPage={goPage} />
      <TrustStrip />
      <Ticker />

      <div
        key={currentPage}
        className="pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
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
            onFilterChange={updateProductsFilter}
          />
        )}
        {currentPage === "product-detail" && selectedProduct && (
          <ProductDetailPage
            productId={selectedProduct}
            goBack={goBack}
            openProduct={openProduct}
          />
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "reviews" && <ReviewsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      {(currentPage === "home" || currentPage === "products") && (
        <WhatsAppFloat />
      )}

      <MobileBottomBar currentPage={currentPage} goPage={goPage} />
    </div>
  );
}
