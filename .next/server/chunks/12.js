"use strict";
exports.id = 12;
exports.ids = [12];
exports.modules = {

/***/ 3338:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports BandContentType, BandFieldError, BandFieldErrors, BandMemo, BandMemos, Band, BandCom */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4019);
/* harmony import */ var _BandContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8085);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8161);
/* harmony import */ var _BandContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1153);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_2__, _BandContext__WEBPACK_IMPORTED_MODULE_3__, _BandContainer__WEBPACK_IMPORTED_MODULE_5__]);
([valtio__WEBPACK_IMPORTED_MODULE_2__, _BandContext__WEBPACK_IMPORTED_MODULE_3__, _BandContainer__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






var BandContentType;
(function(BandContentType) {
    BandContentType[BandContentType["check"] = 0] = "check";
    BandContentType[BandContentType["com"] = 1] = "com";
})(BandContentType || (BandContentType = {}));
function BandFieldError({ error  }) {
    return /*#__PURE__*/ _jsxs("div", {
        className: "px-2 py-1 small",
        children: [
            /*#__PURE__*/ _jsx(FA, {
                name: "exclamation-circle",
                className: "me-2 text-danger"
            }),
            /*#__PURE__*/ _jsx("span", {
                className: "text-info",
                children: error
            })
        ]
    });
}
function BandFieldErrors({ errors  }) {
    if (!errors) return null;
    if (errors.length === 0) return null;
    let arr = [];
    for (let err of errors){
        let { error  } = err;
        let p = arr.findIndex((v)=>v === error);
        if (p < 0) arr.push(error);
    }
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: arr.map((v, index)=>/*#__PURE__*/ _jsx(BandFieldError, {
                error: v
            }, index))
    });
}
function BandMemo({ memo  }) {
    if (typeof memo === "string") {
        return /*#__PURE__*/ _jsxs("div", {
            className: "px-2 py-1 small text-muted",
            children: [
                /*#__PURE__*/ _jsx(FA, {
                    name: "caret-right",
                    className: "me-2"
                }),
                memo
            ]
        });
    }
    return memo;
}
function BandMemos({ memos  }) {
    if (!memos) return null;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: memos.map((v, index)=>/*#__PURE__*/ _jsx(BandMemo, {
                memo: v
            }, index))
    });
}
function buildMemosFromChildren(children) {
    let memos = [];
    function each(cs) {
        React.Children.forEach(cs, (c)=>{
            if (!c) return;
            if (/*#__PURE__*/ React.isValidElement(c) === false) return;
            let e = c;
            let { props  } = e;
            if (props) {
                let { memo  } = props;
                if (memo && typeof memo === "string") memos.push(memo);
                each(props.children);
            }
        });
    }
    each(children);
    if (memos.length === 0) return;
    return memos;
}
function buildDetailChildren(children) {
    let readOnly = true;
    function each(cs) {
        let ret = [];
        React.Children.forEach(cs, (c)=>{
            if (c.type === React.Fragment) {
                debugger;
            }
            if (/*#__PURE__*/ React.isValidElement(c) === false) {
                ret.push(c);
                return;
            }
            let e = c;
            let { props  } = e;
            if (props) {
                let { key  } = e;
                let { name , options  } = props;
                if (!(props.readOnly === true)) readOnly = false;
                if (name) {
                    ret.push(/*#__PURE__*/ _jsx(Value, {
                        name: name,
                        options: options
                    }, key));
                    return;
                }
            }
            if (cs === c) return; // 这里应该不可能的，child 居然 = parent
            ret.push(/*#__PURE__*/ React.createElement(e.type, props, ...each(e)));
            return;
        });
        return ret;
    }
    return [
        each(children),
        readOnly
    ];
}
function Value({ name , options  }) {
    let bandContainer = useBandContainer();
    let { valueResponse , defaultNone  } = bandContainer;
    let snapshop = useSnapshot(valueResponse.values);
    let val = snapshop[name];
    if (options) {
        if (val) {
            let option = options.find((v)=>v.value === val);
            if (option) {
                val = option.label;
            }
        }
    }
    return /*#__PURE__*/ _jsx("div", {
        className: "py-2",
        children: val ?? defaultNone
    });
}
function Band(props) {
    let { label , children , BandTemplate , sep , contentType , onEdit , rightIcon , contentContainerClassName  } = props;
    let content = children;
    let bandContainer = useBandContainer();
    let memos = buildMemosFromChildren(children);
    let { current: band  } = useRef(new BandContext(bandContainer, memos));
    let errors = useSnapshot(band.errors);
    if (!bandContainer) {
        return /*#__PURE__*/ _jsxs("div", {
            children: [
                "Error: ",
                "<Band /> can only be in <Form />"
            ]
        });
    }
    BandTemplate = BandTemplate ?? bandContainer.BandTemplate;
    switch(contentType){
        case BandContentType.com:
            break;
        default:
            if (bandContainer.isDetail === true) {
                switch(contentType){
                    case BandContentType.check:
                        children = /*#__PURE__*/ _jsx("div", {
                            className: "py-2",
                            children: children
                        });
                        break;
                    default:
                        let [newChildren, readOnly] = buildDetailChildren(children);
                        children = /*#__PURE__*/ _jsx(_Fragment, {
                            children: newChildren
                        });
                        if (readOnly === true) band.readOnly = true;
                        else if (bandContainer.readOnly === true) {
                            band.readOnly = true;
                        }
                        break;
                }
            }
            break;
    }
    return /*#__PURE__*/ _jsx(VBandContext.Provider, {
        value: band,
        children: /*#__PURE__*/ _jsx(BandTemplate, {
            label: label,
            errors: errors,
            memos: band.memos,
            content: content,
            sep: sep,
            contentType: contentType,
            onEdit: onEdit,
            rightIcon: rightIcon,
            contentContainerClassName: contentContainerClassName,
            children: children
        })
    });
}
function BandCom(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        contentType: BandContentType.com,
        children: props.children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1153:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports BandContainerContext, VBandContainerContext, useBandContainer */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4019);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_1__]);
valtio__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const defaultStringClassName = "form-control";
const defaultCheckClassName = "form-check-input";
const defaultSelectClassName = "form-select";
const defaultPickClassName = "form-control";
const defaultRangeClassName = "form-range";
class BandContainerContext {
    defaultStringClassName = defaultStringClassName;
    defaultCheckClassName = defaultCheckClassName;
    defaultSelectClassName = defaultSelectClassName;
    defaultPickClassName = defaultPickClassName;
    defaultRangeClassName = defaultRangeClassName;
    defaultNone = "-";
    constructor(props){
        let { values , BandTemplate , readOnly  } = props;
        this.bands = [];
        this.BandTemplate = BandTemplate;
        this.props = props;
        this.readOnly = readOnly;
        this.valueResponse = proxy({
            values: values ?? {}
        });
        this.fields = {};
        this.fieldStates = {};
        let each = (cs)=>{
            React.Children.forEach(cs, (c)=>{
                if (!c) return;
                if (/*#__PURE__*/ React.isValidElement(c) === false) return;
                let e = c;
                let { props: cProps  } = e;
                if (cProps) {
                    let { name  } = cProps;
                    if (name) this.fieldStates[name] = proxy({
                        readOnly: false,
                        disabled: false
                    });
                    each(cProps.children);
                }
            });
        };
        each(props.children);
    }
    onValuesChanged = async (values)=>{
        let oldValues = this.valueResponse.values;
        for(let i in values){
            let vNew = values[i];
            let vOld = oldValues[i];
            if (vNew !== vOld) {
                await this.props.onValuesChanged?.({
                    name: i,
                    value: vNew,
                    preValue: vOld
                }, this);
                oldValues[i] = vNew;
            }
        }
    };
    setValue(name, value) {
        let values = {};
        values[name] = value;
        this.onValuesChanged(values);
        this.valueResponse.values[name] = value;
    }
    setError(name, err) {
        let hasError = false;
        for (let band of this.bands){
            band.setError(name, err);
            if (hasError === false) {
                hasError = band.errors.length > 0;
            }
        }
        return hasError;
    }
    clearError(name) {
        let hasError = false;
        for (let band of this.bands){
            band.clearError(name);
            if (hasError === false) {
                hasError = band.errors.length > 0;
            }
        }
        return hasError;
    }
    clearAllErrors() {
        for (let band of this.bands){
            band.clearAllErrors();
        }
    }
    setReadonly(name, readOnly) {
        let fieldState = this.fieldStates[name];
        if (fieldState) fieldState.readOnly = readOnly;
    }
    setDisabled(name, disabled) {
        let fieldState = this.fieldStates[name];
        if (fieldState) fieldState.disabled = disabled;
    }
}
const VBandContainerContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
function useBandContainer() {
    return useContext(VBandContainerContext);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8085:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports BandContext, VBandContext, useBand */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4019);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_1__]);
valtio__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


class BandContext {
    readOnly = false;
    constructor(container, memos){
        this.container = container;
        this.errors = proxy([]);
        this.memos = memos;
        this.fields = {};
        container?.bands.push(this);
    }
    setError(name, error) {
        if (this.fields[name] === true) {
            if (error) {
                for (let err of error){
                    this.errors.push({
                        name,
                        error: err
                    });
                }
            }
        }
    }
    clearError(name) {
        let last = this.errors.length - 1;
        for(let i = last; i >= 0; i--){
            let err = this.errors[i];
            if (err.name === name) {
                this.errors.splice(i, 1);
            }
        }
    }
    clearAllErrors() {
        this.errors.splice(0);
    }
}
const VBandContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
function useBand() {
    return useContext(VBandContext);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5446:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _Band__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3338);
/* harmony import */ var _BandContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1153);
/* harmony import */ var _BandContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8085);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Band__WEBPACK_IMPORTED_MODULE_0__, _BandContainer__WEBPACK_IMPORTED_MODULE_1__, _BandContext__WEBPACK_IMPORTED_MODULE_2__]);
([_Band__WEBPACK_IMPORTED_MODULE_0__, _BandContainer__WEBPACK_IMPORTED_MODULE_1__, _BandContext__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "KX": () => (/* reexport */ EasyDate),
  "FA": () => (/* reexport */ FA_FA),
  "pA": () => (/* reexport */ LMR)
});

// UNUSED EXPORTS: ButtonAsync, EasyTime, IconText, MutedSmall, SearchBox, Sep, Spinner, StackedFA, VDate

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./tonwa-com/coms/FA.tsx


function FA_FA(props) {
    let { name , className , size , spin , fixWidth , border , pull , pulse , rotate , flip , inverse  } = props;
    let cn = "fa";
    if (className) cn += " " + className;
    if (name) cn += " fa-" + name;
    if (size) cn += " fa-" + size;
    if (fixWidth) cn += " fa-fw";
    if (border) cn += " fa-border";
    if (pull) cn += " fa-pull-" + pull;
    if (spin) cn += " fa-spin";
    if (pulse) cn += " fa-pulse";
    if (rotate) cn += " fa-rotate-" + rotate;
    if (flip) cn += " fa-flip-" + flip;
    if (inverse) cn += " fa-inverse";
    return /*#__PURE__*/ jsx_runtime_.jsx("i", {
        className: cn
    });
}
function StackedFA(props) {
    let { className , size , children  } = props;
    let cn = "fa-stack ";
    if (className) cn += className + " ";
    if (size) cn += " fa-" + size + " ";
    return /*#__PURE__*/ _jsx("span", {
        className: cn,
        children: children
    });
}

;// CONCATENATED MODULE: ./tonwa-com/coms/LMR.tsx


function LMR(props) {
    let { className , children , onClick  } = props;
    let cn = className ?? "";
    if (onClick !== undefined) cn += " cursor-pointer ";
    let arr = external_react_.Children.toArray(children);
    let len = arr.length;
    if (len > 1) {
        arr.splice(len - 1, 0, /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "me-auto"
        }));
    }
    /*
    if (len > 1) {
        let el = arr[len - 2];
        let elNew: any;
        if (typeof el === 'string') {
            elNew = <div className="flex-grow-1">{el}</div>;
        }
        else {
            let { props } = el as React.ReactElement;
            let propsCn = (props?.className ?? '') + ' flex-grow-1 ';
            elNew = React.cloneElement(el as React.ReactElement, { className: propsCn });
        }
        arr.splice(len - 2, 1, elNew);
    }
    */ return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "d-flex " + cn,
        onClick: onClick,
        children: arr.map((v, index)=>/*#__PURE__*/ jsx_runtime_.jsx(external_react_.Fragment, {
                children: v
            }, index))
    });
}

;// CONCATENATED MODULE: ./tonwa-com/coms/Spinner.tsx

function Spinner({ size , className  }) {
    let sz = `${(Number(size ?? 2) + 1) * 0.5}em`;
    let style = {
        width: sz,
        height: sz
    };
    let cn = "spinner-border " + (className ?? "");
    return /*#__PURE__*/ _jsx("div", {
        className: cn,
        role: "status",
        style: style,
        children: /*#__PURE__*/ _jsx("span", {
            className: "visually-hidden",
            children: "Loading..."
        })
    });
}

;// CONCATENATED MODULE: ./tonwa-com/coms/ButtonAsync.tsx




