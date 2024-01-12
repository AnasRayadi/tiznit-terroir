export const queryToUrlSearchParam = (query) =>{
    const urlSearchParams = new URLSearchParams();

    
    for(const [key,value] of query){
        // console.log("key:",key);
        // console.log("value:",value);
        if(key === "sort"){
            urlSearchParams.append(key,value);
            continue;
        }
        const splitedValue = value.split(",");
        if(splitedValue.length > 1){

            splitedValue.forEach((item) => urlSearchParams.append(key,item));
        }
        else{
            urlSearchParams.append(key,value);
        }
    }
    return urlSearchParams;
}



    // const queryParams = {};
    // params.forEach((value, key) => {
    //   // Check if the parameter key already exists in the queryParams object
    //   if (queryParams[key]) {
    //     // If it exists, add the value to the array
    //     queryParams[key].push(value);
    //   } else {
    //     // If it doesn't exist, create an array with the current value
    //     queryParams[key] = [value];
    //   }
    // });

    // // Now queryParams contains the parameters with values separated
    // console.log('Query Params:', queryParams);

    // // Prepare the parameters for the request
    // const preparedParams = Object.entries(queryParams).map(([key, values]) => {
    //   // If there is only one value, return it as a regular query parameter
    //   if (values.length === 1) {
    //     return `${key}=${values[0]}`;
    //   }
    //   // If there are multiple values, create multiple query parameters with the same key
    //   return values.map((value) => `${key}=${value}`).join('&');
    // });

    // Join the prepared parameters with '&' and append to the URL