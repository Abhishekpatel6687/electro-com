import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Products from "../pages/products/Products";
import Contact from "../pages/contact/Contact";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
// import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MainLayout from "../components/layout/MainLayout";
import SuperMainLayout from "../components/AdminDashboard/SuperMainLayout/SuperMainLayout";

import ProductForm from "../components/AdminDashboard/productAddForm/ProductForm";
import Cart from "../pages/cart/Cart";
import SingleProduct from "../pages/single-product/SingleProduct";

export default function AppRoutes() {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <Header /> // aise bbhi direct sb pe header laga sakte ho  */}
        <Routes>
          <Route element={<MainLayout />}>
            {" "}
            // aise header sab se lagana sahi rahega
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singleproduct/:id" element={<SingleProduct />} />

          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          <Route
            path="/prodashboard"
            element={
              <ProtectedRoute role="superadmin">
                <SuperMainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="productAdd" element={<ProductForm />} />
          </Route>
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
