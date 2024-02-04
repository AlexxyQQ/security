import { Loader2, MoveLeft, MoveRight, ShoppingCartIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, isloading, error } = useFetch(
    `https://localhost:3001/api/product/${id}/`
  );

  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const handleNext = () => {
    setSelectedThumbnail((prev) => (prev + 1) % data.images.length);
  };

  const handlePrevious = () => {
    setSelectedThumbnail(
      (prev) => (prev - 1 + data.images.length) % data.images.length
    );
  };

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

  if (isloading) {
    return (
      <div>
        <Loader2 className="h-4 w-4 inline-block animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 mt-20">
        <div className="text-center p-10 rounded-lg bg-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Not Found</h2>
          <p className="text-red-700">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-8">
      {data && <div className="flex text-4xl font-bold">{data.title}</div>}

      <div className="grid grid-cols-2 gap-4 py-12">
        <div className="flex flex-col items-center">
          <img
            src={data.images[selectedThumbnail]}
            alt="product"
            className="object-cover w-64 h-64 max-w-md rounded-md"
          />

          <div className="flex gap-4 mt-4 px-[12px] h-16 bg-gray-200 rounded-lg justify-center items-center">
            <button
              onClick={handlePrevious}
              className="bg-gray-200 p-2 rounded"
            >
              <MoveLeft className="h-4 w-4" />
            </button>
            {data.images.map((image, index) => (
              <div className="space-x-4">
                <img
                  key={image}
                  src={image}
                  alt="product thumbnail"
                  className={`object-cover w-12 h-12 cursor-pointer rounded-md ${
                    index === selectedThumbnail
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedThumbnail(index)}
                />
              </div>
            ))}
            <button onClick={handleNext} className="bg-gray-200 p-2 rounded">
              <MoveRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <p className="text-2xl font-semibold">Description</p>
          <p className="text-2xl font-normal">{data.description}</p>
          <p className="text-xl font-semibold">Brand: {data.brand}</p>
          <div className="mt-2 flex justify-between space-x-6">
            <div className="flex items-center">
              <p className="px-2 py-1 bg-gray-500 text-black rounded-md">
                <p className="text-yellow-500 font-bold">
                  {data.rating.toFixed(2)}
                </p>
              </p>
            </div>
            <p className="text-sm text-white">
              <p className="px-3 py-1 bg-green-500 text-white rounded-full">
                Stock: {data.stock}
              </p>
            </p>
          </div>
          <p className="text-md font-normal">Category: {data.category}</p>
          <div className="flex items-center space-x-2">
            Price:{" "}
            {data.discountPercentage > 0 ? (
              <>
                <p className="font-bold text-red-500 line-through">
                  ${data.price}
                </p>
                <p className="font-bold text-green-500">
                  $
                  {(
                    data.price *
                    ((100 - data.discountPercentage) / 100)
                  ).toFixed(2)}
                </p>
                <p className="font-bold">({data.discountPercentage}%)</p>
              </>
            ) : (
              <p className="font-bold">${data.price}</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
          >
            <ShoppingCartIcon className="inline justify-centre align-middle w-4 h-4" />{" "}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
