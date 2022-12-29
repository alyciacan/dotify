import axios from 'axios';



const logout = () => {
    window.location = window.location.origin;
}

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
export { logout }; 

export const triggerSearch = (searchTerms) => {
    axios({
        method: "get",
        url: `http://localhost:8888/search/${searchTerms}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        // (`/search?${searchTerms}`
    }
})
    .then(resp => console.log(resp))
};