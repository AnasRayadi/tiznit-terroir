import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
} from "@mui/material";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import CollapsibleSection from "./CollapsibleSection";
import { axiosInstance } from "@/api/axios";
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
  // const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState(router.query?.q || "");
  const [priceRange, setPriceRange] = useState([2000, 6000]);
  console.log("filters :" + JSON.stringify(filters));
  
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
  // console.log("size :" + JSON.stringify(size));
  const [color, handleColorCheckboxClick] = useFilterOption(
    filters.optionFilters.color,
    "optionColor"
  );
   
  const [material, handleMaterialCheckboxClick] = useFilterOption(
    filters.optionFilters.material,
    "optionMaterial"
  );
    
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axiosInstance("api/categories");
  //       const resData = await res.data;
  //       setCategories(resData);
  //     } catch (error) {
  //       console.error("Error fetching categories data:", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   if (router.query.q) {
  //     setSearchValue(router.query.q);
  //   }
  // }, [router.query.q]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);

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

   
  return (
    <div className="h-full text-black border rounded px-3 py-6">
      <div className="bg-white flex gap-3 items-center p-3 rounded-lg shadow-sm mb-4 border-[1px] ">
        <Search />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
          defaultValue={router.query.q || ""}
          // onChange={handleSearchChange}
          onKeyUp={handleSearchChange}
        />
      </div>
      <div className="flex flex-col mb-4 ">
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Category" initialState={false}>
            <FilterCheckboxGroup
              filterName="category"
              options={category}
              // onCheckboxClicked={handleCategoryCheckboxClick}
              onRadioClicked={handleCategoryRadioClick}
            />
          </CollapsibleSection>
        </div>
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Availability" initialState={false}>
            <FilterCheckboxGroup
              filterName="availability"
              options={availability}
              onCheckboxClicked={handleAvailabilityCheckboxClick}
            />
          </CollapsibleSection>
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
            {/* <div className="flex justify-between items-center py-3">
              <input
                className="py-1 w-20 border border-1 border-gray-500 rounded px-2"
                type="Number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange(() => {
                  const newPriceRange = [e.target.value, priceRange[1]];
                  setTimeout(() => {
                  const queryParams = {
                    ...router.query,
                    "price.gte": newPriceRange[0],
                    "price.lte": newPriceRange[1],
                  };
                  router.push(
                    { pathname: router.pathname, query: queryParams },
                    undefined,
                    { scroll: false }
                  );
                  return newPriceRange;
                  }, 1000);
                } )}
              />
              <input
                className="py-1 w-20 border border-1 border-gray-500 rounded px-2"
                type="Number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
              />
            </div> */}
          </CollapsibleSection>
        </div>
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Size" initialState={false}>
            <FilterCheckboxGroup
              filterName="optionSize"
              options={size}
              onCheckboxClicked={handleSizeCheckboxClick}
            />
          </CollapsibleSection>
        </div>
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Color" initialState={false}>
            <FilterCheckboxGroup
              filterName="optionColor"
              options={color}
              onCheckboxClicked={handleColorCheckboxClick}
            />
          </CollapsibleSection>
        </div>
        <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
          <CollapsibleSection title="Material" initialState={false}>
            <FilterCheckboxGroup
              filterName="optionMaterial"
              options={material}
              onCheckboxClicked={handleMaterialCheckboxClick}
            />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default FiltersSideBar;