function ButtonAsync(props) {
    const { 0: isWaiting , 1: setIsWaiting  } = useState(false);
    let { children , onClick  } = props;
    let isMounted = useRef(false);
    let newOnClick;
    useEffect(()=>{
        isMounted.current = true;
        return ()=>{
            isMounted.current = false;
        };
    });
    if (onClick) {
        newOnClick = async (evt)=>{
            setIsWaiting(true);
            try {
                await onClick(evt);
            } catch (err) {
                console.error(err);
                throw err;
            } finally{
                if (isMounted.current === true) {
                    setIsWaiting(false);
                }
            }
        };
    }
    if (isWaiting === true) {
        let { className  } = props;
        className = (className ?? "") + " position-relative";
        let style = {
            zIndex: 30001,
            background: "rgba(0, 0, 0, 0.3)",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        return /*#__PURE__*/ _jsxs("button", {
            ...props,
            disabled: true,
            className: className,
            children: [
                children,
                /*#__PURE__*/ _jsx("div", {
                    className: "d-flex position-absolute align-items-center justify-content-center",
                    style: style,
                    children: /*#__PURE__*/ _jsx("i", {
                        className: "fa fa-spinner fa-spin"
                    })
                })
            ]
        });
    } else {
        return /*#__PURE__*/ _jsx("button", {
            ...props,
            onClick: newOnClick,
            children: children
        });
    }
}

;// CONCATENATED MODULE: ./tonwa-com/coms/MutedSmall.tsx


function MutedSmall({ className , children  }) {
    return /*#__PURE__*/ _jsx("small", {
        className: "text-muted " + (className ?? ""),
        children: children
    });
}

;// CONCATENATED MODULE: ./tonwa-com/coms/Sep.tsx


function Sep({ sep , className , children  }) {
    if (sep === null) return null;
    className = className ?? "";
    if (typeof sep === "number") {
        className += " border-top border-" + sep;
    } else if (/*#__PURE__*/ React.isValidElement(sep) === true) {
        children = /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                sep,
                children
            ]
        });
    }
    if (!children) {
        className += " border-top border-1";
    }
    return /*#__PURE__*/ _jsx("div", {
        className: className,
        children: children
    });
}

// EXTERNAL MODULE: ./tonwa-com/tools/index.ts + 7 modules
var tools = __webpack_require__(7574);
;// CONCATENATED MODULE: ./tonwa-com/coms/SearchBox.tsx



function SearchBox(props) {
    let { className , inputClassName , onFocus , label , placeholder , buttonText , maxLength , size  } = props;
    let input;
    let button;
    let key = null;
    function onChange(evt) {
        key = evt.target.value;
        if (key !== undefined) {
            key = key.trim();
            if (key === "") key = undefined;
        }
        console.log("key = " + key);
        if (props.allowEmptySearch === true) {} else {
            button.disabled = key === undefined || key.length === 0;
        }
    }
    async function onSubmit(evt) {
        evt.preventDefault();
        if (key === null) key = props.initKey || "";
        if (props.allowEmptySearch !== true) {
            if (!key) return;
            if (input) input.disabled = true;
            if (button) button.disabled = true;
        }
        await props.onSearch(key);
        if (input) input.disabled = false;
        if (button) button.disabled = false;
    }
    let inputSize;
    switch(size){
        default:
        case "sm":
            inputSize = "input-group-sm";
            break;
        case "md":
            inputSize = "input-group-md";
            break;
        case "lg":
            inputSize = "input-group-lg";
            break;
    }
    let autoComplete;
    if (env.isMobile === true) autoComplete = "off";
    return /*#__PURE__*/ _jsx("form", {
        className: className,
        onSubmit: onSubmit,
        autoComplete: autoComplete,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "input-group " + inputSize,
            children: [
                label && /*#__PURE__*/ _jsx("div", {
                    className: "input-group-addon align-self-center me-2",
                    children: label
                }),
                /*#__PURE__*/ _jsx("input", {
                    ref: (v)=>input = v,
                    onChange: onChange,
                    type: "text",
                    name: "key",
                    onFocus: onFocus,
                    className: "form-control " + (inputClassName ?? "border-primary"),
                    placeholder: placeholder,
                    defaultValue: props.initKey,
                    maxLength: maxLength
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "input-group-append",
                    children: /*#__PURE__*/ _jsxs("button", {
                        ref: (v)=>button = v,
                        className: "btn btn-primary",
                        type: "submit",
                        disabled: props.allowEmptySearch !== true,
                        children: [
                            /*#__PURE__*/ _jsx("i", {
                                className: "fa fa-search"
                            }),
                            /*#__PURE__*/ _jsx("i", {
                                className: "fa"
                            }),
                            buttonText
                        ]
                    })
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./tonwa-com/res/index.ts + 5 modules
var res = __webpack_require__(3324);
;// CONCATENATED MODULE: ./tonwa-com/coms/EasyDate.tsx



//type YMD = (year:number, month:number, date:number) => string;
//type MD = (month:number, date:number) => string;
/*
const timeRes: { [prop: string]: any } = {
    md: (month: number, date: number) => `${month}-${date}`,
    ymd: (year: number, month: number, date: number) => `${year}-${month}-${date}`,
    yesterday: 'Yday',
    today: 'Today',
    tomorrow: 'Tmw',
    $zh: {
        md: (month: number, date: number) => `${month}月${date}日`,
        ymd: (year: number, month: number, date: number) => `${year}年${month}月${date}日`,
        yesterday: '昨天',
        today: '今天',
        tomorrow: '明天',
    },
    $en: {
        md: (month: number, date: number) => `${month}-${date}`,
        ymd: (year: number, month: number, date: number) => `${year}-${month}-${date}`,
        yesterday: 'Yday',
        today: 'Today',
        tomorrow: 'Tmw',
    }
}
*/ //setRes(timeRes, timeRes);
function tt(str) {
    return res/* resStrings */.Ju[str];
}
function renderDate(vDate, withTime, always = false) {
    if (!vDate) return null;
    let date;
    switch(typeof vDate){
        default:
            date = vDate;
            break;
        case "string":
            date = new Date(vDate);
            break;
        case "number":
            date = new Date(vDate * 1000);
            break;
    }
    let now = new Date();
    let tick, nDate, _date, month, year, nowYear;
    let d = date;
    tick = now.getTime() - d.getTime();
    let hour = d.getHours(), minute = d.getMinutes();
    nDate = now.getDate();
    _date = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    nowYear = now.getFullYear();
    let appendTime = false;
    let dPart = function() {
        if (tick < -24 * 3600 * 1000) {
            if (year === nowYear) {
                appendTime = true;
                return res/* resFuncs.time_md */.iN.time_md(month, _date);
            } else {
                appendTime = true;
                return res/* resFuncs.time_ymd */.iN.time_ymd(year, month, _date);
            }
        }
        if (tick < 24 * 3600 * 1000) {
            if (_date !== nDate) {
                appendTime = true;
                return tt(tick < 0 ? res/* EnumString.time_tomorrow */.fX.time_tomorrow : res/* EnumString.time_yesterday */.fX.time_yesterday);
            }
            if (withTime === true) {
                appendTime = true;
                return "";
            }
            return tt(res/* EnumString.time_today */.fX.time_today);
        }
        if (year === nowYear) {
            return res/* resFuncs.time_md */.iN.time_md(month, _date);
        }
        return res/* resFuncs.time_ymd */.iN.time_ymd(year, month, _date);
    }();
    let hm = hour + ((minute < 10 ? ":0" : ":") + minute);
    /*
    if (tick < -24*3600*1000) {
        if (year === nowYear)
            return tt('md')(month, _date) + ' ' + hm;
        else
            return tt('ymd')(year, month, _date) + ' ' + hm;
    }
    if (always === true || tick < 24*3600*1000) {
        return _date!==nDate? 
            tt(tick < 0? 'tomorrow' : 'yesterday') + ' ' + hm 
            : withTime===true? hm : tt('today');
    }
    if (year === nowYear) {
        return tt('md')(month, _date);
    }
    return tt('ymd')(year, month, _date);
    */ if (appendTime === true || always === true) {
        return dPart + " " + hm;
    }
    return dPart;
}
function EasyDate(props) {
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: renderDate(props.date, false)
    });
}
function EasyTime(props) {
    let { date , always  } = props;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: renderDate(date, true, always)
    });
}
const VDate = (props)=>{
    let { date , hideTime , hideSameYear  } = props;
    let year = date.getFullYear();
    let vTime;
    if (hideTime !== true) {
        vTime = /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                date.getHours(),
                ":",
                String(100 + date.getMinutes()).substr(1, 2)
            ]
        });
    }
    let vDate = /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            date.getMonth() + 1,
            "-",
            date.getDate()
        ]
    });
    if (hideSameYear === true && year === new Date().getFullYear()) {} else {
        vDate = /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                year,
                "-",
                vDate
            ]
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            vDate,
            " ",
            vTime
        ]
    });
};

;// CONCATENATED MODULE: ./tonwa-com/coms/IconText.tsx



class IconText extends external_react_.Component {
    render() {
        let { icon , iconClass , text , textClass , onClick  } = this.props;
        return /*#__PURE__*/ _jsxs("div", {
            className: "py-2",
            onClick: onClick,
            children: [
                /*#__PURE__*/ _jsx(FA, {
                    className: iconClass,
                    name: icon,
                    fixWidth: true
                }),
                /*#__PURE__*/ _jsx("span", {
                    className: textClass,
                    children: text
                })
            ]
        });
    }
}

;// CONCATENATED MODULE: ./tonwa-com/coms/index.ts











/***/ }),

