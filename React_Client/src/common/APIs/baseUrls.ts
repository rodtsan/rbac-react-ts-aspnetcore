import apiVersion from './versions';

export interface ApiBaseUrls {
    profileBaseUrl?: string;
    messengerBaseUrl?: string;
}

export const apiBaseUrls: ApiBaseUrls = {
    profileBaseUrl: `https://localhost:5000/api/${apiVersion.profileBaseUrl}`,
    messengerBaseUrl: `https://localhost:5002/api/${apiVersion.messengerBaseUrl}`
};
