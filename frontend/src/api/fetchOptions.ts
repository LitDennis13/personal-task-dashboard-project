const fetchOptions: RequestInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
};

export const fetchOptionsGet: RequestInit =  {
    ...fetchOptions,
    method: "GET",
};

export const fetchOptionsPUT: RequestInit =  {
    ...fetchOptions,
    method: "PUT",
};
