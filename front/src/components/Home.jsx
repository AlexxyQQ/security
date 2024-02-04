import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import FilterBar from "./FilterBar";
import FilterProduct from "./FilterProduct";
import Product from "./Product";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [itemsPerPage] = useState(12);

  const { data, isloading, error } = useFetch(
    "https://localhost:3001/api/product/"
  );

  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (data) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      if (indexOfFirstItem > data.message.length) {
        setCurrentPage(1);
      }
      setCurrentItems(data?.message.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [data, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isloading) {
    return (
      <div>
        <Loader2 className="h-4 w-4 inline-block animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: An error occured</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="w-64 pt-16 h-full fixed left-0 top-0 overflow-x-hidden bg-gray-200 p-4">
          <FilterBar setIsFiltering={setIsFiltering} setFilter={setFilter} />
        </div>
        <div className="flex-grow ml-64 mt-20">
          {isFiltering ? null : (
            <div className="px-6">
              <SearchBar
                setSearchedProducts={setSearchedProducts}
                setIsSearching={setIsSearching}
              />
            </div>
          )}
          {isFiltering ? (
            <FilterProduct filter={filter} />
          ) : (
            <div>
              {isSearching ? (
                <SearchResult searchedProducts={searchedProducts} />
              ) : (
                <>
                  <Product items={currentItems} />
                  <div className="flex justify-center my-4">
                    {currentPage === 1 ? null : (
                      <button
                        onClick={() =>
                          setCurrentPage((old) => Math.max(old - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        {"< Previous"}
                      </button>
                    )}
                    {[
                      ...Array(
                        Math.ceil(data.message.length / itemsPerPage)
                      ).keys(),
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
                    Math.ceil(data?.message.length / itemsPerPage) ? null : (
                      <button
                        onClick={() =>
                          setCurrentPage((old) =>
                            Math.min(
                              old + 1,
                              Math.ceil(data?.message.length / itemsPerPage)
                            )
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(data?.message.length / itemsPerPage)
                        }
                      >
                        {"Next >"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