/***/ 6781:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export PickPage */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1903);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8996);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_page__WEBPACK_IMPORTED_MODULE_1__]);
_page__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function PickPage({ header , className , ItemView , items , top , bottom  }) {
    let nav = useNav();
    function onItemClick(item) {
        nav.returnCall(item);
        return;
    }
    return /*#__PURE__*/ _jsxs(Page, {
        header: header,
        children: [
            top,
            /*#__PURE__*/ _jsx(List, {
                className: className ?? "my-1 border-top border-bottom border-2",
                items: items,
                ItemView: ItemView,
                onItemClick: onItemClick
            }),
            bottom
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8322:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export PickQueryPage */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PickPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6781);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_PickPage__WEBPACK_IMPORTED_MODULE_2__]);
_PickPage__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function PickQueryPage(props) {
    let { query  } = props;
    let { 0: items , 1: setItems  } = useState(undefined);
    useEffect(()=>{
        async function load() {
            let ret = await query();
            setItems(ret);
        }
        load();
    }, [
        query
    ]);
    return /*#__PURE__*/ _jsx(PickPage, {
        ...props,
        items: items
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8603:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _PickPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6781);
/* harmony import */ var _PickQueryPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8322);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_PickPage__WEBPACK_IMPORTED_MODULE_0__, _PickQueryPage__WEBPACK_IMPORTED_MODULE_1__]);
([_PickPage__WEBPACK_IMPORTED_MODULE_0__, _PickQueryPage__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 945:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports useDetail, Detail */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8161);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5791);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1903);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5446);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_form__WEBPACK_IMPORTED_MODULE_3__, _page__WEBPACK_IMPORTED_MODULE_4__, _band__WEBPACK_IMPORTED_MODULE_5__]);
([_form__WEBPACK_IMPORTED_MODULE_3__, _page__WEBPACK_IMPORTED_MODULE_4__, _band__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






class DetailContext extends (/* unused pure expression or super */ null && (BandContainerContext)) {
    get isDetail() {
        return true;
    }
}
const DetailContextContainer = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
function useDetail() {
    return useContext(DetailContextContainer);
}
function Detail(props) {
    let { className , children , BandTemplate  } = props;
    BandTemplate = BandTemplate ?? DefaultBandTemplate;
    let { current: detailContext  } = useRef(new DetailContext({
        ...props,
        BandTemplate
    }));
    return /*#__PURE__*/ _jsx(DetailContextContainer.Provider, {
        value: detailContext,
        children: /*#__PURE__*/ _jsx(VBandContainerContext.Provider, {
            value: detailContext,
            children: /*#__PURE__*/ _jsx("div", {
                className: className,
                children: children
            })
        })
    });
}
function DefaultBandTemplate(props) {
    let nav = useNav();
    let bandContainer = useBandContainer();
    let band = useBand();
    let { label , children , errors , memos , onEdit , content , sep , contentType , rightIcon  } = props;
    let labelContent = contentType === BandContentType.check ? null : /*#__PURE__*/ _jsx("b", {
        children: label
    });
    let vLabel = /*#__PURE__*/ _jsx("label", {
        className: "col-sm-2 col-form-label text-sm-end tonwa-bg-gray-1 border-end align-self-center py-3",
        children: labelContent
    });
    let cnContent = "col-sm-10 d-flex pe-0 align-items-center";
    function RightIcon({ icon , onEdit  }) {
        return /*#__PURE__*/ _jsx("div", {
            onClick: onEdit,
            className: "px-3 align-self-stretch d-flex align-items-center cursor-pointer",
            children: icon ?? /*#__PURE__*/ _jsx(FA, {
                name: "pencil",
                className: "text-info"
            })
        });
    }
    if (band.readOnly === true) {
        rightIcon = null;
    } else if (contentType === BandContentType.com) {
        if (onEdit) {
            rightIcon = /*#__PURE__*/ _jsx(RightIcon, {
                onEdit: onEdit,
                icon: rightIcon
            });
        }
    } else {
        onEdit = onEdit ?? async function() {
            nav.open(/*#__PURE__*/ _jsx(ValueEditPage, {
                label: label,
                content: content,
                values: {
                    ...bandContainer.valueResponse.values
                },
                onValuesChanged: bandContainer.onValuesChanged
            }));
        };
        rightIcon = /*#__PURE__*/ _jsx(RightIcon, {
            onEdit: onEdit,
            icon: rightIcon
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Sep, {
                sep: sep
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "row bg-white mx-0",
                children: [
                    vLabel,
                    /*#__PURE__*/ _jsxs("div", {
                        className: cnContent,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex-grow-1",
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        children: children
                                    }),
                                    /*#__PURE__*/ _jsx(BandFieldErrors, {
                                        errors: errors
                                    }),
                                    /*#__PURE__*/ _jsx(BandMemos, {
                                        memos: memos
                                    })
                                ]
                            }),
                            rightIcon
                        ]
                    })
                ]
            })
        ]
    });
}
function ValueEditPage({ content , label , values , onValuesChanged  }) {
    let nav = useNav();
    async function onSubmit(data) {
        await onValuesChanged(data);
        nav.close();
    }
    return /*#__PURE__*/ _jsx(Page, {
        header: label,
        back: "close",
        children: /*#__PURE__*/ _jsxs(Form, {
            className: "container px-3 py-3",
            values: values,
            BandTemplate: ValueEditBandTemplate,
            children: [
                /*#__PURE__*/ _jsx(Band, {
                    children: content
                }),
                /*#__PURE__*/ _jsx(Submit, {
                    onSubmit: onSubmit
                })
            ]
        })
    });
}
function ValueEditBandTemplate(props) {
    let { children , errors , memos  } = props;
    return /*#__PURE__*/ _jsxs("div", {
        className: "bg-white mb-3",
        children: [
            children,
            /*#__PURE__*/ _jsx(BandFieldErrors, {
                errors: errors
            }),
            /*#__PURE__*/ _jsx(BandMemos, {
                memos: memos
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export LabelBand */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tonwa_com__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8287);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([tonwa_com__WEBPACK_IMPORTED_MODULE_1__]);
tonwa_com__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function LabelBand({ label , children , rightIcon , onEdit  }) {
    return /*#__PURE__*/ _jsxs("div", {
        className: "row bg-white mx-0",
        children: [
            label ? /*#__PURE__*/ _jsx("label", {
                className: "col-sm-2 col-form-label text-sm-end tonwa-bg-gray-1 border-end align-self-center py-3",
                children: /*#__PURE__*/ _jsx("b", {
                    children: label
                })
            }) : /*#__PURE__*/ _jsx("label", {
                className: "col-sm-2 py-3"
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "col-sm-10 d-flex pe-0 align-items-center",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "flex-grow-1",
                        children: /*#__PURE__*/ _jsx("div", {
                            children: children
                        })
                    }),
                    (onEdit || rightIcon) && /*#__PURE__*/ _jsx("div", {
                        onClick: onEdit,
                        className: "px-3 align-self-stretch d-flex align-items-center cursor-pointer",
                        children: rightIcon ?? /*#__PURE__*/ _jsx(FA, {
                            name: "pencil",
                            className: "text-info"
                        })
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5439:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _Detail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945);
/* harmony import */ var _LabelBand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7869);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Detail__WEBPACK_IMPORTED_MODULE_0__, _LabelBand__WEBPACK_IMPORTED_MODULE_1__]);
([_Detail__WEBPACK_IMPORTED_MODULE_0__, _LabelBand__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6319:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports CharInput, CharInputBase */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var _Rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(525);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4019);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_4__]);
([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





class CharFieldItem {
    constructor(name, input, initValue){
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset() {
        if (!this.input) return;
        this.input.value = this.initValue ?? "";
    }
}
function CharInput(props) {
    let bandContainer = useBandContainer();
    let { name  } = props;
    let initValue = bandContainer?.props.values?.[name];
    return /*#__PURE__*/ _jsx(CharInputBase, {
        ...props,
        initValue: initValue
    });
}
function CharInputBase({ name , className , readOnly , placeholder , maxLength , rule , isValidKey , initValue , type , disabled  }) {
    let input = useRef();
    let { 0: hasError , 1: setHasError  } = useState(false);
    let band = useBand();
    let bandContainer = useBandContainer();
    let { props , fields , fieldStates  } = bandContainer;
    let fieldState = useSnapshot(fieldStates[name]);
    readOnly = ((readOnly ?? fieldState?.readOnly) ?? props.readOnly) ?? false;
    useEffect(()=>{
        if (!band) return;
        let { fields: bandFields  } = band;
        bandFields[name] = true;
        let { props , fieldStates  } = bandContainer;
        fields[name] = new CharFieldItem(name, input.current, props.values?.[name]);
        Object.assign(fieldStates[name], {
            readOnly,
            disabled
        });
    }, [
        band,
        bandContainer,
        name,
        fields,
        disabled,
        readOnly
    ]);
    let cn = ((className ?? props.stringClassName) ?? bandContainer.defaultStringClassName) ?? "";
    if (hasError === true) cn += " is-invalid";
    if (readOnly === true) {
        return /*#__PURE__*/ _jsx("div", {
            className: cn + " bg-light text-muted",
            children: initValue ?? bandContainer.defaultNone
        });
    }
    let onFocus = ()=>{
        bandContainer.clearError(name);
        setHasError(false);
    };
    let onBlur = ()=>{
        let err = checkRule(input.current.value, rule);
        bandContainer.setError(name, err);
        let has = !(err === undefined);
        setHasError(has);
    };
    let onChange = (evt)=>{
        bandContainer.setValue(name, evt.currentTarget.value);
    };
    let onBeforeInput = (evt)=>{
        if (!isValidKey) return true;
        if (isValidKey(evt.data) === false) {
            evt.preventDefault();
            return false;
        }
    };
    return /*#__PURE__*/ _jsx("input", {
        ref: input,
        name: name,
        type: type ?? "text",
        className: cn,
        disabled: fieldState?.disabled,
        readOnly: readOnly,
        onFocus: onFocus,
        onBlur: onBlur,
        onBeforeInput: onBeforeInput,
        onChange: onChange,
        placeholder: placeholder,
        maxLength: maxLength,
        defaultValue: initValue
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2742:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Check, BandCheck */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4019);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__]);
([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




class CheckFieldItem {
    constructor(name, input, indeterminate, initChecked){
        this.name = name;
        this.input = input;
        this.indeterminate = indeterminate;
        this.initChecked = initChecked;
    }
    reset() {
        if (!this.input) return;
        this.input.indeterminate = this.indeterminate;
        this.input.checked = this.initChecked;
    }
}
function CheckInput({ name , id , readOnly , indeterminate , checkedValue , uncheckedValue  }) {
    let input = useRef();
    let band = useBand();
    let bandContainer = useBandContainer();
    let { props , valueResponse  } = bandContainer;
    let snapShotValues = useSnapshot(valueResponse.values);
    let initChecked = snapShotValues?.[name] === (checkedValue ?? true);
    let onClick;
    let checked;
    if (bandContainer.isDetail === true) {
        checked = initChecked;
        initChecked = undefined;
        onClick = (evt)=>{
            evt.preventDefault();
            return false;
        };
    }
    useEffect(()=>{
        if (indeterminate === true) {
            input.current.indeterminate = true;
        }
        if (band) {
            let { fields: bandFields  } = band;
            bandFields[name] = true;
        }
        let { props , fields  } = bandContainer;
        let initChecked = props.values?.[name] === (checkedValue ?? true);
        fields[name] = new CheckFieldItem(name, input.current, indeterminate, initChecked);
    }, [
        band,
        bandContainer,
        name,
        indeterminate,
        checkedValue
    ]);
    function onChange(evt) {
        let val;
        let t = evt.currentTarget;
        if (t.indeterminate === true) val = undefined;
        else {
            val = t.checked ? checkedValue ?? true : uncheckedValue ?? false;
        }
        bandContainer.setValue(name, val);
    }
    return /*#__PURE__*/ _jsx("input", {
        ref: input,
        name: name,
        type: "checkbox",
        id: id,
        className: props.checkClassName ?? bandContainer.defaultCheckClassName,
        disabled: (readOnly ?? props.readOnly) ?? false,
        onChange: onChange,
        onClick: onClick,
        checked: checked,
        defaultChecked: initChecked
    });
}
function Check(props) {
    let { label  } = props;
    let id = `_${props.name}_${Date.now()}`;
    return /*#__PURE__*/ _jsxs("div", {
        className: props.className ?? "form-check",
        children: [
            /*#__PURE__*/ _jsx(CheckInput, {
                ...props,
                id: id
            }),
            /*#__PURE__*/ _jsx("label", {
                className: "form-check-label",
                htmlFor: id,
                children: label
            })
        ]
    });
}
function BandCheck(props) {
    let { label  } = props;
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        label: undefined,
        contentType: BandContentType.check,
        children: /*#__PURE__*/ _jsx(Check, {
            ...props,
            label: label
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2396:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports DatePicker, TimePicker, BandDatePicker, BandTimePicker */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var _Rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(525);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__]);
_band__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




class DTFieldItem {
    constructor(name, input, initValue){
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset() {
        if (!this.input) return;
        if (!this.initValue) {
            this.input.value = undefined;
        } else {
            this.input.value = this.initValue;
        }
    }
}
function Picker(props) {
    let input = useRef();
    let band = useBand();
    let bandContainer = useBandContainer();
    let { 0: hasError , 1: setHasError  } = useState(false);
    useEffect(()=>{
        let { fields  } = bandContainer;
        let { name  } = props;
        let fieldItem = new DTFieldItem(name, input.current, bandContainer.props.values?.[name]);
        if (band) {
            band.fields[name] = true;
        }
        fields[name] = fieldItem;
    }, [
        band,
        bandContainer,
        input,
        props
    ]);
    let { name , className , readOnly , type , rule  } = props;
    let { props: formProps  } = bandContainer;
    readOnly = readOnly ?? formProps.readOnly;
    let initValue = bandContainer.props.values?.[name];
    let cn = ((className ?? formProps.stringClassName) ?? bandContainer.defaultStringClassName) ?? "";
    if (hasError === true) cn += " is-invalid";
    let onFocus = ()=>{
        bandContainer.clearError(name);
        setHasError(false);
    };
    let onBlur = ()=>{
        let err = checkRule(input.current.value, rule);
        bandContainer.setError(name, err);
        let has = !(err === undefined);
        setHasError(has);
    };
    function onChange(evt) {
        let val = evt.currentTarget.value;
        bandContainer.setValue(name, val);
    }
    if (readOnly === true) {
        return /*#__PURE__*/ _jsx("div", {
            className: className ?? bandContainer.defaultStringClassName,
            children: initValue ?? bandContainer.defaultNone
        });
    }
    return /*#__PURE__*/ _jsx("input", {
        ref: input,
        type: type,
        defaultValue: bandContainer.props.values?.[name],
        className: cn,
        onBlur: onBlur,
        onFocus: onFocus,
        onChange: onChange
    });
}
function DatePicker(props) {
    return /*#__PURE__*/ _jsx(Picker, {
        ...props,
        type: "date"
    });
}
function TimePicker(props) {
    return /*#__PURE__*/ _jsx(Picker, {
        ...props,
        type: "time"
    });
}
function BandDatePicker(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(DatePicker, {
            ...props
        })
    });
}
function BandTimePicker(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(TimePicker, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1960:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Decimal, BandDecimal, Int, BandInt */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5446);
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3324);
/* harmony import */ var _CharInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6319);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_3__]);
([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function appendRule(rules, ...ruleArr) {
    let ret = [
        ...ruleArr
    ];
    if (rules) {
        ret.push(...Array.isArray(rules) === true ? rules : [
            rules
        ]);
    }
    return ret;
}
function isValidNumber(val, excludeChars) {
    val = val.trim();
    if (val.length === 0) return;
    let r = Number.parseFloat(val);
    if (isNaN(r) === true) return false;
    if (val.indexOf("+") > 0 || val.indexOf("-") > 0) return false;
    let sr = String(r);
    let len = excludeChars.length;
    for(let i = 0; i < len; i++){
        let ec = excludeChars[i];
        if (sr.indexOf(ec) >= 0) return false;
    }
    return true;
}
function belowMin(val, min) {
    if (min === undefined || min === null) return false;
    let r = Number.parseFloat(val);
    if (isNaN(r) === true) return false;
    return r < min;
}
function overMax(val, max) {
    if (max === undefined || max === null) return false;
    let r = Number.parseFloat(val);
    if (isNaN(r) === true) return false;
    return r > max;
}
const intChars = "01234567890-+";
const decChars = intChars + ".";
function NumberInput(props) {
    let { placeholder , maxLength , rule , min , max , chars , excludeChars  } = props;
    function isValidKey(key) {
        return chars.indexOf(key) >= 0;
    }
    function mustBeDecimal(val) {
        if (isValidNumber(val, excludeChars) === false) {
            return resStrings[EnumString.rule_mustBeDecimal];
        }
    }
    function ruleMin(val) {
        if (belowMin(val, min) === true) {
            return resStrings[EnumString.rule_belowMin] + min;
        }
    }
    function ruleMax(val) {
        if (overMax(val, max) === true) {
            return resStrings[EnumString.rule_overMax] + max;
        }
    }
    return /*#__PURE__*/ _jsx(CharInput, {
        placeholder: placeholder,
        maxLength: maxLength,
        isValidKey: isValidKey,
        rule: appendRule(rule, mustBeDecimal, ruleMin, ruleMax),
        ...props
    });
}
function Decimal(props) {
    return /*#__PURE__*/ _jsx(NumberInput, {
        ...props,
        chars: decChars,
        excludeChars: "e"
    });
}
function BandDecimal(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Decimal, {
            ...props
        })
    });
}
function Int(props) {
    return /*#__PURE__*/ _jsx(NumberInput, {
        ...props,
        chars: intChars,
        excludeChars: ".e"
    });
}
function BandInt(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Int, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 526:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Password, BandPassword */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5446);
/* harmony import */ var _CharInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6319);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_2__]);
([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function Password(props) {
    let { placeholder , maxLength  } = props;
    return /*#__PURE__*/ _jsx(CharInput, {
        placeholder: placeholder,
        maxLength: maxLength,
        ...props,
        type: "password"
    });
}
function BandPassword(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Password, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1463:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Pick, BandPick */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8161);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5446);
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3324);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_3__]);
_band__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





class PickFieldItem {
    constructor(name){
        this.name = name;
    }
    reset() {}
}
function Pick(props) {
    let band = useBand();
    let bandContainer = useBandContainer();
    let { 0: value , 1: setValue  } = useState();
    useEffect(()=>{
        let { name  } = props;
        if (band) band.fields[name] = true;
        bandContainer.fields[name] = new PickFieldItem(name /*, val*/ );
    }, [
        band,
        bandContainer,
        props
    ]);
    let { props: formProps , valueResponse  } = bandContainer;
    let { name , className , onPick , placeholder , readOnly , Value  } = props;
    readOnly = readOnly ?? formProps.readOnly;
    value = value ?? bandContainer.props.values?.[name];
    let cn = "d-flex ";
    let vRight;
    let onClick;
    let vValue;
    if (readOnly !== true) {
        cn += " cursor-pointer ";
        vRight = /*#__PURE__*/ _jsx("div", {
            children: /*#__PURE__*/ _jsx(FA, {
                name: "angle-right"
            })
        });
        onClick = async function() {
            let ret = await onPick(value);
            valueResponse.values[name] = ret;
            setValue(ret);
        };
        if (value === null) {
            vValue = null;
        } else if (value !== undefined) {
            vValue = Value === undefined ? JSON.stringify(value) : /*#__PURE__*/ _jsx(Value, {
                value: value
            });
        } else {
            vValue = placeholder ?? resStrings[EnumString.placeholder_pick];
        }
    } else {
        vValue = value ?? bandContainer.defaultNone;
    }
    cn += (className ?? formProps.pickClassName) ?? bandContainer.defaultPickClassName;
    return /*#__PURE__*/ _jsxs("div", {
        className: cn,
        onClick: onClick,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "flex-grow-1",
                children: vValue
            }),
            vRight
        ]
    });
}
function BandPick(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Pick, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1750:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Radio, BandRadio */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4019);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__]);
([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




class RadioFieldItem {
    constructor(name, initValue){
        this.name = name;
        this.inputs = [];
        if (initValue) {
            this.initValue = String(initValue);
        }
    }
    addInput(input) {
        this.inputs.push(input);
    }
    reset() {
        for (let input of this.inputs){
            if (!input) continue;
            input.checked = input.value === this.initValue;
        }
    }
}
function RadioInput({ name , className , readOnly , item , itemIndex , defaultChecked  }) {
    let { label , value  } = item;
    let input = useRef();
    let band = useBand();
    let bandContainer = useBandContainer();
    useEffect(()=>{
        let fieldItem = bandContainer.fields[name];
        fieldItem.addInput(input.current);
    }, [
        band,
        bandContainer,
        name
    ]);
    let { props  } = bandContainer;
    function onChange(evt) {
        let t = evt.currentTarget;
        if (t.checked === true) {
            bandContainer.setValue(name, value);
        }
    }
    readOnly = (readOnly ?? props.readOnly) ?? false;
    let radioId = `_${name}_${itemIndex}_${Date.now()}`;
    return /*#__PURE__*/ _jsxs("label", {
        className: "form-check form-check-inline py-1 form-check-label",
        children: [
            /*#__PURE__*/ _jsx("input", {
                ref: input,
                name: name,
                type: "radio",
                id: radioId,
                className: (className ?? props.checkClassName) ?? bandContainer.defaultCheckClassName,
                disabled: readOnly,
                onChange: onChange,
                value: value,
                defaultChecked: defaultChecked
            }),
            label
        ]
    });
// <label className="form-check-label" htmlFor={radioId}>{label}</label> &nbsp;
}
function Radio(props) {
    let band = useBand();
    let bandContainer = useBandContainer();
    let { values  } = useSnapshot(bandContainer.valueResponse);
    let { name , options  } = props;
    let val = values[name];
    let { current: fieldItem  } = useRef(new RadioFieldItem(name, bandContainer.props.values?.[name]));
    if (band) band.fields[name] = true;
    bandContainer.fields[name] = fieldItem;
    return /*#__PURE__*/ _jsx("div", {
        className: "py-1",
        children: options.map((v, index)=>/*#__PURE__*/ _jsx(RadioInput, {
                ...props,
                item: v,
                itemIndex: index,
                defaultChecked: v.value === val
            }, index))
    });
}
function BandRadio(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Radio, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7856:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Range, BandRange */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__]);
_band__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



class RangeFieldItem {
    constructor(name, input, initValue){
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset() {
        if (!this.input) return;
        if (!this.initValue) {
            this.input.value = undefined;
        } else {
            this.input.value = String(this.initValue);
        }
    }
}
function Range(props) {
    let input = useRef();
    let { 0: value , 1: setValue  } = useState();
    let band = useBand();
    let bandContainer = useBandContainer();
    useEffect(()=>{
        let { name  } = props;
        let fieldItem = new RangeFieldItem(name, input.current, bandContainer.props.values?.[name]);
        if (band) band.fields[name] = true;
        bandContainer.fields[name] = fieldItem;
    }, [
        band,
        bandContainer,
        input,
        props
    ]);
    let { props: formProps  } = bandContainer;
    let { name , className , readOnly , min , max , step  } = props;
    readOnly = readOnly ?? formProps.readOnly;
    let initValue = bandContainer.props.values?.[name];
    function onChange(evt) {
        let val = evt.currentTarget.value;
        let n = Number(val);
        if (Number.isNaN(n) === false) {
            bandContainer.setValue(name, n);
            setValue(n);
        }
    }
    if (readOnly === true) {
        return /*#__PURE__*/ _jsx("div", {
            className: className ?? bandContainer.defaultStringClassName,
            children: initValue ?? bandContainer.defaultNone
        });
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: "d-flex " + (className ?? bandContainer.defaultStringClassName),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "me-2 w-min-3c text-center",
                children: value ?? initValue
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "flex-grow-1",
                children: [
                    /*#__PURE__*/ _jsx("input", {
                        ref: input,
                        type: "range",
                        defaultValue: bandContainer.props.values?.[name],
                        className: className ?? bandContainer.defaultRangeClassName,
                        onChange: onChange,
                        min: min,
                        max: max,
                        step: step
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "d-flex small text-muted px-1",
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: "me-3",
                                children: min
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "flex-grow-1"
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "ms-3",
                                children: max
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function BandRange(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Range, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports checkRule, ruleIsRequired */
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3324);

function checkRule(val, rule) {
    if (!rule) return;
    let ret = [];
    function addErr(rule) {
        let err = rule(val);
        if (err) {
            if (Array.isArray(err) === true) ret.push(...err);
            else ret.push(err);
        }
    }
    if (Array.isArray(rule) === true) {
        for (let r of rule){
            addErr(r);
        }
    } else {
        addErr(rule);
    }
    if (ret.length > 0) return ret;
    return undefined;
}
function ruleIsRequired(val) {
    let s = val.trim();
    if (!s) {
        return resStrings[EnumString.rule_required];
    }
}


/***/ }),

/***/ 6724:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Select, BandSelect */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3324);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__]);
_band__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




class SelectFieldItem {
    constructor(name, select, initIndex){
        this.name = name;
        this.select = select;
        this.initIndex = initIndex;
    }
    reset() {
        if (!this.select) return;
        this.select.selectedIndex = this.initIndex;
    }
}
function Select(props) {
    let select = useRef();
    let band = useBand();
    let bandContainer = useBandContainer();
    useEffect(()=>{
        let { props: formProps  } = bandContainer;
        let { name , options  } = props;
        let initValue = formProps.values?.[name];
        let initIndex = initValue ? options.findIndex((v)=>v.value === initValue) : 0;
        let fieldItem = new SelectFieldItem(name, select.current, initIndex);
        if (band) band.fields[name] = true;
        bandContainer.fields[name] = fieldItem;
    }, [
        band,
        bandContainer,
        props
    ]);
    let { props: formProps  } = bandContainer;
    let { name , options , placeholder , className , readOnly  } = props;
    readOnly = readOnly ?? formProps.readOnly;
    let initValue = bandContainer.props.values?.[name];
    function onChange(evt) {
        bandContainer.setValue(name, evt.currentTarget.value);
    }
    if (readOnly === true) {
        return /*#__PURE__*/ _jsx("div", {
            className: className ?? bandContainer.defaultStringClassName,
            children: initValue ?? bandContainer.defaultNone
        });
    }
    return /*#__PURE__*/ _jsxs("select", {
        ref: select,
        defaultValue: bandContainer.props.values?.[name],
        className: className ?? bandContainer.defaultSelectClassName,
        onChange: onChange,
        children: [
            !initValue && /*#__PURE__*/ _jsx("option", {
                value: undefined,
                children: placeholder ?? resStrings[EnumString.placeholder_select]
            }),
            options.map((v, index)=>/*#__PURE__*/ _jsx("option", {
                    value: v.value,
                    children: v.label
                }, index))
        ]
    });
}
function BandSelect(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(Select, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3238:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports String, BandString */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5446);
/* harmony import */ var _CharInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6319);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_2__]);
([_band__WEBPACK_IMPORTED_MODULE_1__, _CharInput__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function String(props) {
    let { placeholder , maxLength  } = props;
    return /*#__PURE__*/ _jsx(CharInput, {
        placeholder: placeholder,
        maxLength: maxLength,
        ...props
    });
}
function BandString(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(String, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3372:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports TextArea, BandTextArea */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var _Rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(525);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__]);
_band__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




class TextFieldItem {
    constructor(name, input, initValue){
        this.name = name;
        this.input = input;
        this.initValue = initValue;
    }
    reset() {
        if (!this.input) return;
        this.input.value = this.initValue ?? "";
    }
}
function TextArea({ name , className , readOnly , placeholder , maxLength , rule , rows  }) {
    let input = useRef();
    let band = useBand();
    let bandContainer = useBandContainer();
    useEffect(()=>{
        if (band) band.fields[name] = true;
        let { fields , props  } = bandContainer;
        fields[name] = new TextFieldItem(name, input.current, props.values?.[name]);
    }, [
        band,
        bandContainer,
        name
    ]);
    let { props  } = bandContainer;
    readOnly = (readOnly ?? props.readOnly) ?? false;
    let cn = (className ?? props.stringClassName) ?? bandContainer.defaultStringClassName;
    let initValue = props.values?.[name];
    if (readOnly === true) {
        return /*#__PURE__*/ _jsx("div", {
            className: cn,
            children: initValue ?? bandContainer.defaultNone
        });
    }
    let onFocus = ()=>{
        bandContainer.clearError(name);
    };
    let onBlur = ()=>{
        let err = checkRule(input.current.value, rule);
        bandContainer.setError(name, err);
    };
    let onChange = (evt)=>{
        bandContainer.setValue(name, evt.currentTarget.value);
    };
    return /*#__PURE__*/ _jsx("textarea", {
        ref: input,
        name: name,
        className: cn,
        readOnly: readOnly,
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        placeholder: placeholder,
        maxLength: maxLength,
        rows: rows ?? 4,
        defaultValue: initValue
    });
}
function BandTextArea(props) {
    return /*#__PURE__*/ _jsx(Band, {
        ...props,
        children: /*#__PURE__*/ _jsx(TextArea, {
            ...props
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1122:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _String__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3238);
/* harmony import */ var _Password__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(526);
/* harmony import */ var _Number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1960);
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2742);
/* harmony import */ var _Pick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1463);
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6724);
/* harmony import */ var _DateTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2396);
/* harmony import */ var _TextArea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3372);
/* harmony import */ var _Radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1750);
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7856);
/* harmony import */ var _CharInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6319);
/* harmony import */ var _Rule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(525);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_String__WEBPACK_IMPORTED_MODULE_0__, _Password__WEBPACK_IMPORTED_MODULE_1__, _Number__WEBPACK_IMPORTED_MODULE_2__, _Check__WEBPACK_IMPORTED_MODULE_3__, _Pick__WEBPACK_IMPORTED_MODULE_4__, _Select__WEBPACK_IMPORTED_MODULE_5__, _DateTime__WEBPACK_IMPORTED_MODULE_6__, _TextArea__WEBPACK_IMPORTED_MODULE_7__, _Radio__WEBPACK_IMPORTED_MODULE_8__, _Range__WEBPACK_IMPORTED_MODULE_9__, _CharInput__WEBPACK_IMPORTED_MODULE_10__]);
([_String__WEBPACK_IMPORTED_MODULE_0__, _Password__WEBPACK_IMPORTED_MODULE_1__, _Number__WEBPACK_IMPORTED_MODULE_2__, _Check__WEBPACK_IMPORTED_MODULE_3__, _Pick__WEBPACK_IMPORTED_MODULE_4__, _Select__WEBPACK_IMPORTED_MODULE_5__, _DateTime__WEBPACK_IMPORTED_MODULE_6__, _TextArea__WEBPACK_IMPORTED_MODULE_7__, _Radio__WEBPACK_IMPORTED_MODULE_8__, _Range__WEBPACK_IMPORTED_MODULE_9__, _CharInput__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3675:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports Submit, Clear, ClearErrorsButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4019);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5446);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8161);
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3324);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1122);
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9029);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_2__, _band__WEBPACK_IMPORTED_MODULE_3__, _fields__WEBPACK_IMPORTED_MODULE_6__, _FormContext__WEBPACK_IMPORTED_MODULE_7__]);
([valtio__WEBPACK_IMPORTED_MODULE_2__, _band__WEBPACK_IMPORTED_MODULE_3__, _fields__WEBPACK_IMPORTED_MODULE_6__, _FormContext__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








class SubmitItem {
    constructor(name, disabled){
        this.name = name;
    }
    reset() {}
}
//const submitProxy = proxy({ readOnly: false, disabled: false });
function Submit({ name , className , children , onSubmit , disabled  }) {
    let form = useForm();
    let { hasError  } = useSnapshot(form.errorResponse);
    let bandContainer = useBandContainer();
    let { fields , fieldStates  } = bandContainer;
    let state = useRef({
        readOnly: false,
        disabled
    }).current;
    let stateProxy = useRef(proxy(state)).current;
    let fieldState = useSnapshot(name ? fieldStates[name] : stateProxy);
    className = className ?? "btn btn-primary";
    children = children ?? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(FA, {
                name: "share-square-o"
            }),
            " ",
            resStrings[EnumString.string_submit]
        ]
    });
    useEffect(()=>{
        if (name) {
            fields[name] = new SubmitItem(name, disabled);
            Object.assign(fieldStates[name], {
                readOnly: undefined,
                disabled
            });
        }
    }, [
        fields,
        fieldStates,
        name,
        disabled
    ]);
    async function onClick(evt) {
        evt.preventDefault();
        let { props , valueResponse , errorResponse  } = form;
        let { rule  } = props;
        let errors = checkRule(valueResponse.values, rule);
        if (errors) {
            errorResponse.errors = errors;
            errorResponse.hasError = true;
        } else {
            let ret = await onSubmit(form.valueResponse.values);
            if (ret) {
                switch(typeof ret){
                    default:
                        if (Array.isArray(ret) === true) {
                            for (let item of ret){
                                if (!item) {
                                    form.clearAllErrors();
                                } else if (Array.isArray(item) === true) {
                                    let [name, err] = item;
                                    form.setError(name, err);
                                } else {
                                    form.setError(undefined, ret);
                                }
                            }
                        }
                        break;
                    case "string":
                        form.setError(undefined, ret);
                        break;
                }
            } else {
                form.clearAllErrors();
            }
        }
    }
    return /*#__PURE__*/ _jsx(ButtonAsync, {
        onClick: onClick,
        disabled: (fieldState.disabled ?? false) || hasError,
        className: className,
        children: children
    });
}
function Clear({ className , children  }) {
    let form = useForm();
    function onClick(evt) {
        evt.preventDefault();
        form.clearValues();
    }
    return /*#__PURE__*/ _jsx("button", {
        onClick: onClick,
        className: className,
        children: children
    });
}
function ClearErrorsButton({ className , children  }) {
    let form = useForm();
    let { hasError  } = useSnapshot(form?.errorResponse);
    function onClick(evt) {
        evt.preventDefault();
        form.clearAllErrors();
    }
    return /*#__PURE__*/ _jsx("button", {
        onClick: onClick,
        disabled: !hasError,
        className: className,
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2449:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports FormBandTemplate1, Form, FormErrors, BandFormErrors */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4019);
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9029);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__, _FormContext__WEBPACK_IMPORTED_MODULE_4__]);
([_band__WEBPACK_IMPORTED_MODULE_2__, valtio__WEBPACK_IMPORTED_MODULE_3__, _FormContext__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function DefaultBandTemplate(props) {
    let { label , children , errors , memos , contentContainerClassName  } = props;
    let vLabel;
    let cnContent = "col-sm-10 " + (contentContainerClassName ?? "");
    if (label) {
        vLabel = /*#__PURE__*/ _jsx("label", {
            className: "col-sm-2 col-form-label text-sm-end",
            children: /*#__PURE__*/ _jsx("b", {
                children: label
            })
        });
    } else {
        cnContent += " offset-sm-2";
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: "mb-3 row bg-white",
        children: [
            vLabel,
            /*#__PURE__*/ _jsxs("div", {
                className: cnContent,
                children: [
                    children,
                    /*#__PURE__*/ _jsx(BandFieldErrors, {
                        errors: errors
                    }),
                    /*#__PURE__*/ _jsx(BandMemos, {
                        memos: memos
                    })
                ]
            })
        ]
    });
}
function FormBandTemplate1(props) {
    let { label , children , errors , memos , contentContainerClassName  } = props;
    let vLabel;
    let cnContent = contentContainerClassName ?? "";
    if (label) {
        vLabel = /*#__PURE__*/ _jsx("label", {
            className: "col-form-label",
            children: /*#__PURE__*/ _jsx("b", {
                children: label
            })
        });
    } else {
        cnContent += " ";
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: "mb-3 row bg-white",
        children: [
            vLabel,
            /*#__PURE__*/ _jsxs("div", {
                className: cnContent,
                children: [
                    children,
                    /*#__PURE__*/ _jsx(BandFieldErrors, {
                        errors: errors
                    }),
                    /*#__PURE__*/ _jsx(BandMemos, {
                        memos: memos
                    })
                ]
            })
        ]
    });
}
function Form(props) {
    let { className , children , BandTemplate  } = props;
    BandTemplate = BandTemplate ?? DefaultBandTemplate;
    let { current: formContext  } = useRef(new FormContext({
        ...props,
        BandTemplate
    }));
    function onSubmit(evt) {
        evt.preventDefault();
    }
    return /*#__PURE__*/ _jsx(VFormContext.Provider, {
        value: formContext,
        children: /*#__PURE__*/ _jsx(VBandContainerContext.Provider, {
            value: formContext,
            children: /*#__PURE__*/ _jsx("form", {
                className: className,
                onSubmit: onSubmit,
                children: children
            })
        })
    });
}
function FormErrors() {
    let form = useForm();
    let { errors  } = useSnapshot(form.errorResponse);
    if (!errors) return null;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: errors.map((v, index)=>/*#__PURE__*/ _jsx(BandFieldError, {
                error: v
            }, index))
    });
}
function BandFormErrors() {
    let form = useForm();
    let { errors  } = useSnapshot(form.errorResponse);
    if (!errors) return null;
    return /*#__PURE__*/ _jsx(Band, {
        children: errors.map((v, index)=>/*#__PURE__*/ _jsx(BandFieldError, {
                error: v
            }, index))
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9029:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports FormContext, VFormContext, useForm */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4019);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5446);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_1__, _band__WEBPACK_IMPORTED_MODULE_2__]);
([valtio__WEBPACK_IMPORTED_MODULE_1__, _band__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



class FormContext extends (/* unused pure expression or super */ null && (BandContainerContext)) {
    constructor(props){
        super(props);
        this.errorResponse = proxy({
            hasError: false,
            errors: undefined
        });
    }
    get isDetail() {
        return false;
    }
    setError(name, err) {
        if (!err) return;
        if (Array.isArray(err) === false) err = [
            err
        ];
        if (!name) {
            if (err && err.length > 0) {
                this.errorResponse.errors = [
                    ...err
                ];
                this.errorResponse.hasError = true;
            }
            return;
        }
        let hasError = super.setError(name, err);
        if (hasError === true) {
            this.errorResponse.hasError = hasError;
        }
        return hasError;
    }
    clearError(name) {
        let hasError = super.clearError(name);
        this.errorResponse.hasError = hasError;
        this.errorResponse.errors = undefined;
        return hasError;
    }
    clearAllErrors() {
        super.clearAllErrors();
        this.errorResponse.hasError = false;
    }
    clearValues() {
        let { values  } = this.valueResponse;
        for(let i in values){
            values[i] = undefined;
        }
        for(let i1 in this.fields){
            this.fields[i1].reset();
        }
        this.clearAllErrors();
    }
}
const VFormContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
function useForm() {
    return useContext(VFormContext);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5791:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2449);
/* harmony import */ var _Buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3675);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1122);
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9029);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Form__WEBPACK_IMPORTED_MODULE_0__, _Buttons__WEBPACK_IMPORTED_MODULE_1__, _fields__WEBPACK_IMPORTED_MODULE_2__, _FormContext__WEBPACK_IMPORTED_MODULE_3__]);
([_Form__WEBPACK_IMPORTED_MODULE_0__, _Buttons__WEBPACK_IMPORTED_MODULE_1__, _fields__WEBPACK_IMPORTED_MODULE_2__, _FormContext__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8287:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FA": () => (/* reexport safe */ _coms__WEBPACK_IMPORTED_MODULE_1__.FA),
/* harmony export */   "KX": () => (/* reexport safe */ _coms__WEBPACK_IMPORTED_MODULE_1__.KX),
/* harmony export */   "pA": () => (/* reexport safe */ _coms__WEBPACK_IMPORTED_MODULE_1__.pA)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5791);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8161);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1903);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8996);
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7574);
/* harmony import */ var _detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5439);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5446);
/* harmony import */ var _data_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8603);
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3324);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_form__WEBPACK_IMPORTED_MODULE_0__, _page__WEBPACK_IMPORTED_MODULE_2__, _detail__WEBPACK_IMPORTED_MODULE_5__, _band__WEBPACK_IMPORTED_MODULE_6__, _data_view__WEBPACK_IMPORTED_MODULE_7__]);
([_form__WEBPACK_IMPORTED_MODULE_0__, _page__WEBPACK_IMPORTED_MODULE_2__, _detail__WEBPACK_IMPORTED_MODULE_5__, _band__WEBPACK_IMPORTED_MODULE_6__, _data_view__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8996:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: List

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./tonwa-com/coms/index.ts + 9 modules
var coms = __webpack_require__(8161);
;// CONCATENATED MODULE: ./tonwa-com/list/List.tsx



function List(props) {
    let { 0: showLoading , 1: setShowLoding  } = useState(false);
    let { items , className , itemKey , ItemView , onItemClick , onItemSelect , sep , none , loading  } = props;
    className = className ?? "";
    useEffect(()=>{
        // loading超过200ms，显示spinner
        setTimeout(()=>{
            setShowLoding(true);
        }, 200);
    }, []);
    if (!items) {
        if (showLoading === false) return null;
        if (loading) return loading;
        return /*#__PURE__*/ _jsx(Spinner, {
            className: "mx-3 my-2 text-primary"
        });
    }
    let len = items.length;
    if (len === 0) {
        if (none) return none;
        return /*#__PURE__*/ _jsx("div", {
            className: "mx-3 my-2 text-muted",
            children: "-"
        });
    }
    ItemView = ItemView ?? DefaultItemView;
    let renderItem;
    function onCheckChange(item, evt) {
        onItemSelect(item, evt.currentTarget.checked);
    }
    if (onItemSelect) {
        if (onItemClick) {
            renderItem = (v)=>/*#__PURE__*/ _jsxs("div", {
                    className: "d-flex",
                    children: [
                        /*#__PURE__*/ _jsx("label", {
                            className: "ps-3 pe-2 align-self-stretch d-flex align-items-center",
                            children: /*#__PURE__*/ _jsx("input", {
                                type: "checkbox",
                                className: "form-check-input",
                                onChange: (evt)=>onCheckChange(v, evt)
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "flex-grow-1 cursor-pointer",
                            onClick: ()=>onItemClick(v),
                            children: /*#__PURE__*/ _jsx(ItemView, {
                                value: v
                            })
                        })
                    ]
                });
        } else {
            renderItem = (v)=>/*#__PURE__*/ _jsxs("label", {
                    className: "d-flex",
                    children: [
                        /*#__PURE__*/ _jsx("input", {
                            type: "checkbox",
                            className: "form-check-input mx-3 align-self-center",
                            onChange: (evt)=>onCheckChange(v, evt)
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "flex-grow-1",
                            children: /*#__PURE__*/ _jsx(ItemView, {
                                value: v
                            })
                        })
                    ]
                });
        }
    } else {
        if (onItemClick) {
            className += " tonwa-list-item";
        }
        renderItem = (v)=>{
            let funcClick, cn;
            if (onItemClick) {
                funcClick = ()=>onItemClick(v);
                cn = "tonwa-list-item cursor-pointer";
            }
            return /*#__PURE__*/ _jsx("div", {
                onClick: funcClick,
                className: cn,
                children: /*#__PURE__*/ _jsx(ItemView, {
                    value: v
                })
            });
        };
    }
    sep = /*#__PURE__*/ _jsx(Sep, {
        sep: sep
    });
    let funcKey;
    switch(typeof itemKey){
        default:
            funcKey = (item, index)=>index;
            break;
        case "string":
            funcKey = (item)=>item[itemKey];
            break;
        case "function":
            funcKey = itemKey;
            break;
    }
    return /*#__PURE__*/ _jsx("ul", {
        className: "m-0 p-0 " + className,
        children: items.map((v, index)=>{
            let key = funcKey(v, index);
            return /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    renderItem(v, index),
                    index < len - 1 && sep
                ]
            }, key);
        })
    });
}
function DefaultItemView(itemProps) {
    let { value  } = itemProps;
    let cn = "px-3 py-2";
    return /*#__PURE__*/ _jsx("div", {
        className: cn,
        children: JSON.stringify(value)
    });
}

;// CONCATENATED MODULE: ./tonwa-com/list/index.ts



/***/ }),

