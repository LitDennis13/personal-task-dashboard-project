export const fetchOptionsGet: RequestInit =  {
    method: "GET",
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*',
    },
};

export const fetchOptionsPUT: RequestInit =  {
    method: "PUT",
    mode: 'cors',
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
    },
};

export const fetchOptionsPOST: RequestInit =  {
    method: "POST",
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*',
    },
};
