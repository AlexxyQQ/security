import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditProductList = ({ items }) => {
  const navigate = useNavigate();
  const onDelete = (id) => {
    return () => {
      axios
        .delete(`http://localhost:3001/api/product/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apisecret: process.env.REACT_APP_APISECRET,
          },
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/dashboard");
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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="mt-2 text-lg font-semibold text-gray-900">
            {item.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">${item.price}</p>
          <Link
            to={`/edit/${item._id}`}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Edit
          </Link>
          <button
            onClick={onDelete(item._id)}
            className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditProductList;
