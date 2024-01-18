import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
export const useFilterOption = (initialOptions, queryKey) => {
  const router = useRouter();

  const [options, setOptions] = useState(() =>
    initialOptions?.map((option) => ({
      ...option,
      checked: false,
    }))
  );

  useEffect(() => {
    const initialValues = router.query[queryKey] || [];
    const updatedOptions = initialOptions?.map((option) => ({
      ...option,
      checked: Array.isArray(initialValues)
        ? initialValues.some(
            (value) => value === option.value || value === option.slug
          )
        : initialValues === option.slug || initialValues === option.value,
    }));
    setOptions(updatedOptions);
  }, [router.query[queryKey], initialOptions]);

  const handleOptionsClick = (event) => {
    const { value } = event.target;
    let prevParams = { ...router.query };  
    prevParams = _.omit(router.query, "page");

    if (queryKey !== "category") {
      const updatedOptions = options.map((option) => {
        if (option.value === value) {
          return {
            ...option,
            checked: !option.checked,
          };
        }
        return option;
      });
      setOptions(updatedOptions);

      
      const queryParams = {
        page: 1,
        ...prevParams,
        [queryKey]: updatedOptions
          .filter((option) => option.checked)
          .map((option) => option.value),
      };
      router.push(
        { pathname: router.pathname, query: queryParams },
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      const updatedOptions = options.map((option) => ({
        ...option,
        checked: option.slug === value,
      }));
      setOptions(updatedOptions);

      const selectedOption = updatedOptions.find((option) => option.checked);
      const queryParams = {
        page: 1,
        ...prevParams,
        [queryKey]: selectedOption ? selectedOption.slug : undefined,
      };
      router.push(
        { pathname: router.pathname, query: queryParams },
        undefined,
        {
          scroll: false,
        }
      );
    }
  };
  return [options, handleOptionsClick];
};