/***/ 881:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports AppNav, TabNav */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4019);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(603);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_2__, _nav__WEBPACK_IMPORTED_MODULE_3__]);
([valtio__WEBPACK_IMPORTED_MODULE_2__, _nav__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




class AppNav extends (/* unused pure expression or super */ null && (StackNav)) {
    response = proxy({
        isLogined: undefined,
        error: undefined
    });
    tabNav = new TabNav(this);
    init(initPage, navigateFunc) {
        if (this.navigateFunc) return;
        this.navigateFunc = navigateFunc;
        if (initPage) {
            this.data.stack.splice(0);
            this.internalOpen(/*#__PURE__*/ _jsx(_Fragment, {
                children: initPage
            }));
        }
    }
    navigate(to, options) {
        this.navigateFunc(to, options);
    }
    onLoginChanged = (isLogined)=>{
        if (isLogined === true) {
            this.response.isLogined = isLogined;
        } else {
            this.response.isLogined = false;
        }
        this.response.error = undefined;
    };
    setError(err, message) {
        this.response.error = ref({
            err,
            message
        });
    }
    clearError() {
        this.response.error = undefined;
    }
}
class TabNav extends (/* unused pure expression or super */ null && (StackNav)) {
    constructor(appNav){
        super();
        this.appNav = appNav;
        this.itemsArr = [];
        this.response = proxy({
            active: undefined
        });
    }
    setInitTabs(initPageItems, defaultActive) {
        this.defaultActive = defaultActive;
        initPageItems = initPageItems ?? [];
        this.itemsArr.splice(0);
        this.itemsArr.push(...initPageItems);
        this.data.stack.splice(0);
        this.data.stack.push(...initPageItems.map((v)=>ref(v)));
    }
    openTab(pageItem) {
        let refPageItem = ref(pageItem);
        this.response.active = refPageItem;
        this.data.stack.push(refPageItem);
        this.itemsArr.push(pageItem);
        this.appNav.navigate(`/${pageItem.key}`);
    }
    activate(pageItem) {
        let { key: name  } = pageItem;
        if (this.response.active !== pageItem) {
            this.response.active = pageItem;
            let p = this.itemsArr.findIndex((v)=>v.key === name);
            let ret = this.itemsArr.splice(p, 1);
            this.itemsArr.push(...ret);
            this.appNav.navigate(name);
        }
    }
    closeTab(pageItem) {
        let { stack  } = this.data;
        if (stack.length === 0) return;
        pageItem = pageItem ?? this.response.active;
        let p = stack.findIndex((v)=>v === pageItem);
        if (p >= 0) {
            let [item] = stack.splice(p, 1);
            let i = this.itemsArr.findIndex((v)=>v.key === item.key);
            if (i >= 0) this.itemsArr.splice(i, 1);
            let len = this.itemsArr.length;
            if (len > 0) {
                let item1 = this.itemsArr[len - 1];
                this.response.active = item1;
                let active = item1.key;
                this.appNav.navigate(`/${active}`);
            }
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 569:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export appPageStackTemplate */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367);
/* harmony import */ var _PageTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _BackTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7883);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Error__WEBPACK_IMPORTED_MODULE_1__, _BackTemplate__WEBPACK_IMPORTED_MODULE_3__]);
([_Error__WEBPACK_IMPORTED_MODULE_1__, _BackTemplate__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



//import "../css/tonwa-page.css";

const defaultContentClassName = " bg-white ";
function Header(props) {
    let { back , header , right , template: templateName  } = props;
    let template = (0,_PageTemplate__WEBPACK_IMPORTED_MODULE_2__/* .usePageTemplate */ .W)(templateName);
    let { Back  } = template;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "tonwa-page-container d-flex h-min-3c border-bottom align-items-center tonwa-page-header-content",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Back, {
                    back: back
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "flex-grow-1",
                    children: header
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mx-2",
                    children: right
                })
            ]
        })
    });
}
function Footer(props) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "tonwa-page-container d-flex flex-column tonwa-page-footer-content",
        children: props.footer
    });
}
function Content(props) {
    let { contentClassName , template: templateName  } = props;
    let template = (0,_PageTemplate__WEBPACK_IMPORTED_MODULE_2__/* .usePageTemplate */ .W)(templateName);
    if (!contentClassName) {
        let { contentClassName: templateContentClassName  } = template;
        contentClassName = templateContentClassName;
        if (!contentClassName) contentClassName = defaultContentClassName;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "tonwa-page-content tonwa-page-container " + contentClassName,
        style: {
            display: "flow-root"
        },
        children: props.children
    });
}
const appPageStackTemplate = {
    Back: _BackTemplate__WEBPACK_IMPORTED_MODULE_3__/* .Back */ .e,
    Header,
    Footer,
    Content,
    contentClassName: defaultContentClassName,
    Error: _Error__WEBPACK_IMPORTED_MODULE_1__/* .Error */ .j,
    errorPosition: "under-header"
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2658:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports AppTabs, AppTabsContainer */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4661);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8161);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4019);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(603);
/* harmony import */ var _StackContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5143);
/* harmony import */ var _useScroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6083);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_4__, _nav__WEBPACK_IMPORTED_MODULE_5__, _StackContainer__WEBPACK_IMPORTED_MODULE_6__]);
([valtio__WEBPACK_IMPORTED_MODULE_4__, _nav__WEBPACK_IMPORTED_MODULE_5__, _StackContainer__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function AppTabs(props) {
    const { active_page  } = useParams();
    let tabNav = useTabNav();
    let { Tab , TabKept , TabClose  } = props;
    if (!Tab) Tab = ({ title  })=>{
        return /*#__PURE__*/ _jsx("div", {
            className: "ps-3 pe-2 py-2",
            children: title
        });
    };
    if (!TabKept) TabKept = ({ title  })=>{
        return /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                /*#__PURE__*/ _jsx(FA, {
                    name: "home",
                    className: "me-2",
                    size: "lg"
                }),
                title
            ]
        });
    };
    if (!TabClose) TabClose = ()=>{
        let cn = "btn btn-sm btn-outline-primary px-1 me-1 border-0 py-0 align-self-center";
        return /*#__PURE__*/ _jsx("div", {
            className: cn,
            children: /*#__PURE__*/ _jsx(FA, {
                name: "times"
            })
        });
    };
    useEffect(()=>{
        let { pages , active  } = props;
        let { defaultActive , data , appNav  } = tabNav;
        let { stack  } = data;
        let activePage = active_page ? active_page : defaultActive?.key;
        tabNav.setInitTabs(pages, active);
        if (!activePage) return;
        let ap = activePage;
        let p = stack.findIndex((v)=>v.key === activePage);
        if (p < 0) ap = defaultActive?.key;
        if (ap) {
            appNav.navigate(`${ap}`);
        }
    }, [
        props,
        tabNav
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // 注意：上面这里的相关数组，不能包含active_page。否则，每次更新url，都会重载AppTabs
    let { defaultActive , data , response  } = tabNav;
    let { stack  } = data;
    let tabs = useSnapshot(stack);
    let { active  } = useSnapshot(response);
    let activePage = (active?.key ?? active_page) ?? defaultActive?.key;
    function TabContainer(tab) {
        let { key: name , keep , title  } = tab;
        let cnTab = "nav-item nav-link d-flex align-items-center p-0 " + (activePage === name ? "active" : "cursor-pointer");
        let vTab;
        if (keep === true) {
            cnTab += " px-3 py-2 ";
            vTab = /*#__PURE__*/ _jsx(TabKept, {
                title: title
            });
        } else {
            cnTab += " d-flex align-items-center ";
            vTab = /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(Tab, {
                        title: title
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        onClick: (evt)=>{
                            tabNav.closeTab(tab);
                            evt.stopPropagation();
                        },
                        children: /*#__PURE__*/ _jsx(TabClose, {})
                    })
                ]
            });
        }
        return /*#__PURE__*/ _jsx("li", {
            className: cnTab,
            role: "button",
            onClick: ()=>tabNav.activate(tab),
            children: vTab
        }, name);
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: "d-flex flex-column flex-fill overflow-hidden",
        children: [
            /*#__PURE__*/ _jsx("ul", {
                className: "nav nav-tabs",
                children: tabs.map((tab)=>TabContainer(tab))
            }),
            /*#__PURE__*/ _jsx(ScrollContext.Provider, {
                value: "app-tabs",
                children: /*#__PURE__*/ _jsx(StackContainer, {
                    active: activePage,
                    stackItems: tabs
                })
            })
        ]
    });
}
function AppTabsContainer({ children  }) {
    let appNav = useAppNav();
    return /*#__PURE__*/ _jsx(TabNavContext.Provider, {
        value: appNav.tabNav,
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6820:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export appTabsTemplate */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367);
/* harmony import */ var _PageTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2247);
/* harmony import */ var _BackTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7883);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Error__WEBPACK_IMPORTED_MODULE_1__, _BackTemplate__WEBPACK_IMPORTED_MODULE_3__]);
([_Error__WEBPACK_IMPORTED_MODULE_1__, _BackTemplate__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const defaultContentClassName = " bg-white ";
function Header(props) {
    let { back , header , right  } = props;
    let { Back  } = appTabsTemplate;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "d-flex py-2 border-bottom align-items-center tonwa-page-header-content",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Back, {
                    back: back
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "",
                    children: header
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "ms-3",
                    children: right
                })
            ]
        })
    });
}
function Footer(props) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "d-flex flex-column tonwa-page-header-content",
        children: props.footer
    });
}
function Content(props) {
    let { contentClassName , template: templateName  } = props;
    let template = (0,_PageTemplate__WEBPACK_IMPORTED_MODULE_2__/* .usePageTemplate */ .W)(templateName);
    if (!contentClassName) {
        let { contentClassName: templateContentClassName  } = template;
        contentClassName = templateContentClassName;
        if (!contentClassName) contentClassName = defaultContentClassName;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "tonwa-page-content " + contentClassName,
        style: {
            display: "flow-root"
        },
        children: props.children
    });
}
const appTabsTemplate = {
    Back: _BackTemplate__WEBPACK_IMPORTED_MODULE_3__/* .Back */ .e,
    Header,
    Footer,
    Content,
    contentClassName: defaultContentClassName,
    Error: _Error__WEBPACK_IMPORTED_MODULE_1__/* .Error */ .j,
    errorPosition: "above-header"
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7883:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ Back)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8161);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(603);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_nav__WEBPACK_IMPORTED_MODULE_2__]);
_nav__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Back(props) {
    let { back  } = props;
    let nav = (0,_nav__WEBPACK_IMPORTED_MODULE_2__/* .useNav */ .YM)();
    let { appNav  } = nav;
    function onClickBack() {
        if (nav.data.stack.length === 1) {
            appNav.close(); //.navigate(-1 as any);
        } else {
            nav.close();
        }
    }
    function renderBack(iconName) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "px-3 cursor-pointer",
            onClick: onClickBack,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_coms__WEBPACK_IMPORTED_MODULE_1__.FA, {
                name: iconName
            })
        });
    }
    function renderNone() {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "pe-3"
        });
    }
    switch(back){
        default:
        case "back":
            break;
        case "none":
            return renderNone();
        case "close":
            return renderBack("close");
    }
    if (nav.data.stack.length > 1 || !nav.tabNav && appNav.data.stack.length > 1) {
        return renderBack("angle-left");
    }
    return renderNone();
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 367:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ Error)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4019);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8161);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(603);
/* harmony import */ var _PageTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2247);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_3__]);
([valtio__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Error(props) {
    let nav = (0,_nav__WEBPACK_IMPORTED_MODULE_3__/* .useNav */ .YM)();
    let { appNav  } = nav;
    let { errorPosition  } = (0,_PageTemplate__WEBPACK_IMPORTED_MODULE_4__/* .usePageTemplate */ .W)(props.template);
    let response = (0,valtio__WEBPACK_IMPORTED_MODULE_1__.useSnapshot)(appNav.response);
    let { error  } = response;
    if (error === undefined) return null;
    function onShow() {
        alert(error.message);
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: errorPosition === "under-header" ? "tonwa-page-container" : "",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_coms__WEBPACK_IMPORTED_MODULE_2__/* .LMR */ .pA, {
            className: "bg-light align-items-center border-bottom border-info",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "py-2 px-3 cursor-pointer",
                    onClick: ()=>appNav.clearError(),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_coms__WEBPACK_IMPORTED_MODULE_2__.FA, {
                        name: "times",
                        size: "lg"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_coms__WEBPACK_IMPORTED_MODULE_2__.FA, {
                    className: "text-danger me-2",
                    name: "exclamation-triangle"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-info",
                    children: error.message
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "py-2 px-3 cursor-pointer",
                    onClick: onShow,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_coms__WEBPACK_IMPORTED_MODULE_2__.FA, {
                        name: "angle-right"
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7083:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports UPage, Page */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4019);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8161);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(603);
/* harmony import */ var _PageTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2247);
/* harmony import */ var _useScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6083);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_3__]);
([valtio__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







// import '../css/tonwa.css';
// unanthorized page
function UPage(props) {
    let divRef = useScroll();
    let { children , header , back , right , footer , template: templateName , id  } = props;
    let template = usePageTemplate(templateName);
    if (header || back || right) {
        let { Header  } = props;
        if (!Header) {
            let { Header: TemplateHeader  } = template;
            Header = TemplateHeader;
        }
        header = /*#__PURE__*/ _jsx(Header, {
            header: header,
            back: back,
            right: right
        });
    }
    if (footer) {
        let { Footer  } = props;
        if (!Footer) {
            let { Footer: TemplateFooter  } = template;
            Footer = TemplateFooter;
        }
        footer = /*#__PURE__*/ _jsx(Footer, {
            footer: footer
        });
    }
    let { Content  } = props;
    if (!Content) {
        let { Content: TemplateContent  } = template;
        Content = TemplateContent;
    }
    header = header && /*#__PURE__*/ _jsx("div", {
        className: "position-sticky tonwa-page-header",
        style: {
            top: 0,
            zIndex: 9999
        },
        children: header
    });
    let { errorPosition , Error  } = template;
    switch(errorPosition){
        case "above-header":
            header = /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(Error, {
                        template: templateName
                    }),
                    header
                ]
            });
            break;
        case "under-header":
            header = /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    header,
                    /*#__PURE__*/ _jsx(Error, {
                        template: templateName
                    })
                ]
            });
            break;
    }
    //let cnPage = '-inner-page d-flex flex-grow-1 flex-column';
    return /*#__PURE__*/ _jsxs("div", {
        ref: divRef,
        className: "-inner-page",
        id: id,
        children: [
            header,
            /*#__PURE__*/ _jsx(Content, {
                ...props,
                children: children
            }),
            footer && /*#__PURE__*/ _jsx("div", {
                className: "tonwa-page-footer",
                style: {
                    position: "sticky",
                    bottom: "0px"
                },
                children: footer
            })
        ]
    });
}
function Page(props) {
    let appNav = useAppNav();
    let { isLogined  } = useSnapshot(appNav.response);
    if (isLogined !== true) {
        return /*#__PURE__*/ _jsx(Unanthorized, {});
    }
    return /*#__PURE__*/ _jsx(UPage, {
        ...props
    });
}
function Unanthorized() {
    let nav = useNav();
    return /*#__PURE__*/ _jsxs("div", {
        className: "p-3",
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ _jsx(FA, {
                        name: "ban",
                        className: "text-danger me-3"
                    }),
                    "not logined, can not show a ",
                    "<Page />",
                    ", try ",
                    "<UPage />",
                    "."
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                children: /*#__PURE__*/ _jsx("button", {
                    className: "btn btn-outline-primary",
                    onClick: ()=>nav.close(),
                    children: /*#__PURE__*/ _jsx(FA, {
                        name: "angle-left"
                    })
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports Tab, PageTabs */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6083);



function Tab(props) {
    return null;
}
let tabId = 1;
function createTabsFromChildren(children) {
    let tabs = [];
    React.Children.forEach(children, (element)=>{
        if (/*#__PURE__*/ React.isValidElement(element) === false) return;
        let elType = element.type;
        if (elType === React.Fragment) return;
        if (elType !== Tab) return;
        invariant(elType === Tab, `[${typeof elType === "string" ? elType : elType.name}] is not a <Tab> component. All component children of <PageTabs> must be a <Tab>`);
        let { props  } = element;
        let tab = {
            id: tabId++,
            name: props.name,
            tag: props.tag,
            content: /*#__PURE__*/ _jsx(_Fragment, {
                children: props.children
            }),
            mountable: false
        };
        tabs.push(tab);
    });
    return tabs;
}
function PageTabs({ children  }) {
    let { current: tabs  } = useRef(createTabsFromChildren(children));
    return /*#__PURE__*/ _jsx(InnerPageTabs, {
        tabs: tabs
    });
}
function InnerPageTabs({ tabs  }) {
    let scrollContext = useContext(ScrollContext);
    let { 0: active , 1: setActive  } = useState(0);
    tabs[active].mountable = true;
    function onTabClick(tabIndex) {
        if (tabIndex === active) return;
        let tab = tabs[tabIndex];
        if (!tab) return;
        tab.mountable = true;
        setActive(tabIndex);
    }
    scrollContext = scrollContext ?? "page-tabs";
    let overflowY;
    switch(scrollContext){
        default:
            break;
        case "app-tabs":
            overflowY = "auto";
            break;
        case "page-tabs":
            overflowY = "scroll";
            break;
    }
    return /*#__PURE__*/ _jsx(ScrollContext.Provider, {
        value: scrollContext,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "flex-grow-1 d-flex flex-column",
            style: {
                overflowY
            },
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "tonwa-page-content tab-content flex-grow-1",
                    children: tabs.map((v, index)=>/*#__PURE__*/ _jsx(TabPane, {
                            tab: v,
                            active: active,
                            index: index
                        }, v.id))
                }),
                /*#__PURE__*/ _jsx("ul", {
                    className: "nav nav-tabs position-sticky tonwa-page-container justify-content-evenly bg-light",
                    style: {
                        bottom: "0"
                    },
                    children: tabs.map((v, index)=>/*#__PURE__*/ _jsx("li", {
                            className: "nav-item flex-fill align-self-stretch",
                            children: /*#__PURE__*/ _jsx("div", {
                                onClick: ()=>onTabClick(index),
                                className: "nav-link h-100 p-0 " + (index === active ? "active" : "cursor-pointer"),
                                children: v.tag
                            })
                        }, v.name))
                })
            ]
        })
    });
}
function TabPane({ tab , active , index  }) {
    let divRef = useScroll();
    let { mountable , content  } = tab;
    if (mountable === false) return null;
    return /*#__PURE__*/ _jsx("div", {
        ref: divRef,
        className: "tab-pane " + (active === index ? "active" : ""),
        children: content
    });
}
function invariant(condition, message) {
    if (!condition) throw new Error(message);
}


