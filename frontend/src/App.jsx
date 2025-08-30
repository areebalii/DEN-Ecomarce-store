import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { Home } from "./Components/Home/Home";
import { About } from "./Components/About/About";
import { Products } from "./Components/product/Products";
import { Contact } from "./Contact/Contact";
import { Cart } from "./Components/Cart";
import { ProductDetails } from "./Components/product/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import { ProductProvider } from "./Product context/ProductContext"; // ✅ import
import { AuthProvider } from "./Product context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <Cart /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/add-product", element: <AddProduct /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
