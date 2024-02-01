import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../redux/cartSlice";

const SingleProduct = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: data._id,
        thumbnail: data.thumbnail,
        name: data.title,
        price:
          data.discountPercentage > 0
            ? data.price * ((100 - data.discountPercentage) / 100).toFixed(2)
            : data.price,
      })
    );
  };

  return (
    <div
      key={data._id}
      className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden m-3"
    >
      <Link to={`/product/${data._id}`} key={data._id}>
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover transform transition-all duration-500 hover:scale-110"
            src={data.thumbnail}
            alt={data.title}
          />
        </div>
      </Link>
      <div className="p-8 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center">
            <Link to={`/product/${data._id}`} key={data._id}>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                {data.title}
              </h1>
            </Link>
            <div className="flex items-center">
              <p className="text-yellow-500 font-bold">
                {data.rating.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-500 line-clamp-3">{data.description}</p>

          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <p className="px-2 py-1 bg-gray-500 text-black rounded-md">
                {data.category}
              </p>
            </div>
            <div className="text-sm text-white">
              {data.stock !== 0 ? (
                <p className="px-3 py-1 bg-green-500 text-white rounded-full">
                  In Stock
                </p>
              ) : (
                <p className="px-3 py-1 bg-red-500 text-white rounded-full">
                  Out of Stock
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="mt-2 text-lg font-semibold text-gray-900">
            ${data.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white  hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4 inline-block text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
