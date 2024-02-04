import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyTokenToGetUser } from "../redux/authSlice";
import AuthForm from "./AuthForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyTokenToGetUser());
  }, [dispatch]);

  const onLoginSubmit = (data) => {
    axios
      .post("https://localhost:3001/api/auth/login", data, {
        headers: {
          apisecret: process.env.REACT_APP_APISECRET,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Login Successful!");
          // add the token to local storage
          localStorage.setItem("token", response.data.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (!error.response.data.success) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="mt-20">
      {isAuthenticated ? (
        navigate("/dashboard")
      ) : (
        <AuthForm
          login={true}
          onSubmit={onLoginSubmit}
          buttonText="Sign In"
          headerText="Welcome Back!"
          linkText="Forgot Password?"
          linkTo="/auth/forgot-password"
        />
      )}
    </div>
  );
};

export default Login;
