import { REACT_APP_API_URL } from "./consts";

const fetchAPI = async (idInstance, apiTokenInstance, endpoint, method = 'GET', body = null) => {
    const url = `${REACT_APP_API_URL}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            return data && data.message ? data.message : `HTTP error! Status: ${response.status}`;
        }
        return JSON.stringify(data, null, 2);
    } catch (error) {
        return error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message || 'Error fetching data';
    }
};

const getSettings = (idInstance, apiTokenInstance) => {
    return fetchAPI(idInstance, apiTokenInstance, 'getSettings');
};

const getStateInstance = (idInstance, apiTokenInstance) => {
    return fetchAPI(idInstance, apiTokenInstance, 'getStateInstance');
};

const sendMessage = (idInstance, apiTokenInstance, message, messagePhone) => {
    return fetchAPI(idInstance, apiTokenInstance, 'sendMessage', 'POST', { message, chatId: messagePhone + '@c.us' });
};

const sendFileByUrl = (idInstance, apiTokenInstance, urlFile, urlFilePhone) => {
    return fetchAPI(idInstance, apiTokenInstance, 'sendFileByUrl', 'POST', { urlFile, chatId: urlFilePhone + '@c.us', fileName: 'testFile' });
};

export { getSettings, getStateInstance, sendMessage, sendFileByUrl };