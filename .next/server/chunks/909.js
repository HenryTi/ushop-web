"use strict";
exports.id = 909;
exports.ids = [909];
exports.modules = {

/***/ 909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7441);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





function User() {
    let router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    let { 0: userObj , 1: setUserObj  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        helpers_services__WEBPACK_IMPORTED_MODULE_1__/* .userService.load */ .W.load();
        setUserObj(helpers_services__WEBPACK_IMPORTED_MODULE_1__/* .userService.user */ .W.user);
    }, []);
    if (!userObj) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
            href: "/auth/login?backurl=" + router.route,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                className: "btn btn-link",
                children: "login"
            })
        });
    }
    let { user  } = userObj;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: "/auth/user",
        children: user
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ })

};
;