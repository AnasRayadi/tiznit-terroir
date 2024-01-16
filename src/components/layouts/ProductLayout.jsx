import CollapsibleSection from "../filters/CollapsibleSection";
import FiltersSideBar from "../filters/FiltersSideBar";

const ProductLayout = ({ children ,categories ,filters}) => {
  return (
    <div className="flex flex-col lg:flex-row h-full justify-center bg-white px-4 py-0 mx-auto mt-10 ">
      <div className="w-[100%] lg:w-[20%] 2xl:[20%] ">
       <div className="border rounded-xl lg:hidden">
        <CollapsibleSection title={'Filters'} initialState={false}>
          <FiltersSideBar categories={categories} filters={filters} />
        </CollapsibleSection>
       </div>
        <div className="hidden lg:block">
          <FiltersSideBar categories={categories} filters={filters} />
        </div>
       {/* <FiltersSideBar categories={categories} filters={filters} /> */}
      </div>
      <div className="w-[100%] lg:w-[80%] ">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ProductLayout;


