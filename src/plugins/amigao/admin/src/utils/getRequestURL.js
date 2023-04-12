import pluginId from './pluginId';

// const getRequestURL = endPoint => `/${pluginId}/${endPoint}`;
const getRequestURL = endPoint => `/amigao/${endPoint}`;



console.log(getRequestURL());

export default getRequestURL;
