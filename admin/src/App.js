import Home from "./pages/home/Home";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import { hotelColumns, roomColumns,orderColumns, userColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);
    
     const ProtectedRoute = ({ children }) => {
      const admin = useSelector((state) => state.user.currentUser.isAdmin);

       if (!admin) {
         return <Navigate to="/login" />;
       }

       return children;
     };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },

    {
      path: "/users",
      element: (
        <ProtectedRoute>
          <List columns={userColumns} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/:id",
      element: (
        <ProtectedRoute>
          <Single />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/new",
      element: (
        <ProtectedRoute>
          <New inputs={userInputs} title="Add New User" />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <List/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <ProtectedRoute>
          <Single />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products/new",
      element: (
        <ProtectedRoute>
          <New inputs={productInputs} title="Add New Product" />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
     <div className={darkMode ? "app dark" : "app"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
