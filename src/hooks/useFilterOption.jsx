import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
      checked:
      Array.isArray(initialValues) ? initialValues.some(value => value === option.value || value === option.slug) : initialValues === option.slug || initialValues === option.value,
    }));
    setOptions(updatedOptions);
  }, [router.query[queryKey], initialOptions]);

  const handleOptionsClick = (event) => {
    const { value } = event.target;
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
        ...router.query,
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
        ...router.query,
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
