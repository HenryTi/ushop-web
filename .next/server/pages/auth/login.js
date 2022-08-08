"use strict";
(() => {
var exports = {};
exports.id = 344;
exports.ids = [344];
exports.modules = {

/***/ 1881:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Login),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5641);
/* harmony import */ var _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1908);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var helpers_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7441);
/* harmony import */ var tonwa_com__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8287);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hook_form__WEBPACK_IMPORTED_MODULE_2__, _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_3__, tonwa_com__WEBPACK_IMPORTED_MODULE_6__]);
([react_hook_form__WEBPACK_IMPORTED_MODULE_2__, _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_3__, tonwa_com__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function Login({ backurl  }) {
    let router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__.object().shape({
        username: yup__WEBPACK_IMPORTED_MODULE_4__.string().required("Username is required"),
        password: yup__WEBPACK_IMPORTED_MODULE_4__.string().required("Password is required")
    });
    let formOptions = {
        resolver: (0,_hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_3__.yupResolver)(validationSchema)
    };
    const { register , handleSubmit , setError , formState , clearErrors  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)(formOptions);
    const { errors  } = formState;
    async function onSubmit(data) {
        let { username , password  } = data;
        clearErrors("apiError");
        let ret = await helpers_services__WEBPACK_IMPORTED_MODULE_5__/* .userService.login */ .W.login(username, password);
        if (ret === "") {
            setError("apiError", {
                message: "user or password error!"
            });
            return;
        }
        router.push(backurl);
    }
    function Input({ name , type , label  }) {
        let err = errors[name];
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                    children: label
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    name: name,
                    type: type ?? "text",
                    ...register(name),
                    className: `form-control ${err ? "is-invalid" : ""}`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Error, {
                    name: name
                })
            ]
        });
    }
    function Error({ name  }) {
        let err = errors[name];
        if (!err) return null;
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "invalid-feedback",
            children: err?.message
        });
    }
    function RowInput({ name , type , label  }) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "mb-3",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Input, {
                name: name,
                type: type,
                label: label
            })
        });
    }
    function Alert({ name  }) {
        let err = errors[name];
        if (!err) return null;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "alert alert-info text-danger",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(tonwa_com__WEBPACK_IMPORTED_MODULE_6__.FA, {
                    name: "exclamation-circle",
                    className: "me-3"
                }),
                err?.message
            ]
        });
    }
    function Submit() {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            disabled: formState.isSubmitting,
            className: "btn btn-primary",
            children: [
                formState.isSubmitting && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "spinner-border spinner-border-sm mr-1"
                }),
                "Login"
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 mt-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "alert alert-info",
                        children: [
                            "Username: test",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                            "Password: test"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: "card-header",
                                children: "Next.js JWT Login Example"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "card-body",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                    onSubmit: handleSubmit(onSubmit),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RowInput, {
                                            name: "username",
                                            label: "UserName"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RowInput, {
                                            name: "password",
                                            label: "Password",
                                            type: "password"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Alert, {
                                            name: "apiError"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Submit, {})
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row mb-3",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "offset-sm-2",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "btn btn-link",
                            onClick: ()=>alert("forget"),
                            children: "忘记密码"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "btn btn-link",
                            onClick: ()=>alert("register"),
                            children: "注册账号"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex-fill"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex-fill"
            })
        ]
    });
};
const getServerSideProps = async ({ query  })=>{
    return {
        props: {
            backurl: query["backurl"] ?? "/"
        }
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4558:
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 4661:
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5609:
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ 1908:
/***/ ((module) => {

module.exports = import("@hookform/resolvers/yup");;

/***/ }),

/***/ 5641:
/***/ ((module) => {

module.exports = import("react-hook-form");;

/***/ }),

/***/ 4019:
/***/ ((module) => {

module.exports = import("valtio");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [441,12], () => (__webpack_exec__(1881)));
module.exports = __webpack_exports__;

})();