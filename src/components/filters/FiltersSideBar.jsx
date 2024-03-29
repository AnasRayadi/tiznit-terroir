import { useEffect, useState } from "react";
import { Box, Slider } from "@mui/material";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import CollapsibleSection from "./CollapsibleSection";
import { useRouter } from "next/router";
import { Clear, Search } from "@mui/icons-material";
import { useFilterOption } from "@/hooks/useFilterOption";
import _ from "lodash";
const availabilityOptions = [
  { value: "IN_STOCK", label: "In stock" },
  { value: "PREORDER", label: "Pre-order" },
  { value: "OUT_OF_STOCK", label: "Out of stock" },
];

const FiltersSideBar = ({ categories, filters }) => {
  const router = useRouter();
  const [category, handleCategoryRadioClick] = useFilterOption(
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

  const [applyedFilters, setApplyedFilters] = useState({});
  useEffect(() => {
    setApplyedFilters({
      category: category?.filter((option) => option.checked),
      availability: availability?.filter((option) => option.checked),
      optionSize: size?.filter((option) => option.checked),
      optionColor: color?.filter((option) => option.checked),
      optionMaterial: material?.filter((option) => option.checked),
    });
  }, [category, availability, size, color, material]);
  let prevParams = { ...router.query };
  prevParams = _.omit(router.query, "page");

  const [inputValue, setInputValue] = useState(router.query?.q || "");
  const [timer, setTimer] = useState(null);

  const handleSearchChange = (event) => {
    const { value } = event.target;

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        if (value) {
          const queryParams = { page: 1, ...prevParams, q: value };
          router.push(
            { pathname: router.pathname, query: queryParams },
            undefined,
            { scroll: false }
          );
        } else {
          const { q, ...rest } = prevParams;
          router.replace(
            { pathname: router.pathname, query: rest },
            undefined,
            { scroll: false }
          );
        }
      }, 1000)
    );

    setInputValue(value);
  };

  useEffect(() => {
    // Cleanup the timer on component unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice ]);

  useEffect(() => {
    const routerMinPrice = parseInt(router.query["price.gte"]);
    const routerMaxPrice = parseInt(router.query["price.lte"]);
    let newMinPrice = routerMinPrice;
    let newMaxPrice = routerMaxPrice;
    if (routerMinPrice && routerMaxPrice) {
      setPriceRange([routerMinPrice, routerMaxPrice]);
        if (routerMinPrice < filters.minPrice) {
            newMinPrice = filters.minPrice;
        }
        if (routerMaxPrice > filters.maxPrice) {
            newMaxPrice = filters.maxPrice;
        }
        if (newMinPrice !== routerMinPrice || newMaxPrice !== routerMaxPrice) {
            const queryParams = {
                page: 1,
                ...prevParams,
                "price.gte": newMinPrice,
                "price.lte": newMaxPrice,
            };
            router.push({ pathname: router.pathname, query: queryParams }, undefined, {
                scroll: false,
            });
        }
    }
    
}, [router.query["price.gte"], router.query["price.lte"]]);

  const priceChangeHandler = (event, newValue) => {
    setPriceRange(newValue);
  };
  const priceChangeCommittedHandler = (event, newValue) => {
    setPriceRange(newValue);
    const queryParams = {
      page: 1,
      ...prevParams,
      "price.gte": newValue[0],
      "price.lte": newValue[1],
    };
    router.push({ pathname: router.pathname, query: queryParams }, undefined, {
      scroll: false,
    });
  };

  const handleClearClick = (key, filter) => {
    const newFilters = Array.isArray(applyedFilters[key])
      ? applyedFilters[key]
          .filter(
            (option) =>
              option.value !== filter.value || option.slug !== filter.slug
          )
          .map((option) => option.value || option.slug)
      : [];

    const queryParams = {
      ...router.query,
      [key]: newFilters,
    };

    router.push({ pathname: router.pathname, query: queryParams }, undefined, {
      scroll: false,
    });
  };

  const filtersObjects = [
    {
      filterName: "category",
      options: category,
      handler: handleCategoryRadioClick,
      initialState: true,
    },
    {
      filterName: "availability",
      options: availability,
      handler: handleAvailabilityCheckboxClick,
      initialState: true,
    },
    {
      filterName: "size",
      options: size,
      handler: handleSizeCheckboxClick,
      initialState: router.query.optionSize && true,
    },
    {
      filterName: "color",
      options: color,
      handler: handleColorCheckboxClick,
      initialState: router.query.optionColor && true,
    },
    {
      filterName: "material",
      options: material,
      handler: handleMaterialCheckboxClick,
      initialState: router.query.optionMaterial && true,
    },
  ];
  return (
    <div className="h-full text-black  px-2 py-6">
      <div className="bg-white flex gap-3 items-center p-3 rounded-lg shadow-sm mb-4 border-[1px] ">
        <Search />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
          defaultValue={inputValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2 ">
        {Object?.keys(applyedFilters).map((key) => {
          const isFilterArray = Array.isArray(applyedFilters[key]);
          const filters = isFilterArray
            ? applyedFilters[key]
            : [applyedFilters[key]];

          return filters.map((filter, index) => (
            <div
              className="flex bg-gray-100 text-gray-900 px-1 py-1 rounded"
              key={index}
            >
              <button
                className="px-1 py-1"
                onClick={() => handleClearClick(key, filter)}
              >
                <Clear />
              </button>
              <span className="text-gray-900 text-base px-1 py-1">
                {filter.label || filter.value || filter.title}
              </span>
            </div>
          ));
        })}
        
      </div>
      <div className="p-1 lg:p-0">
        <CollapsibleSection title="Price" initialState={true}>
          <div className="flex justify-between ">
            <span className="text-base">{priceRange[0]} MAD</span>
            <span className="text-base">{priceRange[1]} MAD</span>
          </div>
          <Box
            sx={{ width: "full", paddingLeft: "10px", paddingRight: "10px" }}
          >
            <Slider
              value={[priceRange[0], priceRange[1]]}
              onChange={priceChangeHandler}
              onChangeCommitted={priceChangeCommittedHandler}
              step={10}
              valueLabelDisplay="auto"
              min={filters.minPrice}
              max={filters.maxPrice}
              style={{ color: "#000" }}
            />
          </Box>
        </CollapsibleSection>
      </div>
      <div className="flex flex-col mb-4 ">
        {filtersObjects.filter((filter) => filter.options.length > 0).map((filter) => (
          <div className=" p-1 lg:p-0">
            <CollapsibleSection
              title={
                filter.filterName.charAt(0).toUpperCase() +
                filter.filterName.slice(1)
              }
              initialState={filter.initialState}
            >
              <FilterCheckboxGroup
                filterName={filter.filterName}
                options={filter.options}
                onOptionClicked={filter.handler}
              />
            </CollapsibleSection>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersSideBar;
