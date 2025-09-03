const fetchOptions: RequestInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
};

async function fetchNewID() {
    const returnValue = await fetch("http://localhost:8080/api/v1/new-id/get-new-id", fetchOptions)
    .then((response) => response.json())
    .then((data: number) => {
        return data;
    })
    .catch((error) => {
        console.error(error);
    });

    return returnValue;
}

async function sendIncrementNewID() {
    await fetch("http://localhost:8080/api/v1/new-id/get-and-increment-new-id", fetchOptions)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    }); 
}

export { fetchNewID, sendIncrementNewID };