import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Select from "react-select";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";

const sortOptions = [
    { value: '', label:"Default"},
    { value: 'price,asc', label:"Price, low to high"},
    { value: 'price,desc', label: "Price, high to low" },
    { value: 'title,asc', label: "Alphabetically, A to Z" },
    { value: 'title,desc', label: "Alphabetically, Z to A" },
    { value: 'date,asc', label: "Date, old to new" },
    { value: 'date,desc', label: "Date, new to old" }
];


const ProductList = ({products}) => {
  const { content ,totalPages  } = products;
  const router = useRouter();
  const [page, setPage] = useState( router.query?.page || 1);
  const [sort, setSort] = useState( router.query?.sort || '');

  useEffect(() => {
  //   const initialSortOption = router.query.sort || '';
    const initialPage = parseInt(router.query?.page) + 1 || 1;
  //   setSort(initialSortOption);
    setPage(initialPage);
  }, []);

  const sortChangeHandler = (e) => {
    setSort(e?.value || '');
    if(e.value){
      const queryParams = {
        ...router.query,
        sort: e?.value || ''
      };
      router.push({ pathname: router.pathname, query: queryParams }, undefined, {
        scroll: false,
      });
    }
    else{
      const queryParams = {
        ...router.query,
      };
      delete queryParams.sort;
      router.push({ pathname: router.pathname, query: queryParams }, undefined, {
        scroll: false,
      });
    }
  }

  const pageChangeHandler = (e, value) => {
    console.log(value);
    setPage(value);
    const queryParams = {
      ...router.query,
      page: value - 1
    };
    router.push({ pathname: router.pathname, query: queryParams }, undefined, {
      scroll: false,
    });
  }

  return (
    <div className="bg-white h-full py-6">
      <div className="flex justify-between px-5 mx-auto">
        <p>{content?.length} Results</p>
        <div className="flex">
          <label htmlFor="" className="p-1">
            Sort by :
          </label> 
          <Select 
              id="sort"
              placeholder="Default"
              options={sortOptions}
              onChange={sortChangeHandler}
              // defaultValue={ sort || ''}
              value={sortOptions.find(option => option.value === sort)}
              isClearable
              styles={
                {control: (provided, state) => ({
                  ...provided,
                  width: '300px', 
                })}
              }
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4  py-4">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
        showFirstButton 
        showLastButton
        />
      </div>
    </div>
  );
};

export default ProductList;