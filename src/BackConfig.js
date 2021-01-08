export const URL_BACK = 'https://evisorpressto.herokuapp.com/API/';
// export const URL_BACK = 'http://127.0.0.1:8000/API/';

export const FetchGet = async (endpoint) => {
    console.log(URL_BACK + endpoint);
    const response = await fetch(URL_BACK + endpoint);
    const content = await response.json();    
    return content;
}

