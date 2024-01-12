import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

const FilterCheckboxGroup = ({ filterName, options ,onCheckboxClicked , onRadioClicked}) => {
    const categoryOptions = options.filter((option) => option.slug);
  return (
    <>
    <FormGroup>
      {options.filter((option) => option.value).map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              name={filterName}
              value={option.value}
            checked={option.checked}
            onClick={(e) => onCheckboxClicked(e, option.checked)}
            />
          }
          label={ filterName === 'availability' ? option.label : `${option.value} (${option.count})` } 
        /> 
      ))}
    </FormGroup>
    { filterName == 'category' && <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {categoryOptions.map((option) =>  (
            <FormControlLabel
            key={option.slug}
            control={
                <Radio
                name={filterName}
                value={option.slug}
                checked={option.checked}
                // onClick={(e) => onCheckboxClicked(e, option.checked)}
                onChange={(e) => onRadioClicked(e, option.checked)}
                />
            }
            label={option.title}
            />
        ))}
      </RadioGroup>
    </FormControl>}
    
    </>
  );
};

export default FilterCheckboxGroup;
