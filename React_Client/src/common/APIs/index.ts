import { headerJson } from './headers';
import { apiPaths, ApiPaths } from './paths';
import { apiBaseUrls, ApiBaseUrls } from './baseUrls';

export const getBaseUrl = (apiBaseUrl: string) =>
    apiBaseUrls[apiBaseUrl as keyof ApiBaseUrls] ?? '';

export const getPath = (apiPath: string) => apiPaths[apiPath as keyof ApiPaths] ?? '';

export const getUrl = (apiBaseUrl: string, apiUrlPath: string) => {
    const baseUri = getBaseUrl(apiBaseUrl);
    const apiPath = getPath(apiUrlPath);
    return new String(baseUri).concat(apiPath);
};

export { headerJson };
