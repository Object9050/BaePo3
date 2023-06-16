// Wrapper function around fetch-api to allow for options
export async function fetcher(url, options ={}) {
    let response;
    if (!options) {
        response = await fetch(url);
    } else {
        response = await fetch(url, options);
    }
    const ApiData = await response.json();
    return ApiData;
}