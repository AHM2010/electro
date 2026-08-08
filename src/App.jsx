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

const DEFAULT_TITLE = "Electro — Premium Technology";

const routeTitles = {
  "/": DEFAULT_TITLE,
  "/home": "All Products | Electro",
  "/phones": "Phones | Electro",
  "/tablets": "Tablets | Electro",
  "/laptops": "Laptops | Electro",
  "/contact": "Contact | Electro",
  "/checkout": "Checkout | Electro",
};

function TitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = routeTitles[pathname] ?? "Page Not Found | Electro";

    if (pathname.startsWith("/products/")) {
      const slug = decodeURIComponent(pathname.replace("/products/", ""));
      const product = allProducts.find((item) => item.slug === slug);
      title = product
        ? `${product.title} | Electro`
        : "Product Not Found | Electro";
    }

    document.title = title;

    const animationFrame = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname]);

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
    AOS.init({
      once: true,
      duration: 650,
      easing: "ease-out-cubic",
      offset: 72,
    });
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