/***/ }),

/***/ 2247:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ usePageTemplate)
/* harmony export */ });
/* unused harmony export setPageTemplate */
function usePageTemplate(templateName) {
    if (!templateName) {
        return defaultTemplate;
    }
    let template = templates[templateName];
    return template;
}
function setPageTemplate(templateName, template) {
    if (!templateName) {
        Object.assign(defaultTemplate, template);
    } else {
        templates[templateName] = template;
    }
}
const defaultTemplate = {};
const templates = {};


/***/ }),

/***/ 5143:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export StackContainer */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4019);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(603);
/* harmony import */ var _useScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6083);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_2__, _nav__WEBPACK_IMPORTED_MODULE_3__]);
([valtio__WEBPACK_IMPORTED_MODULE_2__, _nav__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function StackContainer({ active , stackItems  }) {
    let last = stackItems.length - 1;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: stackItems.map((item, index)=>{
            let { key: name , page  } = item;
            let display;
            if (active) {
                display = active === name;
            } else {
                display = index === last;
            }
            return /*#__PURE__*/ _jsx(Stack, {
                display: display,
                children: page
            }, name);
        })
    });
}
function Stack({ display , children  }) {
    let appNav = useAppNav();
    let tabNav = useTabNav();
    let scrollContext = useContext(ScrollContext);
    let nav = useRef(new Nav(appNav, tabNav, children));
    let { data  } = nav.current;
    let snapshot = useSnapshot(data);
    let { stack: snapshotStack  } = snapshot;
    let len = snapshotStack.length;
    let last = len - 1;
    const flexFill = "-page-stack-layer flex-column flex-grow-1 ";
    let overflowY;
    switch(scrollContext){
        default:
            overflowY = "auto";
            break;
        case "app-tabs":
            overflowY = "auto";
            break;
        case "page-tabs":
            overflowY = "scroll";
            break;
    }
    return /*#__PURE__*/ _jsx(PageStackContext.Provider, {
        value: nav.current,
        children: snapshotStack.map((v, index)=>{
            let { key: pageKey , page  } = v;
            return /*#__PURE__*/ _jsx("div", {
                className: flexFill + (display === true && index === last ? "d-flex" : "d-none"),
                style: {
                    overflowY
                },
                children: page
            }, pageKey);
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1903:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7083);
/* harmony import */ var _AppTabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2658);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(603);
/* harmony import */ var _AppNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(881);
/* harmony import */ var _AppPageStackTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(569);
/* harmony import */ var _AppTabsTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6820);
/* harmony import */ var _PageTabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(521);
/* harmony import */ var _StackContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5143);
/* harmony import */ var _PageTemplate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2247);
/* harmony import */ var _usePromise__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6597);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Page__WEBPACK_IMPORTED_MODULE_0__, _AppTabs__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_2__, _AppNav__WEBPACK_IMPORTED_MODULE_3__, _AppPageStackTemplate__WEBPACK_IMPORTED_MODULE_4__, _AppTabsTemplate__WEBPACK_IMPORTED_MODULE_5__, _StackContainer__WEBPACK_IMPORTED_MODULE_7__]);
([_Page__WEBPACK_IMPORTED_MODULE_0__, _AppTabs__WEBPACK_IMPORTED_MODULE_1__, _nav__WEBPACK_IMPORTED_MODULE_2__, _AppNav__WEBPACK_IMPORTED_MODULE_3__, _AppPageStackTemplate__WEBPACK_IMPORTED_MODULE_4__, _AppTabsTemplate__WEBPACK_IMPORTED_MODULE_5__, _StackContainer__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 603:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YM": () => (/* binding */ useNav)
/* harmony export */ });
/* unused harmony exports StackNav, Nav, AppNavContext, TabNavContext, PageStackContext, useAppNav, useTabNav */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _coms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8161);
/* harmony import */ var valtio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4019);
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7083);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([valtio__WEBPACK_IMPORTED_MODULE_3__, _Page__WEBPACK_IMPORTED_MODULE_4__]);
([valtio__WEBPACK_IMPORTED_MODULE_3__, _Page__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





class StackNav {
    stackLen = 0;
    callStack = [];
    constructor(){
        this.pageKeyNO = 0;
        this.data = proxy({
            stack: []
        });
    }
    open(page, onClose) {
        if (typeof page === "function") {
            let promise = page();
            let isWaiting = false;
            setTimeout(()=>{
                if (isWaiting === undefined) return;
                this.open(/*#__PURE__*/ _jsx(Waiting, {}));
                isWaiting = true;
            }, 100);
            promise.then(async (pg)=>{
                if (isWaiting === true) {
                    this.close();
                }
                isWaiting = undefined;
                this.open(pg, onClose);
                return;
            });
            return;
        }
        this.internalOpen(page, onClose);
    }
    internalOpen(page, onClose) {
        this.innerClose();
        let pageItem = {
            key: String(++this.pageKeyNO),
            page,
            onClose
        };
        this.data.stack.push(ref(pageItem));
        this.stackLen = this.data.stack.length;
    }
    close(level = 1) {
        this.stackLen -= level;
        this.innerClose();
    //for (let i = 0; i < level; i++) this.innerClose();
    }
    cease(level = 1) {
        this.stackLen -= level;
    }
    call(page) {
        return new Promise((resolve, reject)=>{
            this.callStack.push(resolve);
            this.open(page);
        });
    }
    returnCall(returnValue) {
        let resolve = this.callStack.pop();
        if (resolve === undefined) {
            console.error("nav.call and nav.returnCall not matched");
            return;
        }
        this.cease();
        resolve(returnValue);
    }
    async confirm(msg) {
        return window.confirm(msg);
    }
    clear() {
        alert("nav clear");
    }
    innerClose() {
        let { stack  } = this.data;
        let len = stack.length;
        if (len === 0) {
            this.stackLen = 0;
            return;
        }
        if (this.stackLen < 0) this.stackLen = 0;
        let stackLen = this.stackLen;
        for(let i = len - 1; i >= stackLen; i--){
            let { onClose  } = stack[i];
            if (onClose?.() === false) return;
            stack.pop();
        }
    }
}
function Waiting() {
    return /*#__PURE__*/ _jsx(UPage, {
        header: "...",
        back: "none",
        headerClassName: "bg-secondary",
        children: /*#__PURE__*/ _jsx("div", {
            className: "px-5 py-5 text-info text-center",
            children: /*#__PURE__*/ _jsx(Spinner, {})
        })
    });
}
class Nav extends (/* unused pure expression or super */ null && (StackNav)) {
    constructor(appNav, tabNav, initPage){
        super();
        this.appNav = appNav;
        this.tabNav = tabNav;
        this.internalOpen(initPage);
    }
    /*
        navigate(to: To, options?: NavigateOptions) {
            this.appNav.navigate(to, options);
        }
    */ openTab(tabItem) {
        this.tabNav.openTab(tabItem);
    }
    innerClose() {
        super.innerClose();
        if (this.data.stack.length > 0) return;
        if (this.tabNav) {
            this.tabNav.closeTab();
        } else {
            //this.appNav.close();
            this.appNav.cease();
        }
    }
}
const AppNavContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
const TabNavContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (React.createContext(undefined)));
const PageStackContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(undefined);
function useAppNav() {
    return useContext(AppNavContext);
}
function useTabNav() {
    return useContext(TabNavContext);
}
function useNav() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(PageStackContext);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export usePromise */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function usePromise(promiseFunc) {
    let { 0: value , 1: setValue  } = useState();
    useEffect(()=>{
        const func = async ()=>{
            let r = await promiseFunc();
            setValue(r);
        };
        func();
    }, [
        promiseFunc
    ]);
    return value;
}


/***/ }),

