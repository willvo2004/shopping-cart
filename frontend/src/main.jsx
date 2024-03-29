import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import ShoppingPage from './Components/ShoppingPage/ShoppingPage.jsx'
import ProductPage from './Components/ProductsPage/ProductsPage.jsx'
import IndividualProduct from './Components/IndividualProduct/IndivdualProduct.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import UserSignIn from './Components/UserSignIn/UserSignIn.jsx'
import UserSignUp from './Components/UserSignUp/UserSignUp.jsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/shop/:shopid',
    element: <ShoppingPage />,
  },
  {
    path: '/shop/:shopid/:category',
    element: <ProductPage />,
  },
  {
    path: 'shop/:shopid/:category/:productid',
    element: <IndividualProduct />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/user/signin',
    element: <UserSignIn />
  },
  {
    path: '/user/register',
    element: <UserSignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
