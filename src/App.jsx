import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Hero from "./components/HeroSection";
import Headline from "./components/Headline";
import ProductGrid from "./components/ProductGrid";
import BrandStatement from "./components/BrandStatement";
import FeaturesBar from "./components/FeaturesBar";
import Phones from "./pages/Phones";
import Tablets from "./pages/Tablets";
import Laptops from "./pages/Laptops";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProductDetails from "./components/ProductDetails";
import { allProducts } from "./data/productsData";
import { useEffect } from "react";
import AOS from "aos";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Electro";

    if (path === "/home") {
      title = "Home - Electro";
    } else if (path === "/phones") {
      title = "Phones - Electro";
    } else if (path === "/tablets") {
      title = "Tablets - Electro";
    } else if (path === "/laptops") {
      title = "Laptops - Electro";
    } else if (path === "/contact") {
      title = "Contact - Electro";
    } else if (path.startsWith("/products/")) {
      const slug = decodeURIComponent(path.replace("/products/", ""));
      const product = allProducts.find((item) => item.slug === slug);
      title = product ? `${product.title} - Electro` : "Product - Electro";
    } else if (path === "/checkout") {
      title = "Checkout - Electro";
    } else if (path === "/") {
      title = "Electro";
    }

    document.title = title;
    AOS.refresh();
  }, [location]);

  return null;
}

function LandingPage() {
  return (
    <>
      <Hero />
      <Headline />
      <ProductGrid />
      <BrandStatement />
      <FeaturesBar />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <TitleManager />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/phones"
          element={
            <Layout>
              <Phones />
            </Layout>
          }
        />
        <Route
          path="/tablets"
          element={
            <Layout>
              <Tablets />
            </Layout>
          }
        />
        <Route
          path="/laptops"
          element={
            <Layout>
              <Laptops />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
