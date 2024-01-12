import FiltersSideBar from "../filters/FiltersSideBar";

const ProductLayout = ({ children ,categories ,filters}) => {
  return (
    <div className="flex flex-row h-full bg-white px-4 py-0 mx-auto mt-10">
      <div className="w-[20%]">
        <FiltersSideBar categories={categories} filters={filters} />
      </div>
      <div className="w-[80%] ">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ProductLayout;


