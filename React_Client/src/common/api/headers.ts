import { getAccessToken } from '@store/localStorage';

export const headerJson = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
    'Access-Control-Allow-Origin': '*'
});
