import React, { useState } from "react";
import { categories } from "../lib/const";

const FilterBar = ({ setIsFiltering, setFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState();
  const [inStock, setInStock] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  const handleFilterChange = () => {
    setFilter({
      categories: selectedCategories,
      minPrice: minPrice,
      rating: rating,
      stock: inStock,
    });
    setIsFiltering(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  return (
    <div className="w-64  p-4 bg-gray-200 rounded">
      <div className="space-y-4">
        <div>
          <label className="font-bold">Categories</label>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="mr-2"
              />
              <label>{cat}</label>
            </div>
          ))}
        </div>

        <div>
          <label className="font-bold">Rating</label>
          <div className="flex">
            {stars.map((star, index) => (
              <svg
                key={index}
                onClick={() => setRating(star)}
                className={`h-6 w-6 ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                } cursor-pointer`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.27l3.454 1.812-0.701-4.04 2.954-2.88-4.088-0.593L10 2 7.381 7.27 3.293 7.863l2.954 2.88-0.701 4.04L10 15.27z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold">Minimum Price</label>
          <input
            className="w-48 border p-2 rounded"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Minimum Price"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label>In Stock</label>
        </div>

        <button
          className="w-48 bg-blue-500 text-white p-2 rounded"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
        <button
          className="w-48 bg-red-400 text-white p-2 rounded mt-2"
          onClick={() => setIsFiltering(false)}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
