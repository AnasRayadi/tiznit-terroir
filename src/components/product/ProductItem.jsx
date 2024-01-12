import React, { useState } from "react";
const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const SaleTag = () => (
  //   <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
  //     Sale
  //   </div>
  // );
  return (
    <a
      key={product.id}
      // href={product.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-3 aspect-square flex-col cursor-pointer"
    >
      <div className="relative w-full h-full rounded-md overflow-hidden shadow-sm  border-[1px] border-neutral-100 ">
        
        <img
          src={
            isHovered && product.mediaPathsList[1]
              ? product.mediaPathsList[1]
              : product.mediaPathsList[0]
          }
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        {product.onSale && (
          <div className="absolute bottom-2 left-2 py-1 px-2 rounded text-xs font-medium text-white bg-red-600">
            Sale
          </div>
        )}
      </div>
      <div className="flex flex-col px-2">
        <p className="font-light">{product.title}</p>
        <div className="flex">
          {product.hasVariants && <p className="pt-1 mr-1">Starting from </p>}
          <p className="text-lg font-semibold text-gray-900">
            {" "}
            {product.price} MAD
          </p>
          {product.compareAtPrice && (
            <p className="line-through whitespace-nowrap text-xs">
              {product.compareAtPrice} MAD
            </p>
          )}
        </div>
      </div>
      {/* <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3> */}
    </a>
  );
};
export default ProductItem;
