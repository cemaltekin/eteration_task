import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useMemo } from "react";
import Spinner from "../components/Spinner";

export default function ProductList() {
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenFilter(true);
      } else {
        setOpenFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const products = useSelector((state) => {
    let filteredProducts = [...state.products.products];

    if (state.products.selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        state.products.selectedBrands.includes(product.brand)
      );
    }

    if (state.products.selectedModels.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        state.products.selectedModels.includes(product.model)
      );
    }

    return filteredProducts;
  });

  const sortOption = useSelector((state) => state.products.sortOption);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const sortedProducts = useMemo(() => {
    let sorted = [...products];

    switch (sortOption) {
      case "oldToNew":
        sorted = sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case "newToOld":
        sorted = sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "priceHighToLow":
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [sortOption, products]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const searchTerm = useSelector((state) => state.products.searchTerm);

  const totalPages = Math.ceil(
    sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / productsPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

 

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[220px_auto] gap-5 lg:gap-[30px]">
      <div
        className="md:hidden py-2.5 px-5 bg-white shadow rounded max-w-max cursor-pointer"
        onClick={() => setOpenFilter(true)}
      >
        Filtrele
      </div>
      {openFilter && <Filter setOpenFilter={setOpenFilter} />}
      {status === "loading" ? (
        <Spinner />
      ) : status === "failed" ? (
        <div className="text-center">{error}</div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-0 lg:gap-[30px] items-start">
            {sortedProducts
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-10 pagination">
            {currentPage > 1 && (
              <button onClick={() => paginate(currentPage - 1)}>
                <BsChevronLeft />
              </button>
            )}
            <button
              onClick={() => paginate(1)}
              className={currentPage === 1 ? "active" : ""}
            >
              1
            </button>
            {currentPage > 3 && <span>...</span>}
            {currentPage > 2 && (
              <button onClick={() => paginate(currentPage - 1)}>
                {currentPage - 1}
              </button>
            )}
            {currentPage !== 1 && currentPage !== totalPages && (
              <button className="active">{currentPage}</button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={() => paginate(currentPage + 1)}>
                {currentPage + 1}
              </button>
            )}
            {currentPage < totalPages - 2 && <span>...</span>}
            {totalPages !== 1 && (
              <button
                onClick={() => paginate(totalPages)}
                className={currentPage === totalPages ? "active" : ""}
              >
                {totalPages}
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => paginate(currentPage + 1)}>
                <BsChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
