import getConfig from 'next/config';

import { userService } from './services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

async function action(url: string, requestOptions: RequestInit) {
    let ret = await fetch(url, requestOptions);
    return await handleResponse(ret);
}

async function get(url: string): Promise<any> {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: authHeader(url)
    };
    return await action(url, requestOptions);
}

async function post(url: string, body: any) {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return await action(url, requestOptions);
}

async function put(url: string, body: any) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return await action(url, requestOptions);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return await action(url, requestOptions);
}

// helper functions
function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = userService;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response: Response) {
    let text = await response.text();
    const data = text && JSON.parse(text);

    if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            userService.logout();
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}
