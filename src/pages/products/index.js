import { axiosInstance } from "@/api/axios";
import ProductLayout from "@/components/layouts/ProductLayout";
import ProductList from "@/components/product/ProductList";
import { categoryPath, filtersPath, productsPath } from "@/util/constants";
import { queryToUrlSearchParam } from "@/util/queryToUrlSearchParam";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductsPage = ({ products, categories, filters }) => {
  // const [products, setProducts] = useState([]);
  // const router = useRouter()
  // const search = router.query;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const params = new URLSearchParams(search);
  //       const queryParams = queryToUrlSearchParam(params);
  //       const response = await axiosInstance(`${productsPath}`,{params:queryParams});
  //       setProducts(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching products data:', error);
  //     }
  //   };
  //   router.isReady && fetchData();
  // }, [router.query]);
  return (
    <>
      <div className="w-full bg-gray-900 flex flex-col items-center text-white py-10 md:py-20">
        <div className="mx-auto flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Products Page
          </h1>
          <p className="text-base md:text-lg text-center md:w-2/3">
            Browse through our wide range of products and find what you need.
          </p>
        </div>
      </div>

      <ProductLayout categories={categories} filters={filters}>
        <ProductList products={products} />
      </ProductLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const params = new URLSearchParams(query);
  const queryParams = queryToUrlSearchParam(params);
  const productsRes = await axiosInstance(`${productsPath}`, {
    params: queryParams,
  });
  const products = productsRes.data;
  console.log(products);
  const res = await axiosInstance(categoryPath);
  const response = await axiosInstance(filtersPath, { params: queryParams });
  return {
    props: {
      products: products,
      categories: res.data,
      filters: response.data,
    },
  };
}

export default ProductsPage;
