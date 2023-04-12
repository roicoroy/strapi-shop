import pluginId from './pluginId';

// const getRequestURL = endPoint => `/${pluginId}/${endPoint}`;
const getRequestURL = endPoint => `/strapi-plugin-passwordless/${endPoint}`;



console.log(getRequestURL());

export default getRequestURL;
