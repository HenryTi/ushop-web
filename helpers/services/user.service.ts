import Router from 'next/router'

import { fetchWrapper } from '../fetch-wrapper';

interface User {
    user: string;
    token: string;
}

class UserService {
    load() {
        if (typeof window === 'undefined') return;
        let user = localStorage.getItem('user');
        if (user === null) {
            user = undefined;
        }
        else if (typeof user === 'object') {
            user = undefined;
            localStorage.removeItem('user');
        }
        if (user) {
            let token = localStorage.getItem('token');
            if (typeof token !== 'string') {
                token = undefined;
            }
            this.user = { user, token };
            this.setCookie();
        }
    }
    private setCookie() {
        if (document === undefined) return;
        if (this.user) {
            let { user, token } = this.user;
            //document.cookie = `user=${user};path=/`;
            document.cookie = `token=${token};path=/`;
        }
        else {
            //document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
            document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        }
    }

    user: User;
    async login(username: string, password: string) {
        let login = await fetchWrapper.post(`/api/auth/login`, { username, password });
        this.user = login;
        let { name, token } = login;
        if (name) {
            this.setCookie();
            localStorage.setItem('user', name);
            localStorage.setItem('token', token);
        }
        return this.user;
    }

    async logout() {
        localStorage.removeItem('user');
        this.user = undefined;
        this.setCookie();
    }
}

export const userService = new UserService();