/***/ 6083:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports useScroll, ScrollContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useScroll() {
    //return undefined;
    let divRef = useRef();
    //let inScroll = useContext(ScrollContext);
    useEffect(()=>{
        //if (inScroll !== true) return;
        let resize = ()=>{
            let el = divRef.current;
            if (!el) return;
            if (el.offsetParent === null) return;
            let els = el.getElementsByClassName("tonwa-page-content");
            if (els.length === 0) return;
            let elContent = els[0];
            let elContainer = getScrollContainer(elContent);
            if (!elContainer) return;
            let h = elContainer.clientHeight;
            if (h < 1) return;
            elContent.parentElement.childNodes.forEach((v)=>{
                if (v.nodeType === Node.ELEMENT_NODE) {
                    if (v === elContent) return;
                    h -= v.offsetHeight;
                }
            });
            let tabs = getPageTabsContainerFromScrollContainer(elContainer);
            if (tabs) h -= tabs.clientHeight;
            if (h < 10) return;
            elContent.style.minHeight = h - 2 + "px";
        };
        window.addEventListener("resize", resize);
        window.addEventListener("DOMSubtreeModified", resize);
        resize();
        return function clean() {
            window.removeEventListener("resize", resize);
            window.removeEventListener("DOMSubtreeModified", resize);
        };
    }, []);
    //if (inScroll !== true) return;
    return divRef;
}
function getScrollContainer(el) {
    for(let p = el; p; p = p.parentElement){
        let { overflowY  } = p.style;
        if (overflowY) return p;
    }
}
function getPageTabsContainerFromScrollContainer(scrollContainer) {
    let el = scrollContainer.getElementsByClassName("nav nav-tabs position-sticky");
    if (el && el.length > 0) return el[0];
}
const ScrollContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(undefined);


