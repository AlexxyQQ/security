import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AuthForm = ({
  onSubmit,
  buttonText,
  headerText,
  linkText,
  linkTo,
  login,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            {headerText}
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {login ? null : (
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                      minLength: 5,
                    })}
                  />
                  {errors.username && <p>Username is required</p>}
                </div>
              )}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                />

                {/* Displaying errors */}
                {errors.password && (
                  <span role="alert">{errors.password.message}</span>
                )}
              </div>
              {login ? null : (
                <div>
                  <label htmlFor="confirm password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    {...register("confirm_password", {
                      required: true,
                      minLength: 8,
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                  />
                </div>
              )}
            </div>

            <div className="mt-2 text-red-600">
              {errors.email && <p>Email field is required</p>}
              {errors.confirm_password &&
                errors.confirm_password.type === "required" && (
                  <p>Confirm Password field is required</p>
                )}
              {errors.confirm_password &&
                errors.confirm_password.type === "minLength" && (
                  <p>Confirm Password must be at least 8 characters</p>
                )}
              {errors.confirm_password &&
                errors.confirm_password.type === "validate" && (
                  <p>{errors.confirm_password.message}</p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {buttonText}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <Link to={linkTo} className="text-indigo-600 hover:text-indigo-500">
              {linkText}
            </Link>
          </div>
          {login ? (
            <div className="flex justify-end mt-4">
              <Link
                to="/auth/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Sign up here.
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
