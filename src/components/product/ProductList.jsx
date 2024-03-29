import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Select from "react-select";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import _ from "lodash";

const sortOptions = [
  { value: "", label: "Default" },
  { value: "price,asc", label: "Price, low to high" },
  { value: "price,desc", label: "Price, high to low" },
  { value: "title,asc", label: "Alphabetically, A to Z" },
  { value: "title,desc", label: "Alphabetically, Z to A" },
  { value: "date,asc", label: "Date, old to new" },
  { value: "date,desc", label: "Date, new to old" },
];

const ProductList = ({ products }) => {
  const { content, totalPages } = products;
  const router = useRouter();
  const [page, setPage] = useState(router.query?.page || 1);
  const [sort, setSort] = useState(router.query?.sort || "");

  useEffect(() => {
    const initialPage = parseInt(router.query?.page) || 1;
    setPage(initialPage);
  }, [router.query?.page]);
  let prevParams = { ...router.query };  
    prevParams = _.omit(router.query, "page");
  const sortChangeHandler = (e) => {
    setSort(e?.value || "");
    if (e.value) {
      const queryParams = {
        page: 1,
        ...prevParams,
        sort: e?.value || "",
      };
      router.push(
        { pathname: router.pathname, query: queryParams },
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      const queryParams = {
        page: 1,
        ...prevParams,
      };
      delete queryParams.sort;
      router.push(
        { pathname: router.pathname, query: queryParams },
        undefined,
        {
          scroll: false,
        }
      );
    }
  };

  const pageChangeHandler = (e, value) => {
    setPage(value);
    const queryParams = {
      ...router.query,
      page: value,
    };
    router.push({ pathname: router.pathname, query: queryParams }, undefined, {
      scroll: false,
    });
  };

  return (
    <div className="bg-white h-full py-6">
      <div className="flex flex-row justify-between lg:px-5 mx-auto">
        <p className="p-1">{content?.length} Results</p>
        <div className="flex justify-end w-[70%] ">
          <label htmlFor="sort" className="p-1 hidden sm:block">
            Sort by :
          </label>

          <Select
            id="sort"
            placeholder="Default"
            options={sortOptions}
            onChange={sortChangeHandler}
            // defaultValue={ sort || ''}
            value={sortOptions.find((option) => option.value === sort)}
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: "250px",
                cursor: "pointer",
              }),
            }}
          />
        </div>
      </div>
      {content?.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-2xl font-semibold">No products found</p>
        </div>
      ) : (
        <>
          <div className="mx-auto lg:px-4 py-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
              {content?.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-5 mb-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={pageChangeHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