/***/ }),

/***/ 3324:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "fX": () => (/* reexport */ EnumString),
  "iN": () => (/* binding */ resFuncs),
  "Ju": () => (/* binding */ resStrings)
});

// UNUSED EXPORTS: buildTFunc, useT

// EXTERNAL MODULE: ./tonwa-com/tools/index.ts + 7 modules
var tools = __webpack_require__(7574);
;// CONCATENATED MODULE: ./tonwa-com/res/defs.ts
var EnumString;
(function(EnumString) {
    EnumString[EnumString["rule_required"] = 0] = "rule_required";
    EnumString[EnumString["rule_mustBeInteger"] = 1] = "rule_mustBeInteger";
    EnumString[EnumString["rule_mustBeDecimal"] = 2] = "rule_mustBeDecimal";
    EnumString[EnumString["rule_belowMin"] = 3] = "rule_belowMin";
    EnumString[EnumString["rule_overMax"] = 4] = "rule_overMax";
    EnumString[EnumString["placeholder_pick"] = 5] = "placeholder_pick";
    EnumString[EnumString["placeholder_select"] = 6] = "placeholder_select";
    EnumString[EnumString["string_submit"] = 7] = "string_submit";
    EnumString[EnumString["time_yesterday"] = 8] = "time_yesterday";
    EnumString[EnumString["time_today"] = 9] = "time_today";
    EnumString[EnumString["time_tomorrow"] = 10] = "time_tomorrow";
})(EnumString || (EnumString = {}));

;// CONCATENATED MODULE: ./tonwa-com/res/en.ts

const en = {
    strings: {
        [EnumString.rule_required]: "Is required",
        [EnumString.rule_mustBeInteger]: "Must be integer",
        [EnumString.rule_mustBeDecimal]: "Must be number",
        [EnumString.rule_belowMin]: "Min is ",
        [EnumString.rule_overMax]: "Max is ",
        [EnumString.placeholder_pick]: "Click to pick",
        [EnumString.placeholder_select]: "Click to select",
        [EnumString.string_submit]: "Submit",
        [EnumString.time_yesterday]: "Yday",
        [EnumString.time_today]: "Today",
        [EnumString.time_tomorrow]: "Tmw"
    },
    funcs: {
        time_md: (month, date)=>`${month}-${date}`,
        time_ymd: (year, month, date)=>`${year}-${month}-${date}`
    }
};

;// CONCATENATED MODULE: ./tonwa-com/res/zh.ts

const zh = {
    strings: {
        [EnumString.rule_required]: "请填内容",
        [EnumString.rule_mustBeInteger]: "必须是整数",
        [EnumString.rule_mustBeDecimal]: "必须是数字",
        [EnumString.rule_belowMin]: "最小值",
        [EnumString.rule_overMax]: "最大值",
        [EnumString.placeholder_pick]: "请点击选择",
        [EnumString.placeholder_select]: "请点击选择",
        [EnumString.string_submit]: "提交",
        [EnumString.time_yesterday]: "昨天",
        [EnumString.time_today]: "今天",
        [EnumString.time_tomorrow]: "明天"
    },
    funcs: {
        time_md: (month, date)=>`${month}-${date}`,
        time_ymd: (year, month, date)=>`${year}-${month}-${date}`
    }
};

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./tonwa-com/res/useT.ts

function useT(...t) {
    let callback = useCallback((str)=>{
        for (let r of t){
            let ret = r(str);
            if (ret) return ret;
        }
        return str;
    }, [
        t
    ]);
    return callback;
}

;// CONCATENATED MODULE: ./tonwa-com/res/buildTFunc.ts

function buildTFunc(res) {
    let langRes = res[env.lang];
    return function(str) {
        return langRes[str];
    };
}

;// CONCATENATED MODULE: ./tonwa-com/res/index.ts



