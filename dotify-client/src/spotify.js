import axios from 'axios';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
};

const LOCALSTORAGE_VALS = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
};
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALS;
    if(!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
;}

const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    window.location = window.location.origin;
}

const refreshToken = async () => {
    try {
        if(!LOCALSTORAGE_VALS.refreshToken === 'undefined' || (Date.now() - Number(LOCALSTORAGE_VALS.timestamp) / 1000) < 1000) {
            console.error("No refresh token available!");
            logout();
        }
    

    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALS.refreshToken}`);
    
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    window.location.reload();
    } catch (e) {
        console.error(e);
    }
};


const getAccessToken = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in')
    };
    const findError = urlParams.get('error');

    if(findError || hasTokenExpired() || LOCALSTORAGE_VALS.accessToken === 'undefined') {
        refreshToken();
    };

    if(LOCALSTORAGE_VALS.accessToken && LOCALSTORAGE_VALS.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALS.accessToken;
    };

    if(queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
    
    return false;
}

export const accessToken = getAccessToken();
export { logout }; 
axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const triggerSearch = (searchTerms) => {
    axios({
        method: "get",
        url: `/search/${searchTerms}`
        // (`/search?${searchTerms}`
    })
}