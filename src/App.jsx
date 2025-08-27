import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AppLayout } from './layout/AppLayout'
import { Home } from "./Components/Home/Home"
import { About } from "./Components/About/About"
import { Products } from "./Components/product/Products"
import { Contact } from "./Contact/Contact"
import { Cart } from "./Components/Cart"
import { ProductDetails } from './Components/product/ProductDetails'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/products/:id",
          element: <ProductDetails />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/cart",
          element: <Cart />
        }
      ]
    }
  ])

  return (
 <RouterProvider router={router} />

  )
}

export default App
