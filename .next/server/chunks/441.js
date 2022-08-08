"use strict";
exports.id = 441;
exports.ids = [441];
exports.modules = {

/***/ 7441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "W": () => (/* reexport */ userService)
});

// EXTERNAL MODULE: external "next/config"
var config_ = __webpack_require__(4558);
var config_default = /*#__PURE__*/__webpack_require__.n(config_);
;// CONCATENATED MODULE: ./helpers/fetch-wrapper.ts


const { publicRuntimeConfig  } = config_default()();
const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};
async function action(url, requestOptions) {
    let ret = await fetch(url, requestOptions);
    return await handleResponse(ret);
}
async function get(url) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(url)
    };
    return await action(url, requestOptions);
}
async function post(url, body) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(url)
        },
        credentials: "include",
        body: JSON.stringify(body)
    };
    return await action(url, requestOptions);
}
async function put(url, body) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(url)
        },
        body: JSON.stringify(body)
    };
    return await action(url, requestOptions);
}
// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(url)
    };
    return await action(url, requestOptions);
}
// helper functions
function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user  } = userService;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return {
            Authorization: `Bearer ${user.token}`
        };
    } else {
        return {};
    }
}
async function handleResponse(response) {
    let text = await response.text();
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if ([
            401,
            403
        ].includes(response.status) && userService.user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            userService.logout();
        }
        const error = data && data.message || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

;// CONCATENATED MODULE: ./helpers/services/user.service.ts

class UserService {
    load() {
        if (true) return;
        let user = localStorage.getItem("user");
        if (user === null) {
            user = undefined;
        } else if (typeof user === "object") {
            user = undefined;
            localStorage.removeItem("user");
        }
        if (user) {
            let token = localStorage.getItem("token");
            if (typeof token !== "string") {
                token = undefined;
            }
            this.user = {
                user,
                token
            };
            this.setCookie();
        }
    }
    setCookie() {
        if (document === undefined) return;
        if (this.user) {
            let { user , token  } = this.user;
            //document.cookie = `user=${user};path=/`;
            document.cookie = `token=${token};path=/`;
        } else {
            //document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
            document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        }
    }
    async login(username, password) {
        let login = await fetchWrapper.post(`/api/auth/login`, {
            username,
            password
        });
        this.user = login;
        let { name , token  } = login;
        if (name) {
            this.setCookie();
            localStorage.setItem("user", name);
            localStorage.setItem("token", token);
        }
        return this.user;
    }
    async logout() {
        localStorage.removeItem("user");
        this.user = undefined;
        this.setCookie();
    }
}
const userService = new UserService();

;// CONCATENATED MODULE: ./helpers/services/index.ts



/***/ })

};
;