const resLang = {
    en: en,
    zh: zh
};
let resStrings = en.strings;
let resFuncs = en.funcs;



(function setLanguage() {
    let res = resLang[tools/* env.lang */.OB.lang];
    if (res) {
        resStrings = res.strings;
        resFuncs = res.funcs;
    }
})();


/***/ }),

/***/ 7574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "OB": () => (/* reexport */ env_env)
});

// UNUSED EXPORTS: LocalArr, LocalCache, LocalData, LocalMap, camelCase, capitalCase, dateFromHourId, dateFromMinuteId, from62, minute2020_01_01, renderDate, renderHourMinute, to62, toLocaleDateString, wait

;// CONCATENATED MODULE: ./tonwa-com/tools/62.ts
const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const c0 = digits.charCodeAt(0);
const c9 = digits.charCodeAt(9);
const A = digits.charCodeAt(10);
const Z = digits.charCodeAt(35);
const a = digits.charCodeAt(36);
const z = digits.charCodeAt(61);
function from62(v) {
    if (v === null) return null;
    if (v === undefined) return undefined;
    if (typeof v !== "string") return Number.NaN;
    let len = v.length;
    if (len === 0) return Number.NaN;
    let ret = 0;
    for(let i = 0; i < len; i++){
        let c = v.charCodeAt(i);
        let n;
        if (c < c0) return Number.NaN;
        if (c <= c9) {
            n = c - c0;
        } else if (c < A) {
            return Number.NaN;
        } else if (c <= Z) {
            n = c - A + 10;
        } else if (c < a) {
            return Number.NaN;
        } else if (c <= z) {
            n = c - a + 36;
        } else {
            return Number.NaN;
        }
        ret *= 62;
        ret += n;
    }
    return ret;
}
function to62(v) {
    if (v === null) return null;
    if (v === undefined) return undefined;
    if (typeof v !== "number") return "";
    if (v < 0) return "";
    let ret = "";
    for(;;){
        ret = digits[v % 62] + ret;
        v = Math.floor(v / 62);
        if (v === 0) break;
    }
    return ret;
}

;// CONCATENATED MODULE: ./tonwa-com/tools/localDb.ts
class _LocalStorage {
    constructor(){
        this.ls = global.localStorage;
    }
    getItem(key) {
        if (!this.ls) return null;
        return this.ls?.getItem(key);
    }
    setItem(key, value) {
        this.ls?.setItem(key, value);
    }
    removeItem(key) {
        this.ls?.removeItem(key);
    }
}
const __ls = new _LocalStorage(); // new Ls;
class LocalCache {
    constructor(local, key){
        this.local = local;
        this.key = key;
    }
    get() {
        try {
            // 下面缓冲的内容不能有，可能会被修改，造成circular引用
            //if (this.value !== undefined) return this.value;
            let text = this.local.getItem(this.key);
            if (text === null) return;
            if (text === undefined) return undefined;
            //return this.value = 
            return JSON.parse(text);
        } catch (err) {
            this.local.removeItem(this.key);
            return;
        }
    }
    set(value) {
        let t = JSON.stringify(value, (key, value)=>{
            if (key !== "_tuid") return value;
        });
        this.local.setItem(this.key, t);
    }
    remove(local) {
        if (local === undefined) {
            this.local.removeItem(this.key);
        } else {
            this.local.removeLocal(local);
        }
    }
    child(key) {
        return this.local.child(key);
    }
    arr(key) {
        return this.local.arr(key);
    }
    map(key) {
        return this.local.map(key);
    }
}
class Local {
    constructor(name){
        this.name = name;
        this.caches = {};
        this.locals = {};
    }
    getItem(key) {
        let k = this.keyForGet(key);
        if (k === undefined) return;
        return __ls.getItem(k);
    }
    setItem(key, value) {
        let k = this.keyForSet(key);
        __ls.setItem(k, value);
    }
    removeItem(key) {
        let k = this.keyForSet(key);
        if (k === undefined) return;
        localStorage.removeItem(k);
    }
    arr(key) {
        let sk = String(key);
        let arr = this.locals[sk];
        if (arr === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = arr = new LocalArr(k);
        }
        return arr;
    }
    map(key) {
        let sk = String(key);
        let map = this.locals[sk];
        if (map === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = map = new LocalMap(k);
        }
        return map;
    }
    removeLocal(local) {
        let sk = local.name;
        let k = this.keyForRemove(sk);
        if (k === undefined) return;
        let arr = this.locals[sk];
        if (arr === undefined) arr = new LocalArr(k);
        else this.locals[sk] = undefined;
        arr.removeAll();
    }
    child(key) {
        let ks = String(key);
        let ret = this.caches[ks];
        if (ret !== undefined) return ret;
        return this.caches[ks] = ret = new LocalCache(this, key);
    }
}
const maxArrSize = 500;
class LocalArr extends Local {
    constructor(name){
        super(name);
        let index = __ls.getItem(this.name);
        this.index = index === null ? [] : index.split("\n").map((v)=>Number(v));
    }
    saveIndex() {
        __ls.setItem(this.name, this.index.join("\n"));
    }
    keyForGet(key) {
        let i = this.index.indexOf(key);
        if (i < 0) return undefined;
        return `${this.name}.${key}`;
    }
    keyForSet(key) {
        let i = this.index.indexOf(key);
        if (i < 0) {
            this.index.unshift(key);
            if (this.index.length > maxArrSize) this.index.pop();
        } else {
            this.index.splice(i, 1);
            this.index.unshift(key);
        }
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    keyForRemove(key) {
        let i = this.index.indexOf(key);
        if (i < 0) return;
        this.index.splice(i, 1);
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    removeAll() {
        for (let i of this.index){
            __ls.removeItem(`${this.name}.${i}`);
        }
        __ls.removeItem(this.name);
        this.index.splice(0);
    }
    item(index) {
        return this.child(index);
    }
}
class LocalMap extends Local {
    constructor(name){
        super(name);
        this.max = 0;
        this.index = {};
        let index = __ls.getItem(this.name);
        if (index !== null) {
            let ls = index.split("\n");
            ls.forEach((l)=>{
                let p = l.indexOf("	");
                if (p < 0) return;
                let key = l.substr(0, p);
                let i = Number(l.substr(p + 1));
                if (isNaN(i) === true) return;
                this.index[key] = i;
                if (i > this.max) this.max = i;
            });
        }
    }
    saveIndex() {
        let ls = [];
        for(let k in this.index){
            let v = this.index[k];
            if (v === undefined) continue;
            ls.push(`${k}\t${v}`);
        }
        __ls.setItem(this.name, ls.join("\n"));
    }
    keyForGet(key) {
        let i = this.index[key];
        if (i === undefined) return undefined;
        return `${this.name}.${i}`;
    }
    keyForSet(key) {
        let i = this.index[key];
        if (i === undefined) {
            ++this.max;
            i = this.max;
            this.index[key] = i;
            this.saveIndex();
        }
        return `${this.name}.${i}`;
    }
    keyForRemove(key) {
        let i = this.index[key];
        if (i === undefined) return;
        this.index[key] = undefined;
        this.saveIndex();
        return `${this.name}.${i}`;
    }
    removeAll() {
        for(let i in this.index){
            __ls.removeItem(`${this.name}.${this.index[i]}`);
            this.index[i] = undefined;
        }
        __ls.removeItem(this.name);
        this.max = 0;
    }
    item(key) {
        return this.child(key);
    }
}

;// CONCATENATED MODULE: ./tonwa-com/tools/env.ts


const env_env = function() {
    let { unit , testing , params , lang , district , timeZone , isMobile  } = initEnv();
    return {
        unit,
        testing,
        buildingUq: false,
        params,
        lang,
        district,
        timeZone,
        browser: detectBrowser(),
        isDevelopment: "production" === "development",
        isMobile,
        localDb: new LocalMap(testing === true ? "$$" : "$"),
        setTimeout: (tag, callback, ms, ...args)=>{
            return global.setTimeout(callback, ms, ...args);
        },
        clearTimeout: (handle)=>{
            global.clearTimeout(handle);
        },
        setInterval: (callback, ms, ...args)=>{
            return global.setInterval(callback, ms, ...args);
        },
        clearInterval: (handle)=>{
            global.clearInterval(handle);
        }
    };
}();
function initEnv() {
    if (!global.window) return {};
    let pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
        return decodeURIComponent(s.replace(pl, " "));
    };
    let query = undefined;
    if (global.window) {
        let win = global.window;
        query = win.location.search.substring(1);
    }
    let params = {};
    for(;;){
        if (!query) break;
        let match = search.exec(query);
        if (!match) break;
        params[decode(match[1])] = decode(match[2]);
    }
    let testing; // = isTesting();
    let unit;
    let sUnit = params["u"] || params["unit"];
    if (sUnit) {
        let p = sUnit.indexOf("-");
        if (p >= 0) {
            let tc = sUnit.charCodeAt(p + 1);
            const tt = "tT";
            testing = tc === tt.charCodeAt(0) || tc === tt.charCodeAt(1);
            sUnit = sUnit.substring(0, p);
        } else {
            testing = false;
        }
        if (sUnit[0] === "0") {
            unit = Number(sUnit);
        } else {
            unit = from62(sUnit);
        }
        if (isNaN(unit) === true) unit = undefined;
    } else {
        // 下面都是为了兼容以前的操作。
        // 整个url上，只要有test作为独立的字符串出现，就是testing
        testing = /(\btest\b)/i.test(document.location.href);
        let unitName;
        let el = document.getElementById("unit");
        if (el) {
            unitName = el.innerText;
        } else {
            el = document.getElementById("unit.json");
            if (el) {
                let json = el.innerHTML;
                if (json) {
                    let res = JSON.parse(json);
                    unitName = res?.unit;
                }
            }
        }
        if (!unitName) {
            unitName = process.env.REACT_APP_UNIT;
        }
        if (unitName) {
            unit = Number.parseInt(unitName);
            if (Number.isInteger(unit) === false) {
                if (unitName === "百灵威") {
                    unit = 24;
                }
            }
        }
        if (!unit) unit = 0;
    }
    let lang, district;
    let language = navigator.languages && navigator.languages[0] // Chrome / Firefox
     || navigator.language; // ||   // All browsers
    //navigator.userLanguage; // IE <= 10
    if (!language) {
        lang = "zh";
        district = "CN";
    } else {
        let parts = language.split("-");
        lang = parts[0];
        if (parts.length > 1) district = parts[1].toUpperCase();
    }
    let timeZone = -new Date().getTimezoneOffset() / 60;
    const regEx = new RegExp("Android|webOS|iPhone|iPad|" + "BlackBerry|Windows Phone|" + "Opera Mini|IEMobile|Mobile", "i");
    const isMobile = regEx.test(navigator.userAgent);
    return {
        unit,
        testing,
        params,
        lang,
        district,
        timeZone,
        isMobile
    };
}
function detectBrowser() {
    let nav = global.navigator;
    if (!nav) return;
    if ((nav.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) >= 0) return "Opera";
    if (nav.userAgent.indexOf("Chrome") >= 0) return "Chrome";
    if (nav.userAgent.indexOf("Safari") >= 0) return "Safari";
    if (nav.userAgent.indexOf("Firefox") >= 0) return "Firefox";
    if (nav.userAgent.indexOf("MSIE") >= 0 || !!document.documentMode === true) return "IE"; //crap
    return "Unknown";
}

;// CONCATENATED MODULE: ./tonwa-com/tools/localData.ts

class LocalData {
    user = env.localDb.child("user");
    guest = env.localDb.child("guest");
    unit = env.localDb.child("unit");
    readToMemory() {
        this._user = this.user.get();
        this._guest = this.guest.get();
        this._unit = this.unit.get();
    }
    saveToLocalStorage() {
        this.user.set(this._user);
        this.guest.set(this._guest);
        this.unit.set(this._unit);
    }
    logoutClear() {
        [
            this.user,
            this.unit, 
        ].forEach((d)=>d.remove());
    }
}

;// CONCATENATED MODULE: ./tonwa-com/tools/caseString.ts
function capitalCase(s) {
    let parts = s.split(/[-._]/);
    return parts.map((v)=>firstCharUppercase(v)).join("_");
}
function camelCase(s) {
    let parts = s.split(/[-._]/);
    let len = parts.length;
    parts[0] = firstCharLowercase(parts[0]);
    for(let i = 1; i < len; i++){
        parts[1] = firstCharUppercase(parts[1]);
    }
    return parts.join("_");
}
const aCode = "a".charCodeAt(0);
const zCode = "z".charCodeAt(0);
function firstCharUppercase(s) {
    if (!s) return "";
    let c = s.charCodeAt(0);
    if (c >= aCode && c <= zCode) {
        return String.fromCharCode(c - 0x20) + s.substr(1);
    }
    return s;
}
const ACode = "A".charCodeAt(0);
const ZCode = "Z".charCodeAt(0);
function firstCharLowercase(s) {
    if (!s) return "";
    let c = s.charCodeAt(0);
    if (c >= ACode && c <= ZCode) {
        return String.fromCharCode(c + 0x20) + s.substr(1);
    }
    return s;
}

;// CONCATENATED MODULE: ./tonwa-com/tools/date.ts

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
function toLocaleDateString(date) {
    if (!date) return "";
    return date.toLocaleDateString("zh-cn", options);
}
const minute2020_01_01 = 0; // 2020-1-1 到 1970-1-1 的分钟数
function dateFromMinuteId(id, timeZone) {
    let envTimezone = env.timeZone;
    let m = id / Math.pow(2, 20) + (-envTimezone + (timeZone ?? envTimezone));
    return new Date((m + minute2020_01_01) * 60000);
}
function dateFromHourId(id, timeZone) {
    let envTimezone = env.timeZone;
    let m = id + (-envTimezone + (timeZone ?? envTimezone));
    return new Date((m + minute2020_01_01) * 60 * 60000);
}

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./tonwa-com/tools/renderDate.tsx

function renderDate(date) {
    if (!date) return null;
    let parts = date.split("-");
    let d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: d.toDateString()
    });
}
function renderHourMinute(time) {
    let parts = time.split(":");
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            parts[0],
            ":",
            parts[1]
        ]
    });
}

;// CONCATENATED MODULE: ./tonwa-com/tools/index.ts










/***/ })

};
;