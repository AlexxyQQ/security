import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const SearchBar = ({ setSearchedProducts, setIsSearching }) => {
  const { data } = useFetch("http://localhost:3001/api/product/");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (data) {
      const filteredProducts = data.message.filter((product) => {
        return (
          product.title.toLowerCase().includes(lowercasedSearchTerm) ||
          product.description.toLowerCase().includes(lowercasedSearchTerm) ||
          product.brand.toLowerCase().includes(lowercasedSearchTerm) ||
          product.category.toLowerCase().includes(lowercasedSearchTerm)
        );
      });

      setSearchedProducts(filteredProducts);
    }
    return;
  }, [data, searchTerm, setSearchedProducts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <div className="flex items-center rounded-lg border border-b-2 border-teal-500 py-2">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search for your dream product..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button
        className="flex-shrink-0 bg-red-400 hover:bg-red-300 border-red-400 hover:border-red-300 text-sm border-4 text-black py-1 px-2 mr-2 rounded-lg"
        type="button"
        onClick={handleClearSearch}
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
