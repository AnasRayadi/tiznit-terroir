import React, { useState } from "react";
const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      key={product.id}
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
        <p className="font-light text-start">{product.title}</p>
        <div className="flex flex-col sm:flex-row  ">
          {product.hasVariants && <p className="text-sm font-medium pt-[3px] mr-1">Starting from </p>}
          <div className="flex flex-col sm:flex-row">
            <p className="text-sm font-medium sm:text-base sm:font-semibold text-gray-900 mr-1">
              {product.price} {"MAD "}
            </p>
            {product.compareAtPrice && (
              <p className="line-through text-sm sm:text-base">
                {product.compareAtPrice} MAD
              </p>
            )}
          </div>
        </div> 
      </div>
    </a>
  );
};
export default ProductItem;
