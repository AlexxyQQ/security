import { Loader2, ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelector } from "../redux/cartSlice";
import { logout, verifyTokenToGetUser } from "../redux/authSlice";

const NavBar = () => {
  const itemsWithQuantities = useSelector(cartSelector);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyTokenToGetUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Loader2 className="h-4 w-4 inline-block animate-spin" /> Loading...
      </div>
    );
  }
  const totalItems = itemsWithQuantities.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <Link to="/" className="text-white text-lg font-bold">
        Home
      </Link>
      <div className="flex space-x-4">
        <div>
          {isAuthenticated ? (
            <div className="space-x-3">
              <button
                onClick={() => dispatch(logout())}
                className="text-white text-lg font-bold"
              >
                Logout
              </button>
              <Link to="/dashboard" className="text-white text-lg font-bold">
                Dashboard
              </Link>
            </div>
          ) : (
            <Link to="/auth/login" className="text-white text-lg font-bold">
              Login
            </Link>
          )}
        </div>
        <Link to="/cart" className="text-white text-lg font-bold relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
