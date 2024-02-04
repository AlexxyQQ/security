import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const OtpField = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const onOtpSubmit = (data) => {
    const apiData = { ...data, email: email };

    axios
      .post("https://localhost:3001/api/auth/validate-otp", apiData, {
        headers: {
          apisecret: process.env.REACT_APP_APISECRET,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("User Verified!");
          navigate("/auth/login");
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

  const resendOtp = () => {
    axios
      .post(
        "https://localhost:3001/api/auth/resend-otp",
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apisecret: process.env.REACT_APP_APISECRET,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          return;
        }
        toast.error("Something went wrong!");
      })
      .catch((error) => {
        if (!error.response.data.success) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Something went wrong!");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Enter the OTP
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onOtpSubmit)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <p className="text-green-500">
                  An otp has been set to your provided email address.
                </p>
                <label htmlFor="text" className="sr-only">
                  Enter the OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="OTP"
                  {...register("otp", {
                    required: true,
                    minLength: 4,
                  })}
                />
              </div>
            </div>

            <div className="mt-2 text-red-600">
              {errors.otp && <p>OTP is required</p>}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit OTP
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={resendOtp}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpField;
