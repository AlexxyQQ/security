import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const deleteUser = () => {
    axios
      .post(
        "https://localhost:3001/api/auth/delete-user/",
        { user: user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apisecret: process.env.REACT_APP_APISECRET,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
          navigate("/");
          toast.success(response.data.message);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
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
      <div className="flex">
        <h1 className="text-3xl px-4 font-bold">
          Welcome back, {user.username}!
        </h1>

        {user.verified ? (
          <p className="items-center justify-center flex text-green-500">
            (Verified)
          </p>
        ) : (
          <p className="items-center justify-center flex text-red-500">
            (<Link to={`/auth/otp/${user.email}`}>Not Verified</Link>)
          </p>
        )}
      </div>
      <div className="flex mb-4 px-8">
        <button
          className={`px-4 py-2 ${
            activeTab === 0
              ? "text-blue-500 border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab(0)}
        >
          Add Product
        </button>

        <button
          className={`px-4 py-2 ${
            activeTab === 1
              ? "text-blue-500 border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          Edit Product
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 2
              ? "text-blue-500 border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          <div>Delete Account</div>
        </button>
      </div>
      {activeTab === 0 && (
        <div className="px-8">
          <AddProduct />
        </div>
      )}
      {activeTab === 1 && (
        <div className="px-8">
          <EditProduct user={user} />
        </div>
      )}
      {activeTab === 2 && (
        <div className="px-8">
          <button className="bg-red-500" onClick={deleteUser}>
            Delete User? [Permanent Action]
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
