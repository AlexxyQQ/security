import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "./AuthForm";

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/auth/register/", data, {
        headers: {
          apisecret: process.env.REACT_APP_APISECRET,
        },
      })
      .then((response) => {
        if (response.data.success) {
          navigate(`/auth/otp/${response.data.data.email}`);
          toast.success(response.data.message);
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
      <AuthForm
        login={false}
        onSubmit={onSubmit}
        buttonText="Sign Up"
        headerText="Create an Account"
        linkText="Already have an account? Sign In"
        linkTo="/auth/login"
      />
    </div>
  );
};

export default Signup;
