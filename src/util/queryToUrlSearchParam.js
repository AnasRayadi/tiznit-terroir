export const queryToUrlSearchParam = (query) =>{
    const urlSearchParams = new URLSearchParams();

    for(const [key,value] of query){
        if(key === "sort"){
            urlSearchParams.append(key,value);
            continue;
        }
        if(key === "page"){
            urlSearchParams.append(key,value - 1);
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