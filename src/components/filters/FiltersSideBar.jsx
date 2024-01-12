import { useEffect, useState } from "react";
import {
  Box,
  Slider,
} from "@mui/material";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import CollapsibleSection from "./CollapsibleSection";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import { useFilterOption } from "@/hooks/useFilterOption";

const availabilityOptions = [
  { value: "IN_STOCK", label: "In stock" },
  { value: "PREORDER", label: "Pre-order" },
  { value: "OUT_OF_STOCK", label: "Out of stock" },
];

const FiltersSideBar = ({categories ,filters }) => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [category,  handleCategoryRadioClick ] = useFilterOption(
    categories,
    "category"
  );
  const [availability, handleAvailabilityCheckboxClick] = useFilterOption(
    availabilityOptions,
    "availability"
  );
    const [size, handleSizeCheckboxClick] = useFilterOption(
      filters.optionFilters.size,
    "optionSize"
  );
  const [color, handleColorCheckboxClick] = useFilterOption(
    filters.optionFilters.color,
    "optionColor"
  );
   
  const [material, handleMaterialCheckboxClick] = useFilterOption(
    filters.optionFilters.material,
    "optionMaterial"
  );
  const handleSearchChange = (event) => {
    const { value } = event.target;
    const timer = setTimeout(() => {
      if (value) {
        const queryParams = { ...router.query, q: value };
        router.push(
          { pathname: router.pathname, query: queryParams },
          undefined,
          { scroll: false }
        );
      } else {
        const { q, ...rest } = router.query;
        router.replace({ pathname: router.pathname, query: rest }, undefined, {
          scroll: false,
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (router.query["price.gte"]) {
      setPriceRange([
        parseInt(router.query["price.gte"]),
        parseInt(router.query["price.lte"]),
      ]);
    }
  }, [router.query["price.gte"]]);

  const priceChangeHandler = (event, newValue) => {
    setPriceRange(newValue);
  };
  const priceChangeCommittedHandler = (event, newValue) => {
    const queryParams = {
      ...router.query,
      "price.gte": newValue[0],
      "price.lte": newValue[1],
    };
    router.push(
      { pathname: router.pathname, query: queryParams },
      undefined,
      { scroll: false }
    );
  }

   const filtersObjects = [
    { filterName: "category", options: category, handler: handleCategoryRadioClick },
    { filterName: "availability", options: availability, handler: handleAvailabilityCheckboxClick },
    { filterName: "size", options: size, handler: handleSizeCheckboxClick },
    { filterName: "color", options: color, handler: handleColorCheckboxClick },
    { filterName: "material", options: material, handler: handleMaterialCheckboxClick },
   ]
  return (
    <div className="h-full text-black border rounded px-3 py-6">
      <div className="bg-white flex gap-3 items-center p-3 rounded-lg shadow-sm mb-4 border-[1px] ">
        <Search />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
          defaultValue={router.query.q || ""}
          onChange={handleSearchChange}
        />
      </div>
      <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Price" initialState={false}>
            <Box sx={{ width: 200 }}>
              <Slider
                value={priceRange}
                onChange={priceChangeHandler}
                onChangeCommitted={priceChangeCommittedHandler}
                step={10}
                valueLabelDisplay="auto"
                min={filters.minPrice}
                max={filters.maxPrice}
                style={{ color: "#000", width: "250px" }}
              />
            </Box>
          </CollapsibleSection>
        </div>
      <div className="flex flex-col mb-4 ">
        { filtersObjects.map(filter => 
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title={filter.filterName.charAt(0).toUpperCase() + filter.filterName.slice(1) } initialState={false}>
            <FilterCheckboxGroup
              filterName={filter.filterName}
              options={filter.options}
              onOptionClicked={filter.handler}
            />
          </CollapsibleSection>
        </div>)}
      </div>
    </div>
  );
};

export default FiltersSideBar;
