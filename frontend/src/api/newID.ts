import { fetchOptionsGet, fetchOptionsPOST } from "./fetchOptions";

async function fetchNewID() {
    const returnValue = await fetch("http://localhost:8080/api/v1/new-id/get-new-id", fetchOptionsGet)
    .then((response) => response.json())
    .then((data: number) => {
        console.log(data);
        return data;
    })
    .catch((error) => {
        console.error(error);
    });

    return returnValue;
}
fetchNewID();

async function sendIncrementNewID() {
    await fetch("http://localhost:8080/api/v1/new-id/get-and-increment-new-id", fetchOptionsPOST)
    .catch((error) => {
        console.error(error);
    }); 
}

export { fetchNewID, sendIncrementNewID };