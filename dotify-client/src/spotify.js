import axios from 'axios';



export const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        accessToken: urlParams.get('access_token'),
        refreshToken: urlParams.get('refresh_token'),
    };
    return queryParams;
}

export const accessToken = getAccessToken();

export const triggerSearch = (searchTerms) => {
    axios.get(`http://localhost:8888/search/${searchTerms}`, {
        withCredentials: true
    })
        .then(response => console.log(response))
};