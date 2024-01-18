import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import { useRouter } from "next/router";

const FilterCheckboxGroup = ({ filterName, options, onOptionClicked }) => {
  const categoryOptions = options.filter((option) => option.slug);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const filterOptions = options.filter((option) => option.value);
  const displayedOptions = showMore ? filterOptions : filterOptions.slice(0, 10);
  
  useEffect(() => { 
    const updatedFilterName = filterName === "color" ? "optionColor" : filterName === "size" ? "optionSize" : filterName === "material" ? "optionMaterial" : filterName 
    const initialValues = router.query[updatedFilterName] || [];
    const filterOptions = options.slice(10)
    const includesInitialValues = filterOptions.some(option => initialValues.includes(option.value));
    if (includesInitialValues) {
      setShowMore(true);
    }
   }, []);

   

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <FormGroup>
        {displayedOptions.map((option) => (
          <FormControlLabel
            key={`${option.value} (${option.count})`}
            control={
              <Checkbox
                name={filterName}
                value={option.value}
                checked={option.checked}
                onClick={(e) => onOptionClicked(e, option.checked)}
              />
            }
            label={
              filterName === "availability"
                ? option.label
                : `${option.value} (${option.count})`
            }
          />
        ))}
      </FormGroup>
      {filterName === "category" && (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {categoryOptions.map((option) => (
              <FormControlLabel
                key={option.slug}
                control={
                  <Radio
                    name={filterName}
                    value={option.slug}
                    checked={option.checked}
                    onChange={(e) => onOptionClicked(e, option.checked)}
                  />
                }
                label={option.title}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {options.length > 10 && (
        <button
          className="text-blue-500 hover:text-blue-700" 
        onClick={handleShowMore}>
          {showMore ? "Show Less -" : "Show More +"}
        </button>
      )}
    </>
  );
};

export default FilterCheckboxGroup;
