import { axiosInstance } from "@/api/axios";
import ProductLayout from "@/components/layouts/ProductLayout";
import ProductList from "@/components/product/ProductList";
import { queryToUrlSearchParam } from "@/util/queryToUrlSearchParam";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const ProductsPage = ({categories ,filters}) => {
  const [products, setProducts] = useState([]);
  const router = useRouter()
  const search = router.query;
  
  console.log("filters :" +JSON.stringify(filters) );
  useEffect(() => {
    const fetchData = async () => {

      try {
        const params = new URLSearchParams(search);
        // console.log("search :" + params.toString());
        const url = `api/products/es/listing`;
        const queryParams = queryToUrlSearchParam(params);
        // console.log(`Query  Params:${queryParams.toString()}`);
        const response = await axiosInstance(`${url}`,{params:queryParams});
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };
    router.isReady && fetchData();
  }, [router.query]);

  // useEffect(() => {
  //   const params = new URLSearchParams(search);
  //   router.isReady && console.log(params.toString());
  // },[router.query])

  return (
    <>
      <div className="w-full bg-gray-900 flex flex-row items-center  text-white py-20">
        <div className="mx-auto flex flex-col items-center">
          <h1 className="text-4xl  font-bold mb-4">
            Products Page
          </h1>
          <p className="text-lg">
            Browse through our wide range of products and find what you need.
          </p>
        </div>
      </div>
      <ProductLayout categories={categories} filters={filters} >
            <ProductList  products={products}/>
      </ProductLayout>
    </>
  );
};
export async function getServerSideProps(context) {
  const { query } = context;
  const params = new URLSearchParams(query);
  const queryParams = queryToUrlSearchParam(params);
  // console.log("queryParams :" + queryParams);
  const res = await axiosInstance("api/categories");
  const response = await axiosInstance(`api/products/es/listing/filters` , { params:queryParams });
  console.log(response.data);
  return {
    props: {
      categories: res.data,
      filters: response.data
    },
  };
}

export default ProductsPage;
