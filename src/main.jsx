import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import App from './App.jsx'
import './index.css'
import ShoppingPage from './Components/ShoppingPage/ShoppingPage.jsx'
import ProductPage from './Components/ProductsPage/ProductsPage.jsx'

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
