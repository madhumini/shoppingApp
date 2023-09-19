import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
// import PaymentMethod from './pages/PaymentMethod.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import store from "./redux/store";

const App = () => {

    const user = useSelector(state=>state.user.currentUser);

    // const { currentUser } = useSelector((state) => state.user);

    
    const { isFetching,error} = useSelector((state)=> state.user)

    const router = createBrowserRouter([
      {
        path: "/login",
        element: user !== null ? <Navigate to="/" /> : <Login />,
      },
      {
        path: "/register",
        element: user !== null ? <Navigate to="/" /> : <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:category",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      // {
      //   path: "/payment",
      //   element: <PaymentMethod/>,
      // },
    ]);

  return (
    <div>
    <RouterProvider router={router} />
   </div>
  )
}

export default App

