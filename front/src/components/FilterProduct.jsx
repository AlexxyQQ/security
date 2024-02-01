import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Product from "./Product";
import { Loader2 } from "lucide-react";

const FilterProduct = ({ filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const { data, isloading, error } = useFetch(
    "http://localhost:3001/api/product/"
  );

  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredProducts = data.message.filter((product) => {
        let isValid = true;
        if (filter.categories.length > 0) {
          isValid = isValid && filter.categories.includes(product.category);
        }
        if (filter.minPrice || filter.maxPrice) {
          isValid =
            isValid &&
            product.price >= (filter.minPrice || 0) &&
            product.price <= (filter.maxPrice || Infinity);
        }
        if (filter.rating) {
          isValid = isValid && product.rating >= filter.rating;
        }
        if (filter.stock) {
          isValid = isValid && product.stock > 0;
        }
        return isValid;
      });

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(
        filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
      );
    }
  }, [data, filter, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isloading) {
    return (
      <div>
        <Loader2 className="h-4 w-4 inline-block animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return <div>An Error Occured.</div>;
  }

  return (
    <div>
      <Product items={currentItems} />
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
          {[...Array(Math.ceil(data.message.length / itemsPerPage)).keys()].map(
            (number) => (
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
            )
          )}
          {currentPage ===
          Math.ceil(data.message.length / itemsPerPage) ? null : (
            <button
              onClick={() =>
                setCurrentPage((old) =>
                  Math.min(
                    old + 1,
                    Math.ceil(data.message.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(data.message.length / itemsPerPage)
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

export default FilterProduct;
