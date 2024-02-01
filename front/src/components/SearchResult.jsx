import React, { useEffect, useState } from "react";
import Product from "./Product";

const SearchResult = ({ searchedProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (searchedProducts) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(
        searchedProducts.slice(indexOfFirstItem, indexOfLastItem)
      );
    }
  }, [searchedProducts, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Product items={searchedProducts} />
      {currentItems.length > 12 ? (
        <div className="flex justify-center">
          {currentPage === 1 ? null : (
            <button
              onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
              disabled={currentPage === 1}
            >
              {"< Previous"}
            </button>
          )}
          {[
            ...Array(Math.ceil(searchedProducts.length / itemsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`h-8 w-8 m-1 rounded-lg ${
                currentPage === number + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-300"
              }`}
            >
              {number + 1}
            </button>
          ))}
          {currentPage ===
          Math.ceil(searchedProducts.length / itemsPerPage) ? null : (
            <button
              onClick={() =>
                setCurrentPage((old) =>
                  Math.min(
                    old + 1,
                    Math.ceil(searchedProducts.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(searchedProducts.length / itemsPerPage)
              }
            >
              {"Next >"}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchResult;
