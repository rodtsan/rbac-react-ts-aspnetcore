import apiVersion from './versions';

export interface ApiBaseUrls {
    profileBaseUrl?: string;
    messengerBaseUrl?: string;
}

export const apiBaseUrls: ApiBaseUrls = {
    profileBaseUrl: `http://localhost:5000/api/${apiVersion.profileBaseUrl}`,
    messengerBaseUrl: `http://localhost:5002/api/${apiVersion.messengerBaseUrl}`
};
