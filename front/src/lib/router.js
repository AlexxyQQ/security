import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import Cart from "../components/Cart";
import ProductDetail from "../components/ProductDetail";
import Dashboard from "../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenToGetUser } from "../redux/authSlice";
import { useEffect } from "react";
import OtpField from "../components/OtpField";
import EditProductPage from "../components/EditProductPage";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyTokenToGetUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/auth",
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Signup />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "otp/:email",
            element: <OtpField />,
          },
        ],
      },
      {
        path: "/product/:id", // :id is a URL parameter
        element: <ProductDetail />,
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <Dashboard />
            <EditProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
