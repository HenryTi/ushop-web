"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 8465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "jwt-decode"
const external_jwt_decode_namespaceObject = require("jwt-decode");
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_namespaceObject);
;// CONCATENATED MODULE: ./tonwa-uq/tool/user.ts

function decodeUserToken(token) {
    let ret = external_jwt_decode_default()(token);
    let user = {
        id: ret.id,
        name: ret.name,
        guest: ret.guest,
        token: token
    };
    return user;
}
function decodeGuestToken(token) {
    let ret = external_jwt_decode_default()(token);
    let guest = {
        id: 0,
        guest: ret.guest,
        token: token
    };
    return guest;
}

;// CONCATENATED MODULE: ./tonwa-uq/tool/UqError.ts
var UqError;
(function(UqError) {
    UqError["undefined_entity"] = "UndefinedEntity";
    UqError["undefined_uq"] = "UndefinedUq";
})(UqError || (UqError = {}));

;// CONCATENATED MODULE: ./tonwa-uq/tool/LocalDb.ts
class LocalDb {
    createLocalMap(name) {
        return new LocalMap(this, name);
    }
}
class LocalMapDb extends LocalDb {
    constructor(){
        super();
        this.map = new Map();
    }
    getItem(key) {
        return this.map.get(key);
    }
    setItem(key, value) {
        this.map.set(key, value);
    }
    removeItem(key) {
        this.map.delete(key);
    }
}
// const __ls = new _LocalStorage(); // new Ls;
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
    constructor(localDb, name){
        this.localDb = localDb;
        this.name = name;
        this.caches = {};
        this.locals = {};
    }
    getItem(key) {
        let k = this.keyForGet(key);
        if (k === undefined) return;
        return this.localDb.getItem(k);
    }
    setItem(key, value) {
        let k = this.keyForSet(key);
        this.localDb.setItem(k, value);
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
            this.locals[sk] = arr = new LocalArr(this.localDb, k);
        }
        return arr;
    }
    map(key) {
        let sk = String(key);
        let map = this.locals[sk];
        if (map === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = map = new LocalMap(this.localDb, k);
        }
        return map;
    }
    removeLocal(local) {
        let sk = local.name;
        let k = this.keyForRemove(sk);
        if (k === undefined) return;
        let arr = this.locals[sk];
        if (arr === undefined) arr = new LocalArr(this.localDb, k);
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
    constructor(localDb, name){
        super(localDb, name);
        let index = this.localDb.getItem(this.name);
        if (index) {
            this.index = index.split("\n").map((v)=>Number(v));
        } else {
            this.index = [];
        }
    }
    saveIndex() {
        this.localDb.setItem(this.name, this.index.join("\n"));
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
            this.localDb.removeItem(`${this.name}.${i}`);
        }
        this.localDb.removeItem(this.name);
        this.index.splice(0);
    }
    item(index) {
        return this.child(index);
    }
}
class LocalMap extends Local {
    constructor(localDb, name){
        super(localDb, name);
        this.max = 0;
        this.index = {};
        let index = this.localDb.getItem(this.name);
        if (index) {
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
        this.localDb.setItem(this.name, ls.join("\n"));
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
            this.localDb.removeItem(`${this.name}.${this.index[i]}`);
            this.index[i] = undefined;
        }
        this.localDb.removeItem(this.name);
        this.max = 0;
    }
    item(key) {
        return this.child(key);
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/tool/caseString.ts
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

;// CONCATENATED MODULE: ./tonwa-uq/tool/getObjPropIgnoreCase.ts
function getObjPropIgnoreCase(obj, prop) {
    if (!obj) return;
    if (!prop) return;
    let keys = Object.keys(obj);
    prop = prop.toLowerCase();
    for (let key of keys){
        if (key.toLowerCase() === prop) return obj[key];
    }
    return;
}

;// CONCATENATED MODULE: ./tonwa-uq/tool/index.ts








;// CONCATENATED MODULE: ./tonwa-uq/net/caller.ts
class Caller {
    constructor(params, $$user = undefined, waiting){
        this._params = params;
        this.$$user = $$user;
        this.waiting = waiting;
    }
    get params() {
        return this._params;
    }
    buildParams() {
        return this.params;
    }
    method = "POST";
    get headers() {
        return undefined;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/UqTokens.ts
/*
interface UqTokenAction {
    resolve: (value?: UqToken | PromiseLike<UqToken>) => void;
    reject: (reason?: any) => void;
}
*/ class UqTokens {
    uqTokens = {};
    constructor(net){
        this.net = net;
    }
    logoutUqTokens() {
        for(let i in this.uqTokens){
            this.uqTokens[i] = undefined;
        }
        this.net.uqTokenApi.clearLocal();
    }
    //private readonly uqTokenActions: { [uq: string]: UqTokenAction } = {};
    async buildAppUq(uq, uqOwner, uqName) {
        //let unit = getUnit();
        let { unit  } = this.net.props;
        let uqToken = await this.net.uqTokenApi.uq({
            unit,
            uqOwner,
            uqName
        });
        if (uqToken.token === undefined) uqToken.token = this.net.centerToken;
        let { db , url , urlTest  } = uqToken;
        let uqUrl = this.net.buildUqUrl(db, url, urlTest);
        console.log("realUrl: %s", uqUrl);
        uqToken.url = uqUrl;
        this.uqTokens[uq] = uqToken;
        return uqToken;
    }
    getUqToken(uq) {
        let uts = this.uqTokens;
        return uts[uq];
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/httpChannel.ts
/*
export async function httpGet(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.get('', params);
    return ret;
}

export async function httpPost(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.post('', params);
    return ret;
}
*/ const methodsWithBody = [
    "POST",
    "PUT"
];
class HttpChannel {
    constructor(net, hostUrl, authToken){
        this.net = net;
        this.hostUrl = hostUrl;
        this.authToken = authToken;
        this.timeout = net.isDevelopment === true ? 30000 : 50000;
    }
    used() {
        this.post("", {});
    }
    async xcall(urlPrefix, caller) {
        let options = this.buildOptions();
        let { headers , path , method  } = caller;
        if (headers !== undefined) {
            let h = options.headers;
            for(let i in headers){
                //h.append(i, encodeURI(headers[i]));
                h[i] = encodeURI(headers[i]);
            }
        }
        options.method = method;
        let p = caller.buildParams();
        if (methodsWithBody.indexOf(method) >= 0 && p !== undefined) {
            options.body = JSON.stringify(p);
        }
        return await this.innerFetch(urlPrefix + path, options);
    }
    async innerFetchResult(url, options) {
        let ret = await this.innerFetch(url, options);
        return ret.res;
    }
    async get(url, params = undefined) {
        if (params) {
            let keys = Object.keys(params);
            if (keys.length > 0) {
                let c = "?";
                for (let k of keys){
                    let v = params[k];
                    if (v === undefined) continue;
                    url += c + k + "=" + params[k];
                    c = "&";
                }
            }
        }
        let options = this.buildOptions();
        options.method = "GET";
        return await this.innerFetchResult(url, options);
    }
    async post(url, params) {
        let options = this.buildOptions();
        options.method = "POST";
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }
    async put(url, params) {
        let options = this.buildOptions();
        options.method = "PUT";
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }
    async delete(url, params) {
        let options = this.buildOptions();
        options.method = "DELETE";
        options.body = JSON.stringify(params);
        return await this.innerFetchResult(url, options);
    }
    async fetch(url, options, resolve, reject) {
        let path = url;
        try {
            console.log("%s-%s %s", options.method, path, options.body || "");
            let now = Date.now();
            let timeOutHandler = setTimeout(()=>{
                throw new Error(`webapi timeout: ${Date.now() - now}ms ${url}`);
            }, this.timeout);
            let res = await fetch(encodeURI(path), options);
            if (res.ok === false) {
                clearTimeout(timeOutHandler);
                console.log("call error %s", res.statusText);
                throw res.statusText;
            }
            let ct = res.headers.get("content-type");
            if (ct && ct.indexOf("json") >= 0) {
                return res.json().then(async (retJson)=>{
                    clearTimeout(timeOutHandler);
                    if (retJson.ok === true) {
                        if (typeof retJson !== "object") {
                            debugger;
                        } else if (Array.isArray(retJson) === true) {
                            debugger;
                        }
                        return resolve(retJson);
                    }
                    let retError = retJson.error;
                    if (retError === undefined) {
                        reject("not valid tonwa json");
                    } else {
                        reject(retError);
                    }
                }).catch(async (error)=>{
                    reject(error);
                });
            } else {
                let text = await res.text();
                clearTimeout(timeOutHandler);
                console.log("text endWait");
                resolve(text);
            }
        } catch (error) {
            if (typeof error === "string") {
                let err = error.toLowerCase();
                if (err.startsWith("unauthorized") === true || err.startsWith("$roles") === true) {
                    this.net.logout();
                    return;
                }
            }
            console.error("fecth error (no nav.showError): " + url);
        }
    }
    //protected abstract innerFetch(url: string, options: any): Promise<any>;
    async innerFetch(url, options) {
        let u = this.hostUrl + url;
        return new Promise(async (resolve, reject)=>{
            await this.fetch(u, options, resolve, reject);
        });
    }
    async callFetch(url, method, body) {
        let options = this.buildOptions();
        options.method = method;
        options.body = body;
        return new Promise(async (resolve, reject)=>{
            await this.fetch(url, options, resolve, reject);
        });
    }
    //private buildOptions(): {method:string; headers:Headers; body:any} {
    buildOptions() {
        let headers = this.buildHeaders();
        let options = {
            headers: headers,
            method: undefined,
            body: undefined
        };
        return options;
    }
    /*
    protected buildHeaders():Headers {
        let {language, culture} = nav;
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let lang = language;
        if (culture) lang += '-' + culture;
        headers.append('Accept-Language', lang);
        if (this.apiToken) { 
            headers.append('Authorization', this.apiToken); 
        }
        return headers;
    }
    */ buildHeaders() {
        let { language , culture  } = this.net;
        let headers = {}; //new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        //headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers["Content-Type"] = "application/json;charset=UTF-8";
        let lang = language;
        if (culture) lang += "-" + culture;
        //headers.append('Accept-Language', lang);
        headers["Accept-Language"] = lang;
        if (this.authToken) {
            //headers.append('Authorization', this.apiToken); 
            headers["Authorization"] = this.authToken;
        }
        return headers;
    }
} /*
export class CenterHttpChannel extends HttpChannel {
    protected async innerFetch(url: string, options: any): Promise<any> {
        let u = this.hostUrl + url;
        return new Promise<any>(async (resolve, reject) => {
            await this.fetch(u, options, resolve, reject);
        });
    }
}

export class UqHttpChannel extends HttpChannel {
    protected async innerFetch(url: string, options: any): Promise<any> {
        let u = this.hostUrl + url;
        return new Promise<any>(async (resolve, reject) => {
            await this.fetch(u, options, resolve, reject);
        });
    }
}
*/ 

;// CONCATENATED MODULE: ./tonwa-uq/net/apiBase.ts
async function refetchApi(channel, url, options, resolve, reject) {
    await channel.fetch(url, options, resolve, reject);
}
class ApiBase {
    constructor(net, path){
        this.net = net;
        this.path = path || "";
    }
    async xcall(caller) {
        let channel = await this.getHttpChannel();
        return await channel.xcall(this.path, caller);
    }
    async call(url, method, body) {
        let channel = await this.getHttpChannel();
        return await channel.callFetch(url, method, body);
    }
    async get(path, params = undefined) {
        let channel = await this.getHttpChannel();
        return await channel.get(this.path + path, params);
    }
    async post(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.post(this.path + path, params);
    }
    async put(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.put(this.path + path, params);
    }
    async delete(path, params) {
        let channel = await this.getHttpChannel();
        return await channel.delete(this.path + path, params);
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/uqApi.ts


class UqApi extends ApiBase {
    inited = false;
    constructor(net, basePath, uqOwner, uqName){
        super(net, basePath);
        if (uqName) {
            this.uqOwner = uqOwner;
            this.uqName = uqName;
            this.uq = uqOwner + "/" + uqName;
        }
    }
    async init() {
        if (this.inited === true) return;
        await this.net.uqTokens.buildAppUq(this.uq, this.uqOwner, this.uqName);
        this.inited = true;
    }
    async getHttpChannel() {
        let { uqChannels  } = this.net;
        let channel = uqChannels[this.uq];
        if (channel !== undefined) {
            if (Array.isArray(channel) === false) return channel;
        } else {
            channel = uqChannels[this.uq] = [];
        }
        let arr = channel;
        return new Promise(async (resolve, reject)=>{
            arr.push({
                resolve,
                reject
            });
            if (arr.length !== 1) return;
            let uqToken = this.net.uqTokens.getUqToken(this.uq); //, this.uqOwner, this.uqName);
            if (!uqToken) {
                //debugger;
                this.inited = false;
                await this.init();
                uqToken = this.net.uqTokens.getUqToken(this.uq);
            }
            let { url , token  } = uqToken;
            this.token = token;
            channel = new HttpChannel(this.net, url, token);
            uqChannels[this.uq] = channel;
            for (let pv of arr){
                pv.resolve(channel);
            }
        });
    }
    async loadEntities() {
        let ret = await this.get("entities");
        return ret;
    }
    async getAdmins() {
        let ret = await this.get("get-admins");
        return ret;
    }
    async setMeAdmin() {
        await this.get("set-me-admin");
    }
    async setAdmin(user, role, assigned) {
        await this.post("set-admin", {
            user,
            role,
            assigned
        });
    }
    async isAdmin() {
        let ret = await this.get("is-admin");
        return ret;
    }
    async getRoles() {
        let ret = await this.get("get-roles");
        if (!ret) return null;
        let parts = ret.split("|");
        let s = [];
        for (let p of parts){
            p = p.trim();
            if (!p) continue;
            s.push(p);
        }
        if (s.length === 0) return null;
        return s;
    }
    async getAllRoleUsers() {
        let ret = await this.get("get-all-role-users");
        return ret;
    }
    async setUserRoles(theUser, roles) {
        await this.post("set-user-roles", {
            theUser,
            roles
        });
    }
    async deleteUserRoles(theUser) {
        await this.get("delete-user-roles", {
            theUser
        });
    }
    async allSchemas() {
        return await this.get("all-schemas");
    }
    async schema(name) {
        return await this.get("schema/" + name);
    }
    async queueModify(start, page, entities) {
        return await this.post("queue-modify", {
            start: start,
            page: page,
            entities: entities
        });
    }
}
class CenterApiBase extends ApiBase {
    async getHttpChannel() {
        return this.net.getCenterChannel();
    }
}
const uqTokensName = "uqTokens";
class UqTokenApi extends CenterApiBase {
    constructor(net, path){
        super(net, path);
        this.localMap = net.localDb.createLocalMap(uqTokensName);
    }
    clearLocal() {
        this.localMap.removeAll();
    }
    async uq(params) {
        let { uqOwner , uqName  } = params;
        let un = uqOwner + "/" + uqName;
        let localCache = this.localMap.child(un);
        try {
            let uqToken = localCache.get();
            if (uqToken !== undefined) {
                let { unit , user  } = uqToken;
                if (unit !== params.unit || user !== this.net.loginedUserId) {
                    localCache.remove();
                    uqToken = undefined;
                }
            }
            let nowTick = Math.floor(Date.now() / 1000);
            if (uqToken !== undefined) {
                let { tick , value  } = uqToken;
                if (value !== undefined && nowTick - tick < 24 * 3600) {
                    return Object.assign({}, value);
                }
            }
            let uqParams = Object.assign({}, params);
            //uqParams.testing = this.net.hostMan.testing;
            let ret = await this.get("open/uq-token", uqParams);
            if (ret === undefined) {
                let { unit: unit1 , uqOwner: uqOwner1 , uqName: uqName1  } = params;
                let err = `center get app-uq(unit=${unit1}, '${uqOwner1}/${uqName1}') - not exists or no unit-service`;
                throw err;
            }
            uqToken = {
                unit: params.unit,
                user: this.net.loginedUserId,
                tick: nowTick,
                value: ret
            };
            localCache.set(uqToken);
            return Object.assign({}, ret);
        } catch (err1) {
            localCache.remove();
            throw err1;
        }
    }
}
class CallCenterApi extends CenterApiBase {
    directCall(url, method, body) {
        return this.call(url, method, body);
    }
}
//const appUqsName = 'appUqs';
class CenterAppApi extends CenterApiBase {
    async appUqs(appOwner, appName) {
        let ret = await this.get("tie/app-uqs", {
            appOwner,
            appName
        });
        return ret;
    }
    async uqs(uqs) {
        return await this.post("open/pure-uqs", uqs);
    }
    async unitxUq(unit) {
        return await this.get("tie/unitx-uq", {
            unit: unit
        });
    }
    async changePassword(param) {
        return await this.post("tie/change-password", param);
    }
    async userQuit() {
        await this.get("tie/user-ask-quit", {});
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/centerApi.ts

class CenterApi extends CenterApiBase {
    async userAppUnits(app) {
        return await this.get("tie/user-app-units", {
            app: app
        });
    }
    async userFromKey(userName) {
        return await this.get("tie/user-from-key", {
            key: userName
        });
    }
    async userFromId(userId) {
        return await this.get("user/user-name-nick-icon-from-id", {
            userId: userId
        });
    }
    async userFromName(userName) {
        return await this.get("tie/user-from-key", {
            key: userName
        });
    }
    async usersFromEmail(email) {
        return await this.get("tie/users-from-email", {
            email
        });
    }
    async userFromMobile(mobile) {
        return await this.get("tie/users-from-mobile", {
            mobile
        });
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/userApi.ts


class UserApi extends CenterApiBase {
    async login(params) {
        let ret = await this.post("user/login", params);
        switch(typeof ret){
            default:
                return;
            case "string":
                return decodeUserToken(ret);
            case "object":
                let token = ret.token;
                let user = decodeUserToken(token);
                let { nick , icon  } = ret;
                if (nick) user.nick = nick;
                if (icon) user.icon = icon;
                return user;
        }
    }
    async register(params) {
        return await this.post("user/register", params);
    }
    async changePassword(param) {
        return await this.post("tie/change-password", param);
    }
    async sendVerify(account, type, oem) {
        return await this.post("user/set-verify", {
            account: account,
            type: type,
            oem: oem
        });
    }
    async checkVerify(account, verify) {
        return await this.post("user/check-verify", {
            account: account,
            verify: verify
        });
    }
    async isExists(account) {
        return await this.get("user/is-exists", {
            account: account
        });
    }
    async resetPassword(account, password, verify, type) {
        return await this.post("user/reset-password", {
            account: account,
            password,
            verify,
            type
        });
    }
    async userSetProp(prop, value) {
        await this.post("tie/user-set-prop", {
            prop: prop,
            value: value
        });
    }
    async me() {
        return await this.get("tie/me");
    }
    async user(id) {
        return await this.get("tie/user", {
            id: id
        });
    }
    async fromKey(key) {
        return await this.get("tie/user-from-key", {
            key
        });
    }
    async guest() {
        //let guest = nav.local.guest.get();
        let ret = await this.get("guest/", {});
        switch(typeof ret){
            default:
                return;
            case "string":
                return decodeGuestToken(ret);
            case "object":
                let guest = decodeGuestToken(ret.token);
                return guest;
        }
    }
    async userQuit() {
        await this.get("tie/user-ask-quit", {});
    }
    async userAppUnits(app) {
        return await this.get("tie/user-app-units", {
            app: app
        });
    }
    async userFromKey(userName) {
        return await this.get("tie/user-from-key", {
            key: userName
        });
    }
    async userFromId(userId) {
        return await this.get("user/user-name-nick-icon-from-id", {
            userId: userId
        });
    }
    async userFromName(userName) {
        return await this.get("tie/user-from-key", {
            key: userName
        });
    }
    async usersFromEmail(email) {
        return await this.get("tie/users-from-email", {
            email
        });
    }
    async userFromMobile(mobile) {
        return await this.get("tie/users-from-mobile", {
            mobile
        });
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/messageHub.ts
class MessageHub {
    constructor(net){
        this.net = net;
    }
    handlerSeed = 1;
    anyHandlers = {};
    msgHandlers = {};
    registerReceiveHandler(...args) {
        let seed = this.handlerSeed++;
        let args0 = args[0];
        let handler;
        switch(typeof args0){
            case "string":
                handler = args[1];
                this.msgHandlers[seed] = {
                    type: args0,
                    handler
                };
                break;
            case "function":
                this.anyHandlers[seed] = args0;
                break;
        }
        return seed;
    }
    unregisterReceiveHandler(handlerId) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    }
    async dispatch(msg) {
        let { $type  } = msg;
        for(let i in this.anyHandlers){
            await this.anyHandlers[i](msg);
        }
        for(let i1 in this.msgHandlers){
            let { type , handler  } = this.msgHandlers[i1];
            if (type !== $type) continue;
            await handler(msg);
        }
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/wsChannel.ts
let subAppWindow; // Window;
function postWsToSubApp(msg) {
    if (subAppWindow === undefined) return;
    subAppWindow.postMessage({
        type: "ws",
        msg: msg
    }, "*");
}
function setSubAppWindow(win) {
    subAppWindow = win;
}
function postWsToTop(msg) {
    window.top.postMessage({
        type: "ws",
        msg: msg
    }, "*");
}
class WsBase {
    constructor(net){
        this.net = net;
    }
    async receive(msg) {
        this.net.messageHub.dispatch(msg);
    }
}
let wsBaseSeed = 1;
class WsBridge extends WsBase {
    wsBaseId = "WsBridge seed " + wsBaseSeed++;
}
class WSChannel extends WsBase {
    wsBaseId = "WSChannel seed " + wsBaseSeed++;
    constructor(net, wsHost, token){
        super(net);
        this.wsHost = wsHost;
        this.token = token;
    }
    static setCenterToken(token) {
        WSChannel.centerToken = token;
    }
    connect() {
        //this.wsHost = wsHost;
        //this.token = token || WSChannel.centerToken;
        if (this.ws !== undefined) return;
        let that = this;
        return new Promise((resolve, reject)=>{
            let ws = new WebSocket(this.wsHost, this.token || WSChannel.centerToken);
            console.log("connect webSocket %s", this.wsHost);
            ws.onopen = (ev)=>{
                console.log("webSocket connected %s", this.wsHost);
                that.ws = ws;
                resolve();
            };
            ws.onerror = (ev)=>{
                reject("webSocket can't open!");
            };
            ws.onmessage = async (msg)=>await that.wsMessage(msg);
            ws.onclose = (ev)=>{
                that.ws = undefined;
                console.log("webSocket closed!");
            };
        });
    }
    close() {
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
        }
    }
    async wsMessage(event) {
        try {
            console.log("websocket message: %s", event.data);
            let msg = JSON.parse(event.data);
            postWsToSubApp(msg);
            await this.receive(msg);
        } catch (err) {
            console.log("ws msg error: ", err);
        }
    }
    sendWs(msg) {
        let netThis = this;
        this.connect().then(()=>{
            netThis.ws.send(msg);
        });
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/host.ts
/*
interface HostValue {
    value: string;
    local: boolean;
}
const hosts: { [name: string]: HostValue } = {
    centerhost: {
        value: undefined || centerDebugHost, // process.env['REACT_APP_CENTER_DEBUG_HOST']
        local: false,
    },
    reshost: {
        value: undefined || resDebugHost, // process.env['REACT_APP_RES_DEBUG_HOST']
        local: false,
    },
    uqhost: {
        value: undefined || uqDebugHost, // process.env['REACT_APP_UQ_DEBUG_HOST']
        local: false,
    },
    unitxhost: {
        value: undefined || uqDebugHost, // process.env['REACT_APP_UQ_DEBUG_HOST']
        local: false,
    },
    "uq-build": {
        value: undefined || uqDebugBuilderHost, // process.env['REACT_APP_UQ_DEBUG_BUILDER_HOST']
        local: false,
    }
}

const httpArr = ['https://', 'http://'];
function isAbsoluteUrl(url: string): boolean {
    for (let str of httpArr) {
        if (url.startsWith(str) === true) return true;
    }
    return false;
}

function urlFromHost(host: string): string {
    if (isAbsoluteUrl(host) === true) {
        if (host.endsWith('/')) return host;
        return host + '/';
    }
    return `http://${host}/`;
}

function centerUrlFromHost(host: string): string {
    return urlFromHost(host);
}
function centerWsFromHost(host: string) {
    let https = 'https://';
    if (host.startsWith(https) === true) {
        host = host.substr(https.length);
        if (host.endsWith('/') === true) host = host.substr(0, host.length - 1);
        return 'wss://' + host + '/tv/';
    }
    return `ws://${host}/tv/`
}
export function resUrlFromHost(host: string) {
    if (!host) return;
    let url = urlFromHost(host);
    return url + 'res/';
}
*/ const fetchOptions = {
    method: "GET",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain"
    }
};
async function buildHosts(center) {
    let uq, res;
    if (center.endsWith("/") === false) {
        center += "/";
    }
    return {
        center,
        uq,
        res
    };
}
async function buildDebugHosts(center, debugHosts) {
    if (center.endsWith("/") === false) {
        center += "/";
    }
    if (!debugHosts) {
        return {
            center,
            uq: undefined,
            res: undefined
        };
    }
    let { center: debugCenter , uq , res  } = debugHosts;
    let promises = [
        debugCenter,
        uq,
        res
    ].map((v)=>localCheck(v));
    let results = await Promise.all(promises);
    if (results[0] === true) center = `http://${debugCenter}/`;
    if (results[1] === true) {
        uq = `http://${uq}/`;
    } else {
        uq = undefined;
    }
    if (results[2] === true) {
        res = `http://${res}/`;
    } else {
        res = undefined;
    }
    return {
        center,
        uq,
        res
    };
}
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
const timeout = 2000;
function fetchLocalCheck(url) {
    return new Promise((resolve, reject)=>{
        fetch(url, fetchOptions).then((v)=>{
            v.text().then(resolve).catch(reject);
        }).catch(reject);
        const e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
    });
}
async function localCheck(host) {
    if (!host) return false;
    let url = `http://${host}/hello`;
    try {
        await fetchLocalCheck(url);
        return true;
    } catch (err) {
        return false;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/Net.ts
/* eslint-disable */ 







class Net {
    logout() {
    // throw new Error('Method not implemented.');
    }
    centerToken = undefined;
    loginedUserId = 0;
    uqChannels = {};
    // -- end -------------------
    constructor(props){
        this.props = props;
        this.isDevelopment = "production" === "development";
        this.testing = props.testing;
        this.localDb = this.props.localDb;
        this.createObservableMap = this.props.createObservableMap;
        this.centerApi = new CenterApi(this, "tv/");
        this.uqTokens = new UqTokens(this);
        this.userApi = new UserApi(this, "tv/");
        this.uqTokenApi = new UqTokenApi(this, "tv/");
        this.callCenterapi = new CallCenterApi(this, "");
        //this.guestApi = new GuestApi(this, 'tv/guest/');
        this.messageHub = new MessageHub(this);
        this.wsBridge = new WsBridge(this);
    //this.hostMan = HostMan.createHost(this.isDevelopment);
    }
    async init() {
        let { center , debug  } = this.props;
        this.hosts = this.isDevelopment === true ? await buildDebugHosts(center, debug) : await buildHosts(center);
        //await this.hostMan.start(testing)
        //let { url } = this.hostMan;
        this.setCenterUrl(this.hosts.center);
    }
    getResUrl(res) {
        return this.hosts.res + res;
    }
    logoutApis() {
        this.uqTokens.logoutUqTokens();
        for(let i in this.uqChannels)this.uqChannels[i] = undefined;
    }
    setCenterUrl(url) {
        console.log("setCenterUrl %s", url);
        this.centerHost = url;
        this.centerChannel = undefined;
    }
    setCenterToken(userId, token) {
        this.loginedUserId = userId;
        this.centerToken = token;
        this.centerChannel = undefined;
        WSChannel.setCenterToken(token);
    }
    clearCenterToken() {
        this.setCenterToken(0, undefined);
        WSChannel.setCenterToken(undefined);
    }
    getCenterChannel() {
        if (this.centerChannel !== undefined) return this.centerChannel;
        let centerHost = this.hosts.center;
        return this.centerChannel = new HttpChannel(this, centerHost, this.centerToken);
    }
    /*
    resUrlFromHost(host: string): string {
        return resUrlFromHost(host);
    }
    */ buildUqUrl(db, url, urlTest) {
        let testOrProd;
        if (this.testing === true) {
            let { uq  } = this.hosts;
            if (uq) {
                url = uq;
            } else if (urlTest !== "-") {
                url = urlTest;
            }
            testOrProd = "test";
        } else {
            testOrProd = "prod";
        }
        if (url.endsWith("/") === false) {
            url += "/";
        }
        return `${url}uq/${testOrProd}/${db}/`;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/net/index.ts







;// CONCATENATED MODULE: ./tonwa-uq/uqCore/entity.ts

const tab = "	";
const ln = "\n";
const chars = "\\ntbfvr";
const codeBackSlash = chars.charCodeAt(0);
const codeN = chars.charCodeAt(1);
const codeT = chars.charCodeAt(2);
const codeB = chars.charCodeAt(3);
const codeF = chars.charCodeAt(4);
const codeV = chars.charCodeAt(5);
const codeR = chars.charCodeAt(6);
const codes = "\n	\b\f\v\r";
const codeBN = codes.charCodeAt(0);
const codeBT = codes.charCodeAt(1);
const codeBB = codes.charCodeAt(2);
const codeBF = codes.charCodeAt(3);
const codeBV = codes.charCodeAt(4);
const codeBR = codes.charCodeAt(5);
class Entity {
    ver = 0;
    get sName() {
        return this.jName || this.name;
    }
    constructor(uq, name, typeId){
        this.uq = uq;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf("$") >= 0;
        this.schemaLocal = this.uq.localMap.item(this.name); // new EntityCache(this);
        this.uqApi = this.uq.uqApi;
    }
    //getApiFrom() {return this.entities.uqApi;}
    fieldMaps = {};
    fieldMap(arr) {
        if (arr === undefined) arr = "$";
        let ret = this.fieldMaps[arr];
        if (ret === undefined) {
            let fields;
            if (arr === "$") fields = this.fields;
            else if (this.arrFields !== undefined) {
                let arrFields = this.arrFields.find((v)=>v.name === arr);
                if (arrFields !== undefined) fields = arrFields.fields;
            } else if (this.returns !== undefined) {
                let arrFields1 = this.returns.find((v)=>v.name === arr);
                if (arrFields1 !== undefined) fields = arrFields1.fields;
            }
            if (fields === undefined) return {};
            ret = {};
            for (let f of fields)ret[f.name] = f;
            this.fieldMaps[arr] = ret;
        }
        return ret;
    }
    async loadSchema() {
        if (this.schema !== undefined) return;
        let schema = this.schemaLocal.get();
        if (!schema) {
            schema = await this.uq.loadEntitySchema(this.name);
        }
        //this.setSchema(schema);
        //this.buildFieldsTuid();
        this.buildSchema(schema);
        await this.loadValues();
    }
    buildSchema(schema) {
        this.setSchema(schema);
        this.buildFieldsTuid();
    //await this.loadValues();
    }
    async loadValues() {}
    // 如果要在setSchema里面保存cache，必须先调用clearSchema
    clearSchema() {
        this.schema = undefined;
    }
    setSchema(schema) {
        if (schema === undefined) return;
        let { name , version  } = schema;
        this.ver = version || 0;
        this.setJName(name);
        this.schemaLocal.set(schema);
        this.schema = schema;
        this.buildFieldsTuid();
    }
    setJName(name) {
        if (name !== this.name) this.jName = name;
    }
    setKeys() {}
    buildFieldsTuid() {
        let { fields , arrs , returns  } = this.schema;
        this.fields = fields;
        this.setKeys();
        this.uq.buildFieldTuid(fields);
        this.arrFields = arrs;
        this.uq.buildArrFieldsTuid(arrs, fields);
        this.returns = returns;
        this.uq.buildArrFieldsTuid(returns, fields);
    }
    schemaStringify() {
        return JSON.stringify(this.schema, (key, value)=>{
            if (key === "_tuid") return undefined;
            return value;
        }, 4);
    }
    tuidFromName(fieldName, arrName) {
        if (this.schema === undefined) return;
        let { fields , arrs  } = this.schema;
        let entities = this.uq;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined) return;
            let f = fieldArr.find((v)=>v.name === fn);
            if (f === undefined) return;
            return entities.getTuid(f.tuid);
        }
        let fn = fieldName.toLowerCase();
        if (arrName === undefined) return getTuid(fn, fields);
        if (arrs === undefined) return;
        let an = arrName.toLowerCase();
        let arr = arrs.find((v)=>v.name === an);
        if (arr === undefined) return;
        return getTuid(fn, arr.fields);
    }
    buildParams(params) {
        let result = {};
        let fields = this.fields;
        if (fields !== undefined) this.buildFieldsParams(result, fields, params);
        let arrs = this.arrFields;
        if (arrs !== undefined) {
            for (let arr of arrs){
                let { name , fields: fields1  } = arr;
                let paramsArr = params[name];
                if (paramsArr === undefined) continue;
                let arrResult = [];
                result[name] = arrResult;
                for (let pa of params){
                    let rowResult = {};
                    this.buildFieldsParams(rowResult, fields1, pa);
                    arrResult.push(rowResult);
                }
            }
        }
        return result;
    }
    buildFieldsParams(result, fields, params) {
        for (let field of fields){
            let { name , type  } = field;
            let d = params[name];
            let val;
            switch(type){
                case "datetime":
                    val = this.buildDateTimeParam(d);
                    break;
                case "date":
                    if (d instanceof Date) {
                        val = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                    } else {
                        val = d;
                    }
                    break;
                default:
                    switch(typeof d){
                        default:
                            val = d;
                            break;
                        case "object":
                            if (d instanceof Date) {
                                val = d;
                                break;
                            }
                            let tuid = field._tuid;
                            if (tuid === undefined) val = d.id;
                            else val = tuid.getIdFromObj(d);
                            break;
                    }
                    break;
            }
            result[name] = val;
        }
    }
    buildDateTimeParam(val) {
        let dt;
        switch(typeof val){
            default:
                debugger;
                throw new Error("escape datetime field in pack data error: value=" + val);
            case "undefined":
                return undefined;
            case "object":
                dt = val;
                break;
            case "string":
            case "number":
                dt = new Date(val);
                break;
        }
        return Math.floor(dt.getTime() / 1000);
    }
    buildDateParam(val) {
        let dt;
        switch(typeof val){
            default:
                debugger;
                throw new Error("escape datetime field in pack data error: value=" + val);
            case "undefined":
                return "";
            case "string":
                return val;
            case "object":
                dt = val;
                break;
            case "number":
                dt = new Date(val);
                break;
        }
        let ret = dt.toISOString();
        let p = ret.indexOf("T");
        return p > 0 ? ret.substr(0, p) : ret;
    }
    pack(data) {
        let ret = [];
        let fields = this.fields;
        if (fields !== undefined) this.packRow(ret, fields, data);
        let arrs = this.arrFields;
        if (arrs !== undefined) {
            for (let arr of arrs){
                let { name , fields: fields1  } = arr;
                let arrData = getObjPropIgnoreCase(data, name);
                //if (!arrData) arrData = data[name.toLowerCase()];
                this.packArr(ret, fields1, arrData);
            }
        }
        return ret.join("");
    }
    escape(row, field) {
        let d = row[field.name];
        if (d === null) return "";
        switch(field.type){
            case "datetime":
                return this.buildDateTimeParam(d);
            default:
                switch(typeof d){
                    default:
                        return d;
                    case "object":
                        let tuid = field._tuid;
                        if (tuid === undefined) return d.id;
                        return tuid.getIdFromObj(d);
                    case "string":
                        let len = d.length;
                        let r = "", p = 0;
                        for(let i = 0; i < len; i++){
                            let c = d.charCodeAt(i), ch;
                            switch(c){
                                default:
                                    continue;
                                case codeBackSlash:
                                    ch = "\\\\";
                                    break;
                                case codeBT:
                                    ch = "\\t";
                                    break;
                                case codeBN:
                                    ch = "\\n";
                                    break;
                                case codeBF:
                                    ch = "\\f";
                                    break;
                                case codeBV:
                                    ch = "\\v";
                                    break;
                                case codeBB:
                                    ch = "\\b";
                                    break;
                                case codeBR:
                                    ch = "\\r";
                                    break;
                            }
                            r += d.substring(p, i) + ch;
                            p = i + 1;
                        }
                        return r + d.substring(p);
                    case "undefined":
                        return "";
                }
        }
    }
    packRow(result, fields, data) {
        let len = fields.length;
        if (len === 0) {
            result.push(ln);
            return;
        }
        let ret = "";
        ret += this.escape(data, fields[0]);
        for(let i = 1; i < len; i++){
            let f = fields[i];
            ret += tab + this.escape(data, f);
        }
        result.push(ret + ln);
    }
    packArr(result, fields, data) {
        if (data !== undefined) {
            if (data.length === 0) {
                result.push(ln);
            } else {
                for (let row of data){
                    this.packRow(result, fields, row);
                }
            }
        } else {
            result.push(ln);
        }
        result.push(ln);
    }
    cacheFieldsInValue(values, fields) {
        for (let f of fields){
            let { name , _tuid  } = f;
            if (_tuid === undefined) continue;
            let id = values[name];
            //_tuid.useId(id);
            values[name] = _tuid.boxId(id);
        }
    }
    unpackTuidIdsOfFields(values, fields) {
        if (fields === undefined) {
            return values;
        }
        let ret = [];
        for (let ln of values){
            if (!ln) continue;
            let len = ln.length;
            let p = 0;
            while(p < len){
                let ch = ln.charCodeAt(p);
                if (ch === 10) {
                    ++p;
                    break;
                }
                let row = {};
                p = this.unpackRow(row, fields, ln, p);
                ret.push(row);
            }
        }
        return ret;
    }
    unpackSheet(data) {
        let ret = {}; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        let p = 0;
        if (fields !== undefined) p = this.unpackRow(ret, fields, data, p);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs){
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackReturns(data, returns) {
        if (data === undefined) debugger;
        let ret = {};
        let p = 0;
        let arrs = returns || this.returns;
        if (arrs !== undefined) {
            for (let arr of arrs){
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackRow(ret, fields, data, p, sep = 9) {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for(; p < len; p++){
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === sep) {
                let f = fields[i];
                let { name  } = f;
                if (ch0 !== 8) {
                    if (p > c) {
                        let v = data.substring(c, p);
                        ret[name] = this.to(ret, v, f);
                    }
                } else {
                    ret[name] = null;
                }
                c = p + 1;
                ++i;
                if (i >= fLen) {
                    p = data.indexOf("\n", c);
                    if (p >= 0) ++p;
                    else p = len;
                    return p;
                }
            } else if (ch === 10) {
                let f1 = fields[i];
                let { name: name1  } = f1;
                if (ch0 !== 8) {
                    if (p > c) {
                        let v1 = data.substring(c, p);
                        ret[name1] = this.to(ret, v1, f1);
                    }
                } else {
                    ret[name1] = null;
                }
                ++p;
                ++i;
                return p;
            }
        }
        let f2 = fields[i];
        let { name: name2  } = f2;
        if (ch0 !== 8) {
            let v2 = data.substring(c);
            ret[name2] = this.to(ret, v2, f2);
        }
        return len;
    }
    to(ret, v, f) {
        switch(f.type){
            default:
                return v;
            case "text":
            case "char":
                return this.reverseNT(v);
            //case 'time':
            case "datetime":
            case "timestamp":
                let n = Number(v);
                let date = isNaN(n) === true ? new Date(v) : new Date(n * 1000);
                return date;
            /*
            case 'date':
                let parts = v.split('-');
                return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            */ case "enum":
            case "tinyint":
            case "smallint":
            case "int":
            case "bigint":
            case "dec":
            case "float":
            case "double":
                return Number(v);
            case "id":
                let id = Number(v);
                let { _tuid  } = f;
                if (_tuid === undefined) return id;
                return _tuid.boxId(id);
        }
    }
    reverseNT(text) {
        if (text === undefined) return;
        if (text === null) return;
        let len = text.length;
        let r = "";
        let p = 0;
        for(let i = 0; i < len; i++){
            let c = text.charCodeAt(i);
            if (c === codeBackSlash) {
                if (i === len - 1) break;
                let c1 = text.charCodeAt(i + 1);
                let ch;
                switch(c1){
                    default:
                        continue;
                    case codeBackSlash:
                        ch = "\\";
                        break;
                    case codeN:
                        ch = "\n";
                        break;
                    case codeT:
                        ch = "	";
                        break;
                    case codeB:
                        ch = "\b";
                        break;
                    case codeF:
                        ch = "\f";
                        break;
                    case codeV:
                        ch = "\v";
                        break;
                    case codeR:
                        ch = "\r";
                        break;
                }
                r += text.substring(p, i) + ch;
                p = i + 2;
                ++i;
            }
        }
        r += text.substring(p, len);
        return r;
    }
    unpackArr(ret, arr, data, p) {
        let p0 = p;
        let vals = [], len = data.length;
        let { name , fields  } = arr;
        while(p < len){
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                if (p === p0) {
                    ch = data.charCodeAt(p);
                    if (ch !== 10) {
                        throw new Error("upackArr: arr第一个字符是10，则必须紧跟一个10，表示整个arr的结束");
                    }
                    ++p;
                }
                ++p;
                break;
            }
            let val = {}; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/caller.ts

class EntityCaller extends Caller {
    constructor(entity, params, $$user = undefined, waiting = true){
        super(params, $$user, waiting);
        this.tries = 0;
        this._entity = entity;
    }
    get entity() {
        return this._entity;
    }
    //大多的entityCaller都不需要这个
    //buildParams() {return this.entity.buildParams(this.params);}
    async request() {
        await this.entity.loadSchema();
        let ret = await this.innerRequest();
        return ret;
    }
    async innerCall() {
        return await this.entity.uqApi.xcall(this);
    }
    async innerRequest() {
        let jsonResult = await this.innerCall();
        let { $uq , $modify , res  } = jsonResult;
        this.entity.uq.pullModify($modify);
        if ($uq === undefined) {
            let ret = this.xresult(res);
            return ret;
        }
        return await this.retry($uq);
    }
    xresult(res) {
        return res;
    }
    get headers() {
        let { ver , uq  } = this.entity;
        let { uqVersion  } = uq;
        return {
            uq: `${uqVersion}`,
            en: `${ver}`
        };
    }
    async retry(schema) {
        ++this.tries;
        if (this.tries > 5) throw new Error(`${schema.entity.name} can not get right uq response schema, 5 tries`);
        this.rebuildSchema(schema);
        return await this.innerRequest();
    }
    rebuildSchema(schema) {
        let { uq , entity  } = schema;
        if (uq !== undefined) {
            this.entity.uq.buildEntities(uq);
        }
        if (entity !== undefined) {
            this.entity.setSchema(entity);
        }
    }
}
class ActionCaller extends EntityCaller {
    get entity() {
        return this._entity;
    }
}
class QueryQueryCaller extends EntityCaller {
    get entity() {
        return this._entity;
    }
    get path() {
        return `query/${this.entity.name}`;
    }
    xresult(res) {
        let data = this.entity.unpackReturns(res);
        return data;
    }
    buildParams() {
        return this.entity.buildParams(this.params);
    }
}
class QueryPageCaller extends EntityCaller {
    get params() {
        return this._params;
    }
    get entity() {
        return this._entity;
    }
    //results: {[name:string]:any[]};
    get path() {
        return `query-page/${this.entity.name}`;
    }
    buildParams() {
        let { pageStart , pageSize , params  } = this.params;
        let p;
        if (params === undefined) {
            p = {
                key: ""
            };
        } else {
            p = this.entity.buildParams(params);
        }
        /*
        switch (typeof params) {
            case 'undefined': p = {key: ''}; break;
            default: p = _.clone(params); break;
        }
        */ p["$pageStart"] = pageStart;
        p["$pageSize"] = pageSize;
        return p;
    }
    xresult(res) {
        let ret = this.entity.unpackReturns(res);
        //return this.results.$page;// as any[];
        return ret;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/tuid/idCache.ts
const maxCacheSize = 10000;
class IdCache {
    queue = [];
    waitingIds = [];
    constructor(tuidLocal){
        this.cache = tuidLocal.uq.net.createObservableMap();
        this.tuidInner = tuidLocal;
        this.initLocalArr();
    }
    initLocalArr() {
        this.localArr = this.tuidInner.schemaLocal.arr(this.tuidInner.name + ".ids");
    }
    cacheSet(id, val) {
        this.cache.set(id, val);
    }
    useId(id, defer) {
        if (!id) return;
        if (typeof id !== "number") {
            console.error("id cache " + id + " is not number");
            return;
        }
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.tuidInner.cacheTuids(defer === true ? 70 : 20);
        if (this.waitingIds.findIndex((v)=>v === id) >= 0) {
            this.moveToHead(id);
            return;
        }
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            } else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex((v)=>v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    moveToHead(id) {
        let index = this.queue.findIndex((v)=>v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    getValue(id) {
        return this.cache.get(id);
    }
    remove(id) {
        this.cache.delete(id);
        let index = this.queue.findIndex((v)=>v === id);
        this.queue.splice(index, 1);
        this.localArr.removeItem(id);
    }
    valueFromId(id) {
        let _id;
        switch(typeof id){
            case "object":
                _id = id.id;
                break;
            case "number":
                _id = id;
                break;
            default:
                return;
        }
        return this.getValue(_id);
    }
    resetCache(id) {
        this.remove(id);
        this.useId(id);
    }
    cacheValue(val) {
        if (val === undefined) return false;
        let id = this.getIdFromObj(val);
        if (id === undefined) return false;
        this.cacheSet(id, val);
        return true;
    }
    getIdFromObj(val) {
        return this.tuidInner.getIdFromObj(val);
    }
    async cacheIds() {
        let tuidValues = await this.loadIds();
        this.cacheIdValues(tuidValues);
    }
    cacheIdValues(tuidValues) {
        if (tuidValues === undefined) return;
        let tuids = this.unpackTuidIds(tuidValues);
        for (let tuidValue of tuids){
            if (this.cacheValue(tuidValue) === true) {
                this.cacheTuidFieldValues(tuidValue);
            }
        }
    }
    async modifyIds(ids) {
        let tuidValues = await this.loadTuidIdsOrLocal(ids);
        let localedValues = tuidValues.filter((v)=>{
            let p = v.indexOf("	");
            if (p < 0) p = v.length;
            let id = Number(v.substr(0, p));
            let val = this.localArr.getItem(id);
            return val !== undefined;
        });
        if (localedValues.length === 0) return;
        this.cacheIdValues(localedValues);
    }
    async loadIds() {
        if (this.waitingIds.length === 0) return;
        let loadingIds = [
            ...this.waitingIds
        ];
        this.waitingIds = [];
        return await this.loadTuidIdsOrLocal(loadingIds);
    }
    unpackTuidIds(values) {
        return this.tuidInner.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.tuidInner.cacheTuidFieldValues(tuidValue);
    }
    async assureObj(id) {
        let val = this.cache.get(id);
        if (val !== undefined) return val;
        /*
        switch (typeof val) {
            case 'object': return val;
            // case 'number': this.cache.set(id, undefined); break;
        }
        */ let ret = await this.loadTuidIdsOrLocal([
            id
        ]);
        this.cacheIdValues(ret);
    }
    async loadValuesFromIds(netIds) {
        let netRet = await this.tuidInner.loadValuesFromIds(undefined, netIds);
        return netRet;
    }
    async loadTuidIdsOrLocal(ids) {
        let ret = [];
        let netIds = [];
        for (let id of ids){
            let value = this.localArr.getItem(id);
            //if (value === undefined)
            // 值不存在或者是空字符串，重新获取
            if (!value) netIds.push(id);
            else ret.push(value);
        }
        let len = netIds.length;
        if (len === 0) return ret;
        let netRet = await this.loadValuesFromIds(netIds);
        for(let i = 0; i < len; i++){
            //有些id可能没有内容，不会返回
            //let id = netIds[i]; 
            let row = netRet[i];
            if (!row) continue;
            let p = row.indexOf("	");
            if (p < 0) p = row.length;
            let id1 = Number(row.substr(0, p));
            let pos = netIds.findIndex((v)=>v === id1);
            if (pos >= 0) netIds.splice(pos, 1);
            ret.push(row);
            this.localArr.setItem(id1, row);
        }
        len = netIds.length;
        for(let i1 = 0; i1 < len; i1++){
            this.localArr.setItem(netIds[i1], "");
        }
        return ret;
    }
}
class IdDivCache extends IdCache {
    constructor(tuidLocal, div){
        super(tuidLocal);
        this.div = div;
        this.divName = div.name;
        this.localArr = tuidLocal.schemaLocal.arr(tuidLocal.name + ".ids." + this.divName);
    }
    initLocalArr() {
    // 这个不需要，必须去掉
    // this.localArr = this.tuidInner.cache.arr(this.tuidInner.name + '.ids');
    }
    getIdFromObj(val) {
        return this.div.getIdFromObj(val);
    }
    unpackTuidIds(values) {
        return this.div.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.div.cacheTuidFieldValues(tuidValue);
    }
    async loadValuesFromIds(netIds) {
        let netRet = await this.tuidInner.loadValuesFromIds(this.divName, netIds);
        return netRet;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/tuid/tuid.tsx



class UqTuid extends Entity {
    typeName = "tuid";
    //render: Render<M>;
    setSchema(schema) {
        super.setSchema(schema);
        let { id  } = schema;
        this.idName = id;
    }
    buildTuidBox() {
        return new TuidBox(this);
    }
    getIdFromObj(obj) {
        return obj[this.idName];
    }
    stopCache() {
        this.noCache = true;
    }
    static idValue(id) {
        let t = typeof id;
        switch(t){
            default:
                debugger;
                throw new Error("unknown id type: " + t);
            case "undefined":
                return undefined;
            case "object":
                return id.id;
            case "number":
                return id;
        }
    }
    static equ(id1, ix) {
        if (id1 === undefined || id1 === null) return false;
        if (ix === undefined || ix === null) return false;
        return Tuid.idValue(id1) === Tuid.idValue(ix);
    /*
        if (typeof id1 === 'object') {
			let id1Id = id1.id;
            return typeof ix === 'object'? id1Id === ix.id : id1Id === ix;
        }
        if (typeof ix === 'object') {
			let id2Id = ix.id;
            return typeof id1 === 'object'? id2Id === id1.id : id2Id === id1;
        }
		return id1 === ix;
		*/ }
    cacheIds() {}
    async modifyIds(ids) {}
    isImport = false;
}
class Tuid extends UqTuid {
}
class TuidInner extends Tuid {
    constructor(uq, name, typeId){
        super(uq, name, typeId);
        this.idCache = new IdCache(this);
        this.localArr = this.schemaLocal.arr(this.name + ".whole");
        if (uq.newVersion === true) this.localArr.removeAll();
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { arrs  } = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs){
                let { name  } = arr;
                let tuidDiv = new TuidDiv(this.uq, this, name);
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
                tuidDiv.buildFieldsTuid();
            }
        }
    }
    getObj(id) {
        let obj = this.valueFromId(id);
        if (obj) return obj;
        this.useId(id);
        return {
            id
        };
    }
    useId(id, defer) {
        if (this.noCache === true) return;
        if (!id) return;
        this.idCache.useId(id, defer);
    }
    boxId(id) {
        if (!id) return;
        if (typeof id === "object") return id;
        this.useId(id);
        //let {createBoxId} = this.uq;
        //if (!createBoxId) 
        return {
            id: id
        };
    //return createBoxId(this, id);
    }
    valueFromId(id) {
        return this.idCache.getValue(id);
    }
    resetCache(id) {
        if (typeof id === "object") id = id.id;
        this.idCache.resetCache(id);
    }
    async assureBox(id) {
        if (!id) return;
        if (typeof id === "object") id = id.id;
        await this.idCache.assureObj(id);
        return this.idCache.getValue(id);
    }
    cacheIds() {
        this.idCache.cacheIds();
        if (this.divs === undefined) return;
        for(let i in this.divs)this.divs[i].cacheIds();
    }
    async modifyIds(ids) {
        await this.idCache.modifyIds(ids);
    }
    cacheTuids(defer) {
        this.uq.cacheTuids(defer);
    }
    get hasDiv() {
        return this.divs !== undefined;
    }
    div(name) {
        return this.divs && this.divs[name];
    }
    async loadValuesFromIds(divName, ids) {
        let ret = await new IdsCaller(this, {
            divName: divName,
            ids: ids
        }, undefined, false).request();
        return ret;
    }
    async loadMain(id) {
        if (typeof id === "object") id = id.id;
        await this.idCache.assureObj(id);
        return this.idCache.valueFromId(id);
    }
    async load(id) {
        if (id === undefined || id === 0) return;
        //let cacheValue = this.idCache.valueFromId(id); 
        //if (typeof cacheValue === 'object') return cacheValue;
        if (typeof id === "object") id = id.id;
        let valuesText = undefined; //this.localArr.getItem(id);
        let values;
        if (valuesText) {
            values = JSON.parse(valuesText);
        } else {
            values = await new GetCaller(this, id).request();
            if (values !== undefined) {
            // this.localArr.setItem(id, JSON.stringify(values));
            }
        }
        if (values === undefined) return;
        for (let f of this.schema.fields){
            let { tuid  } = f;
            if (tuid === undefined) continue;
            let t = this.uq.getTuid(tuid);
            if (t === undefined) continue;
            let n = f.name;
            values[n] = t.boxId(values[n]);
        }
        this.idCache.cacheValue(values);
        this.cacheTuidFieldValues(values);
        return values;
    }
    cacheTuidFieldValues(values) {
        let { fields , arrs  } = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs){
                let { name , fields: fields1  } = arr;
                let arrValues = values[name];
                if (arrValues === undefined) continue;
                let tuidDiv = this.div(name);
                for (let row of arrValues){
                    //row._$tuid = tuidDiv;
                    //row.$owner = this.boxId(row.owner);
                    tuidDiv.cacheValue(row);
                    this.cacheFieldsInValue(row, fields1);
                }
            }
        }
    }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields , $create , $update , stampOnMain  } = this.schema;
        if (mainFields === undefined) debugger;
        this.cacheFields = mainFields || this.fields;
        if (stampOnMain === true) {
            if ($create === true) this.cacheFields.push({
                name: "$create",
                type: "timestamp",
                _tuid: undefined
            });
            if ($update === true) this.cacheFields.push({
                name: "$update",
                type: "timestamp",
                _tuid: undefined
            });
        }
        this.uq.buildFieldTuid(this.cacheFields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
    async save(id, props) {
        let ret = await new SaveCaller(this, {
            id: id,
            props: props
        }).request();
        if (id !== undefined) {
            this.idCache.remove(id);
            this.localArr.removeItem(id);
        }
        return ret;
    }
    async saveProp(id, prop, value) {
        await new SavePropCaller(this, {
            id,
            prop,
            value
        }).request();
        this.idCache.remove(id);
        await this.idCache.assureObj(id);
    }
    async all() {
        let ret = await new AllCaller(this, {}).request();
        return ret;
    }
    async search(key, pageStart, pageSize) {
        let ret = await this.searchArr(undefined, key, pageStart, pageSize);
        return ret;
    }
    async searchArr(owner, key, pageStart, pageSize) {
        //let api = this.uqApi;
        //let ret = await api.tuidSearch(this.name, undefined, owner, key, pageStart, pageSize);
        let params = {
            arr: undefined,
            owner: owner,
            key: key,
            pageStart: pageStart,
            pageSize: pageSize
        };
        let ret = await new SearchCaller(this, params).request();
        let { fields  } = this.schema;
        for (let row of ret){
            this.cacheFieldsInValue(row, fields);
        }
        return ret;
    }
    async loadArr(arr, owner, id) {
        if (id === undefined || id === 0) return;
        //let api = this.uqApi;
        //return await api.tuidArrGet(this.name, arr, owner, id);
        return await new LoadArrCaller(this, {
            arr: arr,
            owner: owner,
            id: id
        }).request();
    }
    async saveArr(arr, owner, id, props) {
        //let params = _.clone(props);
        //params["$id"] = id;
        //return await this.uqApi.tuidArrSave(this.name, arr, owner, params);
        return await new SaveArrCaller(this, {
            arr: arr,
            owner: owner,
            id: id,
            props: props
        }).request();
    }
    async posArr(arr, owner, id, order) {
        //return await this.uqApi.tuidArrPos(this.name, arr, owner, id, order);
        return await new ArrPosCaller(this, {
            arr: arr,
            owner: owner,
            id: id,
            order: order
        }).request();
    }
    async no() {
        return await new TuidNoCaller(this, undefined).request();
    }
}
class TuidCaller extends EntityCaller {
    get entity() {
        return this._entity;
    }
}
// 包含main字段的load id
// 当前为了兼容，先调用的包含所有字段的内容
class GetCaller extends TuidCaller {
    method = "GET";
    get path() {
        return `tuid/${this.entity.name}/${this.params}`;
    }
}
class IdsCaller extends TuidCaller {
    get path() {
        let { divName  } = this.params;
        return `tuidids/${this.entity.name}/${divName !== undefined ? divName : "$"}`;
    }
    buildParams() {
        return this.params.ids;
    }
    xresult(res) {
        return res.split("\n");
    }
}
class SaveCaller extends TuidCaller {
    get path() {
        return `tuid/${this.entity.name}`;
    }
    buildParams() {
        let { fields , arrs  } = this.entity.schema;
        let { id , props  } = this.params;
        let params = {
            $id: id
        };
        this.transParams(params, props, fields);
        if (arrs !== undefined) {
            for (let arr of arrs){
                let arrName = arr.name;
                let arrParams = [];
                let arrFields = arr.fields;
                let arrValues = props[arrName];
                if (arrValues !== undefined) {
                    for (let arrValue of arrValues){
                        let row = {};
                        this.transParams(row, arrValue, arrFields);
                        arrParams.push(row);
                    }
                }
                params[arrName] = arrParams;
            }
        }
        return params;
    }
    transParams(values, params, fields) {
        if (params === undefined) return;
        for (let field of fields){
            let { name , tuid , type  } = field;
            let val = params[name];
            if (tuid !== undefined) {
                if (typeof val === "object") {
                    if (val !== null) val = val.id;
                }
            } else {
                switch(type){
                    case "date":
                        val = this.entity.buildDateParam(val);
                        break;
                    case "datetime":
                        val = this.entity.buildDateTimeParam(val);
                        break;
                }
            }
            values[name] = val;
        }
    }
}
class SearchCaller extends TuidCaller {
    get path() {
        return `tuids/${this.entity.name}`;
    }
}
class AllCaller extends TuidCaller {
    method = "GET";
    get path() {
        return `tuid-all/${this.entity.name}`;
    }
}
class LoadArrCaller extends TuidCaller {
    method = "GET";
    get path() {
        let { arr , owner , id  } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/${id}`;
    }
}
class SavePropCaller extends TuidCaller {
    get path() {
        return `tuid-prop/${this.entity.name}/`;
    }
}
class SaveArrCaller extends TuidCaller {
    get path() {
        let { arr , owner  } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id , props  } = this.params;
        let params = Object.assign({}, props);
        params["$id"] = id;
        return params;
    }
}
class ArrPosCaller extends TuidCaller {
    get path() {
        let { arr , owner  } = this.params;
        return `tuid-arr-pos/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id , order  } = this.params;
        return {
            bid: id,
            $order: order
        };
    }
}
class TuidNoCaller extends TuidCaller {
    get path() {
        return `tuid-no/${this.entity.name}/`;
    }
    buildParams() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        return {
            year,
            month,
            date
        };
    }
}
class TuidImport extends Tuid {
    constructor(uq, name, typeId, from){
        super(uq, name, typeId);
        this.from = from;
    }
    setFrom(tuidLocal) {
        this.tuidLocal = tuidLocal;
    }
    isImport = true;
    getObj(id) {
        return this.tuidLocal?.getObj(id);
    }
    /*
	tv(id:number, render?:Render<any>):JSX.Element {
		return this.tuidLocal?.tv(id, render);
	}
    */ useId(id) {
        this.tuidLocal?.useId(id);
    }
    boxId(id) {
        if (!this.tuidLocal) debugger;
        return this.tuidLocal?.boxId(id);
    }
    valueFromId(id) {
        return this.tuidLocal?.valueFromId(id);
    }
    resetCache(id) {
        this.tuidLocal?.resetCache(id);
    }
    async assureBox(id) {
        await this.tuidLocal.assureBox(id);
        return this.tuidLocal.valueFromId(id);
    }
    get hasDiv() {
        return this.tuidLocal?.hasDiv;
    }
    div(name) {
        return this.tuidLocal?.div(name);
    }
    async loadMain(id) {
        let ret = await this.tuidLocal.loadMain(id);
        return ret;
    }
    async load(id) {
        return await this.tuidLocal.load(id);
    }
    async save(id, props) {
        return await this.tuidLocal.save(id, props);
    }
    async saveProp(id, prop, value) {
        await this.tuidLocal.saveProp(id, prop, value);
    }
    async all() {
        return await this.tuidLocal.all();
    }
    async search(key, pageStart, pageSize) {
        return await this.tuidLocal.search(key, pageStart, pageSize);
    }
    async searchArr(owner, key, pageStart, pageSize) {
        return await this.tuidLocal.searchArr(owner, key, pageStart, pageSize);
    }
    async loadArr(arr, owner, id) {
        return await this.tuidLocal.loadArr(arr, owner, id);
    }
    async saveArr(arr, owner, id, props) {
        await this.tuidLocal.saveArr(arr, owner, id, props);
    }
    async posArr(arr, owner, id, order) {
        await this.tuidLocal.posArr(arr, owner, id, order);
    }
    async no() {
        return await this.tuidLocal.no();
    }
}
// field._tuid 用这个接口
// Tuid, TuidDiv 实现这个接口
class TuidBox {
    ownerField = undefined;
    constructor(tuid){
        this.tuid = tuid;
    }
    boxId(id) {
        return this.tuid.boxId(id);
    }
    getIdFromObj(obj) {
        return this.tuid.getIdFromObj(obj);
    }
    useId(id) {
        return this.tuid.useId(id);
    }
    async showInfo() {
        alert("showInfo not implemented");
    }
}
class TuidDiv extends TuidInner {
    typeName = "div";
    constructor(uq, tuid, name){
        super(uq, name, 0);
        this.tuid = tuid;
        this.idName = "id";
        this.idCache = new IdDivCache(tuid, this);
    }
    get owner() {
        return this.tuid;
    }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields  } = this.schema;
        if (mainFields === undefined) debugger;
        this.uq.buildFieldTuid(this.cacheFields = mainFields);
    }
    buildTuidDivBox(ownerField) {
        return new TuidBoxDiv(this.tuid, this, ownerField);
    }
    getIdFromObj(obj) {
        return obj[this.idName];
    }
    cacheValue(value) {
        this.idCache.cacheValue(value);
    }
    useId(id, defer) {
        if (this.noCache === true) return;
        this.idCache.useId(id, defer);
    }
    valueFromId(id) {
        return this.idCache.getValue(id);
    }
    async assureBox(id) {
        await this.idCache.assureObj(id);
        return this.idCache.getValue(id);
    }
    async cacheIds() {
        await this.idCache.cacheIds();
    }
    cacheTuidFieldValues(values) {
        let fields = this.schema.fields;
        this.cacheFieldsInValue(values, fields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
}
class TuidBoxDiv extends TuidBox {
    constructor(tuid, div, ownerField){
        super(tuid);
        this.div = div;
        this.ownerField = ownerField;
    }
    boxId(id) {
        return this.div.boxId(id);
    }
    getIdFromObj(obj) {
        return this.div.getIdFromObj(obj);
    }
    useId(id) {
        return this.div.useId(id);
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/tuid/tuidsCache.ts
class TuidsCache {
    constructor(uq){
        this.uq = uq;
    }
    cacheTuids(defer) {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, defer);
    }
    clearCacheTimer() {
        if (this.cacheTimer === undefined) return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    }
    loadIds = ()=>{
        this.clearCacheTimer();
        let { tuids  } = this.uq;
        for(let i in tuids){
            let tuid = tuids[i];
            tuid.cacheIds();
        }
    };
    pullModify(modifyMax) {
        if (modifyMax === undefined) return;
        let now = Math.floor(Date.now() / 1000);
        if (this.modifyMax === undefined) {
            this.modifyMax = this.uq.localModifyMax.get();
            if (this.modifyMax === undefined) {
                this.modifyMax = {
                    max: modifyMax,
                    seconds: now
                };
                this.uq.localModifyMax.set(this.modifyMax);
            }
        }
        let { max , seconds  } = this.modifyMax;
        let lockGap = 3600;
        if (now - seconds < lockGap) return;
        if (modifyMax <= max) return;
        let tuidCached = [];
        let { tuids  } = this.uq;
        for(let i in tuids){
            //if (tuids[i].cached === true) 
            tuidCached.push(i);
        }
        if (tuidCached.length === 0) return;
        this.modifyMax.seconds = now;
        this.innerPullModify(tuidCached.join("	"));
    }
    async innerPullModify(tuidLists) {
        let { uqApi , tuids  } = this.uq;
        let { max  } = this.modifyMax;
        let ret = await uqApi.queueModify(max, 30, tuidLists);
        let group = {};
        let modifyMax = 0;
        for (let modify of ret.queue){
            let { id , entity , key  } = modify;
            if (!key) continue;
            let tuid = tuids[entity];
            if (tuid === undefined) continue;
            let item = group[entity];
            if (item === undefined) {
                item = group[entity] = {
                    tuid: tuid,
                    ids: []
                };
            }
            item.ids.push(key);
            if (id > modifyMax) modifyMax = id;
        }
        for(let i in group){
            let { tuid: tuid1 , ids  } = group[i];
            await tuid1.modifyIds(ids);
        }
        let now = Math.floor(Date.now() / 1000);
        this.modifyMax = {
            max: modifyMax,
            seconds: now
        };
        this.uq.localModifyMax.set(this.modifyMax);
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/tuid/index.ts


 //export { tv, ReactBoxId } from './reactBoxId';

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/action.ts


class UqAction extends Entity {
    get typeName() {
        return "action";
    }
    async submit(data, $$user = undefined, waiting = true) {
        let caller = new ActionSubmitCaller(this, data, $$user, waiting);
        let ret = await caller.request();
        return ret;
    }
    async submitReturns(data, $$user = undefined) {
        return await new SubmitReturnsCaller(this, data, $$user).request();
    }
    async submitConvert(data, $$user = undefined) {
        return await new SubmitConvertCaller(this, data, $$user).request();
    }
}
class Action extends UqAction {
}
class ActionSubmitCaller extends ActionCaller {
    get path() {
        return "action/" + this.entity.name;
    }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.entity.pack(this.params)
        };
    }
}
class SubmitReturnsCaller extends ActionSubmitCaller {
    get path() {
        return "action/" + this.entity.name + "/returns";
    }
    xresult(res) {
        let { returns  } = this.entity;
        let len = returns.length;
        let ret = {};
        for(let i = 0; i < len; i++){
            let retSchema = returns[i];
            ret[retSchema.name] = res[i];
        }
        return ret;
    }
}
class SubmitConvertCaller extends ActionSubmitCaller {
    get path() {
        return "action-convert/" + this.entity.name;
    }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.params
        };
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/sheet.ts


class UqSheet extends Entity {
    get typeName() {
        return "sheet";
    }
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/ setSchema(schema) {
        super.setSchema(schema);
        this.states = schema.states;
        this.verify = schema.verify;
    }
    build(obj) {
        this.states = [];
        for (let op of obj.ops){
            this.states.push({
                name: op,
                actions: undefined
            });
        }
    /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/ }
    createSheetState(name, obj) {
        let ret = {
            name: name,
            actions: []
        };
        let actions = ret.actions;
        for(let p in obj){
            let action = {
                name: p
            };
            actions.push(action);
        }
        return ret;
    }
    async save(discription, data) {
        let { id  } = this.uq;
        let params = {
            app: id,
            discription: discription,
            data: data
        };
        return await new sheet_SaveCaller(this, params).request();
    }
    async saveDebugDirect(discription, data) {
        let { id  } = this.uq;
        let params = {
            app: id,
            discription: discription,
            data: data
        };
        return await new SaveDirectCaller(this, params).request();
    }
    async action(id, flow, state, action) {
        return await new sheet_ActionCaller(this, {
            id: id,
            flow: flow,
            state: state,
            action: action
        }).request();
    }
    async actionDebugDirect(id, flow, state, action) {
        return await new ActionDirectCaller(this, {
            id: id,
            flow: flow,
            state: state,
            action: action
        }).request();
    }
    unpack(data) {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows
        };
    }
    async getSheet(id) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.getSheet(this.name, id);
        */ let ret = await new GetSheetCaller(this, id).request();
        if (ret[0].length === 0) return await this.getArchive(id);
        return this.unpack(ret);
    }
    async getArchive(id) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.sheetArchive(this.name, id)
        return this.unpack(ret);
        */ let ret = await new SheetArchiveCaller(this, id).request();
        return this.unpack(ret);
    }
    async getArchives(pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize});
        return ret;
        */ let params = {
            pageStart: pageStart,
            pageSize: pageSize
        };
        return await new SheetArchivesCaller(this, params).request();
    }
    async getStateSheets(state, pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
        return ret;
        */ let params = {
            state: state,
            pageStart: pageStart,
            pageSize: pageSize
        };
        return await new StateSheetsCaller(this, params).request();
    }
    //createPageStateItems<T>(): PageStateItems<T> {return new PageStateItems<T>(this);}
    async stateSheetCount() {
        /*
        await this.loadSchema();
        let ret:StateCount[] = await this.uqApi.stateSheetCount(this.name);
        return this.states.map(s => {
            let n = s.name, count = 0;
            let r = ret.find(v => v.state === n);
            if (r !== undefined) count = r.count;
            return {state: n, count: count} 
        });
        */ return await new StateSheetCountCaller(this, undefined).request();
    }
    async userSheets(state, user, pageStart, pageSize) {
        let params = {
            state: state,
            user: user,
            pageStart: pageStart,
            pageSize: pageSize
        };
        return await new UserSheetsCaller(this, params).request();
    }
    async mySheets(state, pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.mySheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
        return ret;
        */ let params = {
            state: state,
            pageStart: pageStart,
            pageSize: pageSize
        };
        return await new MySheetsCaller(this, params).request();
    }
}
class Sheet extends UqSheet {
}
class SheetCaller extends EntityCaller {
    get entity() {
        return this._entity;
    }
    get path() {
        return `sheet/${this.entity.name}/${this.suffix}`;
    }
}
class sheet_SaveCaller extends SheetCaller {
    get path() {
        return `sheet/${this.entity.name}`;
    }
    buildParams() {
        let { app , discription , data  } = this.params;
        return {
            app: app,
            discription: discription,
            data: this.entity.pack(data)
        };
    }
    xresult(res) {
        let { verify  } = this.entity;
        if (verify === undefined) return res;
        let resVerify = res.verify;
        if (resVerify === undefined || resVerify.length === 0) {
            res.verify = undefined;
            return res;
        }
        let { returns  } = verify;
        res.verify = this.entity.unpackReturns(resVerify, returns);
        return res;
    }
}
class SaveDirectCaller extends sheet_SaveCaller {
    get path() {
        return `sheet/${this.entity.name}/direct`;
    }
}
class sheet_ActionCaller extends SheetCaller {
    method = "PUT";
    get path() {
        return `sheet/${this.entity.name}`;
    }
}
class ActionDirectCaller extends sheet_ActionCaller {
    get path() {
        return `sheet/${this.entity.name}/direct`;
    }
}
class GetSheetCaller extends SheetCaller {
    //protected readonly params: number;  // id
    method = "GET";
    //private id:number;
    //protected readonly suffix = 'archive';
    buildParams() {}
    get path() {
        return `sheet/${this.entity.name}/get/${this.params}`;
    }
}
class SheetArchiveCaller extends SheetCaller {
    //protected readonly params: number;  // id
    method = "GET";
    //protected readonly suffix = 'archive';
    buildParams() {}
    get path() {
        return `sheet/${this.entity.name}/archive/${this.params}`;
    }
}
class SheetArchivesCaller extends SheetCaller {
    suffix = "archives";
}
class StateSheetsCaller extends SheetCaller {
    suffix = "states";
}
class StateSheetCountCaller extends SheetCaller {
    method = "GET";
    suffix = "statecount";
    xresult(res) {
        let { states  } = this.entity;
        return states.map((s)=>{
            let n = s.name, count = 0;
            let r = res.find((v)=>v.state === n);
            if (r !== undefined) count = r.count;
            return {
                state: n,
                count: count
            };
        });
    }
}
class UserSheetsCaller extends SheetCaller {
    suffix = "user-sheets";
    xresult(res) {
        return res;
    }
}
class MySheetsCaller extends SheetCaller {
    suffix = "my-sheets";
    xresult(res) {
        return res;
    }
} /*
export class PageStateItems<T> extends PageItems<T> {
    private sheet: Sheet;
    constructor(sheet: Sheet) {
        super(true);
        this.sheet = sheet;
        this.pageSize = 10;
	}
	protected async loadResults(param:any, pageStart:any, pageSize:number):Promise<{[name:string]:any[]}> {
		let ret = await this.sheet.getStateSheets(param, pageStart, pageSize);
		return {$page: ret};
	}
	protected getPageId(item:T) {
		return item === undefined? 0 : (item as any).id;
	}
}
*/ 

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/query.ts


class UqQuery extends Entity {
    get typeName() {
        return "query";
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { returns  } = schema;
        this.returns = returns;
        this.isPaged = returns && returns.find((v)=>v.name === "$page") !== undefined;
    }
    /*
    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        //this.list = undefined;
    }
    */ //get hasMore() {return this.more;}
    /*
    async loadPage():Promise<void> {
        if (this.pageSize === undefined) {
            throw new Error('call resetPage(size:number, params:any) first');
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
		let ret = await this.page(this.params, pageStart, this.pageSize+1);
		let page = (ret as any).$page;
        this.list = observable.array([], {deep: false});
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = this.returns.find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length-1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
    }
    */ pageCaller(params, $$user = undefined, showWaiting = true) {
        return new QueryPageCaller(this, params, $$user, showWaiting);
    }
    async page(params, pageStart, pageSize, $$user = undefined, showWaiting = true) {
        let p = {
            pageStart,
            pageSize,
            params
        };
        let res = await this.pageCaller(p, $$user, showWaiting).request();
        return res;
    }
    queryCaller(params, $$user = undefined, showWaiting = true) {
        return new QueryQueryCaller(this, params, $$user, showWaiting);
    }
    async query(params, $$user = undefined, showWaiting = true) {
        let res = await this.queryCaller(params, $$user, showWaiting).request();
        return res;
    }
    async table(params, $$user = undefined, showWaiting = true) {
        let ret = await this.query(params, $$user, showWaiting);
        for(let i in ret){
            return ret[i];
        }
    }
    async obj(params, $$user = undefined, showWaiting = true) {
        let ret = await this.table(params, $$user, showWaiting);
        if (ret.length > 0) return ret[0];
    }
    async scalar(params, $$user = undefined, showWaiting = true) {
        let ret = await this.obj(params, $$user, showWaiting);
        for(let i in ret)return ret[i];
    }
}
class Query extends UqQuery {
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/book.ts


class UqBook extends UqQuery {
    get typeName() {
        return "book";
    }
    queryApiName = "book";
    queryCaller(params) {
        return new BookQueryCaller(this, params);
    }
}
class Book extends UqBook {
}
class BookQueryCaller extends QueryQueryCaller {
    get path() {
        return `book/${this.entity.name}`;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/history.ts

class UqHistory extends UqQuery {
    get typeName() {
        return "history";
    }
    queryApiName = "history";
}
class History extends UqHistory {
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/map.ts



class UqMap extends Entity {
    get typeName() {
        return "map";
    }
    actions = {};
    queries = {};
    setSchema(schema) {
        super.setSchema(schema);
        this.schemaFrom = this.schema.from;
        let { actions , queries , keys  } = schema;
        this.uq.buildFieldTuid(this.keys = keys);
        for(let i in actions){
            let actionSchema = actions[i];
            let { name  } = actionSchema;
            let action = this.uq.newAction(name, undefined);
            action.setSchema(actionSchema);
            action.buildFieldsTuid();
            this.actions[i] = action;
        }
        for(let i1 in queries){
            let querySchema = queries[i1];
            let { name: name1  } = querySchema;
            let query = this.uq.newQuery(name1, undefined);
            query.setSchema(querySchema);
            query.buildFieldsTuid();
            this.queries[i1] = query;
        }
    }
    async add(param) {
        let ret = await new AddCaller(this, param).request();
        return ret;
    }
    async del(param) {
        let ret = await new DelCaller(this, param).request();
        return ret;
    }
    async all() {
        let ret = await new map_AllCaller(this, undefined).request();
        return ret;
    }
    async page(param, pageStart, pageSize) {
        let ret = await new PageCaller(this, {
            pageStart: pageStart,
            pageSize: pageSize,
            param: param
        }).request();
        return ret;
    }
    async query(param) {
        let qc = new QueryCaller(this, param);
        let ret = await qc.request();
        return ret;
    }
    async table(params) {
        let ret = await this.query(params);
        for(let i in ret){
            return ret[i];
        }
    }
    async obj(params) {
        let ret = await this.table(params);
        if (ret.length > 0) return ret[0];
    }
    async scalar(params) {
        let ret = await this.obj(params);
        for(let i in ret)return ret[i];
    }
}
class map_Map extends UqMap {
}
class MapCaller extends EntityCaller {
    get entity() {
        return this._entity;
    }
    get path() {
        return undefined;
    }
    async innerCall() {
        let caller = this.getCaller(this.params);
        let res = await this.entity.uqApi.xcall(caller);
        let ret = caller.xresult(res.res);
        return {
            res: ret
        };
    }
    buildParams() {
        let p = super.buildParams();
        return p;
    }
}
class AddCaller extends MapCaller {
    getCaller(param) {
        return new MapAddCaller(this.entity, this.entity.actions.add, param);
    }
}
class DelCaller extends MapCaller {
    getCaller(param) {
        return new MapDelCaller(this.entity, this.entity.actions.add, param);
    }
}
class map_AllCaller extends MapCaller {
    getCaller(param) {
        return new MapAllCaller(this.entity, this.entity.queries.all, param);
    }
}
class PageCaller extends MapCaller {
    getCaller(param) {
        return new MapPageCaller(this.entity, this.entity.queries.page, param);
    }
}
class QueryCaller extends MapCaller {
    getCaller(param) {
        return new MapQueryCaller(this.entity, this.entity.queries.query, param);
    }
}
class MapAddCaller extends ActionSubmitCaller {
    constructor(map, action, params){
        super(action, params);
        this.map = map;
    }
    get path() {
        return `map/${this.map.name}/add`;
    }
    get headers() {
        return undefined;
    }
}
class MapDelCaller extends ActionSubmitCaller {
    constructor(map, action, params){
        super(action, params);
        this.map = map;
    }
    get path() {
        return `map/${this.map.name}/del`;
    }
    get headers() {
        return undefined;
    }
}
class MapAllCaller extends QueryPageCaller {
    constructor(map, query, params){
        super(query, params);
        this.map = map;
    }
    get path() {
        return `map/${this.map.name}/all`;
    }
    get headers() {
        return undefined;
    }
}
class MapPageCaller extends QueryPageCaller {
    constructor(map, query, params){
        super(query, params);
        this.map = map;
    }
    get path() {
        return `map/${this.map.name}/page`;
    }
    get headers() {
        return undefined;
    }
}
class MapQueryCaller extends QueryQueryCaller {
    constructor(map, query, params){
        super(query, params);
        this.map = map;
    }
    get path() {
        return `map/${this.map.name}/query`;
    }
    get headers() {
        return undefined;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/pending.ts

class UqPending extends UqQuery {
    get typeName() {
        return "pending";
    }
    queryApiName = "pending";
}
class Pending extends UqPending {
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/enum.ts

class UqEnum extends Entity {
    get typeName() {
        return "enum";
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/ID.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqID extends Entity {
    get typeName() {
        return "id";
    }
    async NO() {
        let ret = await this.uqApi.post("id-no", {
            ID: this.name
        });
        return ret;
    }
    setKeys() {
        this.keys = this.schema.keys;
    }
    get isGlobal() {
        return this.schema.global;
    }
    getIdFromObj(value) {
        return value["id"];
    }
    valueFromString(str) {
        if (!str) return undefined;
        let ret = {};
        this.unpackRow(ret, this.fields, str, 0, 12);
        return ret;
    }
    cacheTuids(defer) {}
    async valueFromId(id) {
        let ret = await this.uq.QueryID({
            ID: this,
            id: [
                id
            ]
        });
        return ret[0];
    }
    async loadValuesFromIds(divName, ids) {
        let ret = await this.uq.QueryID({
            IDX: [
                this
            ],
            id: ids
        });
        return ret;
    }
    cacheTuidFieldValues(value) {}
    unpackTuidIds(values) {
        return;
    }
}
class ID extends UqID {
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqIDX extends Entity {
    get typeName() {
        return "idx";
    }
}
class IDX extends UqIDX {
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqIX extends Entity {
    get typeName() {
        return "ix";
    }
}
class IX extends UqIX {
} /* eslint-enable no-unused-vars */ 

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/uqSys.ts
class UqSys {
    entities = {};
    constructor(entities){
        this.entities = entities;
    }
    async Poked() {
        let query = this.entities["$poked"];
        let ret = await query.query({});
        let arr = ret.ret;
        if (arr.length === 0) return false;
        let row = arr[0];
        return row["poke"] === 1;
    }
    async RoleMe() {
        let unitRoles = {};
        let query = this.entities["$role_my"];
        let { admins , roles  } = await query.query({});
        function getUnitRole(unit, entity) {
            let unitRole = unitRoles[unit];
            if (unitRole === undefined) {
                unitRoles[unit] = unitRole = {
                    unit,
                    entity,
                    isOwner: false,
                    isAdmin: false,
                    roles: []
                };
            }
            return unitRole;
        }
        for (let row of admins){
            let { unit , admin , entity  } = row;
            let unitRole = getUnitRole(unit, entity);
            unitRole.isOwner = (admin & 1) === 1;
            unitRole.isAdmin = (admin & 2) === 2;
        }
        for (let row1 of roles){
            let { unit: unit1 , role , entity: entity1  } = row1;
            let unitRole1 = getUnitRole(unit1, entity1);
            unitRole1.roles.push(role);
        }
        let sys;
        let units = [];
        for(let i in unitRoles){
            let v = unitRoles[i];
            if (Number(i) === 0) {
                sys = v;
            } else {
                units.push(v);
            }
        }
        return {
            sys,
            units
        };
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/uqMan.ts
/* eslint-disable */ 












function fieldDefaultValue(type) {
    switch(type){
        case "tinyint":
        case "smallint":
        case "int":
        case "bigint":
        case "dec":
        case "float":
        case "double":
        case "enum":
            return 0;
        case "char":
        case "text":
            return "";
        case "datetime":
        case "date":
            return "2000-1-1";
        case "time":
            return "0:00";
    }
}
function IDPath(path) {
    return path;
}
var EnumResultType;
(function(EnumResultType) {
    EnumResultType[EnumResultType["data"] = 0] = "data";
    EnumResultType[EnumResultType["sql"] = 1] = "sql";
})(EnumResultType || (EnumResultType = {}));
class UqMan {
    entities = {};
    entityTypes = {};
    enums = {};
    actions = {};
    queries = {};
    ids = {};
    idxs = {};
    ixs = {};
    sheets = {};
    books = {};
    maps = {};
    histories = {};
    pendings = {};
    tuids = {};
    constructor(net, uqData, uqSchema){
        this.net = net;
        let { id , uqOwner , uqName , newVersion  } = uqData;
        this.newVersion = newVersion;
        this.uqOwner = uqOwner;
        this.uqName = uqName;
        this.uqSchema = uqSchema;
        this.id = id;
        this.name = uqOwner + "/" + uqName;
        this.uqVersion = 0;
        this.localMap = net.localDb.createLocalMap(this.name);
        this.localModifyMax = this.localMap.child("$modifyMax");
        this.localEntities = this.localMap.child("$access");
        this.tuidsCache = new TuidsCache(this);
        let baseUrl = "tv/";
        this.uqApi = new UqApi(this.net, baseUrl, this.uqOwner, this.uqName);
        this.sys = new UqSys(this.entities);
    }
    getID(name) {
        return this.ids[name.toLowerCase()];
    }
    getIDX(name) {
        return this.idxs[name.toLowerCase()];
    }
    getIX(name) {
        return this.ixs[name.toLowerCase()];
    }
    async getRoles() {
        if (this.roles !== undefined) return this.roles;
        this.roles = await this.uqApi.getRoles();
        return this.roles;
    }
    tuid(name) {
        return this.tuids[name.toLowerCase()];
    }
    tuidDiv(name, div) {
        let tuid = this.tuids[name.toLowerCase()];
        return tuid && tuid.div(div.toLowerCase());
    }
    action(name) {
        return this.actions[name.toLowerCase()];
    }
    sheet(name) {
        return this.sheets[name.toLowerCase()];
    }
    query(name) {
        return this.queries[name.toLowerCase()];
    }
    book(name) {
        return this.books[name.toLowerCase()];
    }
    map(name) {
        return this.maps[name.toLowerCase()];
    }
    history(name) {
        return this.histories[name.toLowerCase()];
    }
    pending(name) {
        return this.pendings[name.toLowerCase()];
    }
    sheetFromTypeId(typeId) {
        for(let i in this.sheets){
            let sheet = this.sheets[i];
            if (sheet.typeId === typeId) return sheet;
        }
    }
    tuidArr = [];
    actionArr = [];
    queryArr = [];
    idArr = [];
    idxArr = [];
    ixArr = [];
    enumArr = [];
    sheetArr = [];
    bookArr = [];
    mapArr = [];
    historyArr = [];
    pendingArr = [];
    async loadEntities() {
        try {
            let entities = this.localEntities.get();
            if (!entities) {
                entities = await this.uqApi.loadEntities();
            }
            if (!entities) return;
            this.buildEntities(entities);
            return undefined;
        } catch (err) {
            return err;
        }
    }
    buildEntities(entities) {
        if (entities === undefined) {
            debugger;
        }
        this.localEntities.set(entities);
        let { access , tuids , role , version , ids  } = entities;
        this.uqVersion = version;
        this.allRoles = role?.names;
        this.buildTuids(tuids);
        this.buildIds(ids);
        this.buildAccess(access);
    }
    buildTuids(tuids) {
        for(let i in tuids){
            let schema = tuids[i];
            let { typeId , from  } = schema;
            let tuid = this.newTuid(i, typeId, from);
            tuid.sys = true;
        }
        for(let i1 in tuids){
            let schema1 = tuids[i1];
            let tuid1 = this.getTuid(i1);
            tuid1.setSchema(schema1);
        }
        for(let i2 in this.tuids){
            let tuid2 = this.tuids[i2];
            tuid2.buildFieldsTuid();
        }
    }
    buildIds(ids) {
        for(let i in ids){
            let schema = ids[i];
            let { typeId  } = schema;
            let ID = this.newID(i, typeId);
            ID.setSchema(schema);
        }
    }
    async loadEntitySchema(entityName) {
        return await this.uqApi.schema(entityName);
    }
    async loadAllSchemas() {
        let ret = await this.uqApi.allSchemas();
        let entities = [
            this.actionArr,
            this.enumArr,
            this.sheetArr,
            this.queryArr,
            this.bookArr,
            this.mapArr,
            this.historyArr,
            this.pendingArr,
            this.idArr,
            this.idxArr,
            this.ixArr, 
        ];
        entities.forEach((arr)=>{
            arr.forEach((v)=>{
                let entity = ret[v.name.toLowerCase()];
                if (!entity) return;
                let schema = entity.call;
                if (!schema) return;
                v.buildSchema(schema);
            });
        });
    }
    getTuid(name) {
        return this.tuids[name];
    }
    buildAccess(access) {
        for(let a in access){
            let v = access[a];
            switch(typeof v){
                case "string":
                    this.fromType(a, v);
                    break;
                case "object":
                    this.fromObj(a, v);
                    break;
            }
        }
    }
    cacheTuids(defer) {
        this.tuidsCache.cacheTuids(defer);
    }
    setEntity(name, entity) {
        this.entities[name] = entity;
        this.entities[name.toLowerCase()] = entity;
        this.entityTypes[entity.typeId] = entity;
    }
    newEnum(name, id) {
        let enm = this.enums[name];
        if (enm !== undefined) return enm;
        enm = this.enums[name] = new UqEnum(this, name, id);
        this.setEntity(name, enm);
        this.enumArr.push(enm);
        return enm;
    }
    newAction(name, id) {
        let action = this.actions[name];
        if (action !== undefined) return action;
        action = this.actions[name] = new Action(this, name, id);
        this.setEntity(name, action);
        this.actionArr.push(action);
        return action;
    }
    newTuid(name, id, from) {
        let tuid = this.tuids[name];
        if (tuid !== undefined) return tuid;
        if (from !== undefined) tuid = new TuidImport(this, name, id, from);
        else tuid = new TuidInner(this, name, id);
        this.tuids[name] = tuid;
        this.setEntity(name, tuid);
        this.tuidArr.push(tuid);
        return tuid;
    }
    newQuery(name, id) {
        let query = this.queries[name];
        if (query !== undefined) return query;
        query = this.queries[name] = new Query(this, name, id);
        this.setEntity(name, query);
        this.queryArr.push(query);
        return query;
    }
    newBook(name, id) {
        let book = this.books[name];
        if (book !== undefined) return book;
        book = this.books[name] = new Book(this, name, id);
        this.setEntity(name, book);
        this.bookArr.push(book);
        return book;
    }
    newMap(name, id) {
        let map = this.maps[name];
        if (map !== undefined) return map;
        map = this.maps[name] = new map_Map(this, name, id);
        this.setEntity(name, map);
        this.mapArr.push(map);
        return map;
    }
    newHistory(name, id) {
        let history = this.histories[name];
        if (history !== undefined) return;
        history = this.histories[name] = new History(this, name, id);
        this.setEntity(name, history);
        this.historyArr.push(history);
        return history;
    }
    newPending(name, id) {
        let pending = this.pendings[name];
        if (pending !== undefined) return;
        pending = this.pendings[name] = new Pending(this, name, id);
        this.setEntity(name, pending);
        this.pendingArr.push(pending);
        return pending;
    }
    newSheet(name, id) {
        let sheet = this.sheets[name];
        if (sheet !== undefined) return sheet;
        sheet = this.sheets[name] = new Sheet(this, name, id);
        this.setEntity(name, sheet);
        this.sheetArr.push(sheet);
        return sheet;
    }
    newID(name, id) {
        let lName = name.toLowerCase();
        let idEntity = this.ids[lName];
        if (idEntity !== undefined) return idEntity;
        idEntity = this.ids[lName] = new ID(this, name, id);
        this.setEntity(name, idEntity);
        this.idArr.push(idEntity);
        return idEntity;
    }
    newIDX(name, id) {
        let lName = name.toLowerCase();
        let idx = this.idxs[lName];
        if (idx !== undefined) return idx;
        idx = this.idxs[lName] = new IDX(this, name, id);
        this.setEntity(name, idx);
        this.idxArr.push(idx);
        return idx;
    }
    newIX(name, id) {
        let lName = name.toLowerCase();
        let ix = this.ixs[lName];
        if (ix !== undefined) return ix;
        ix = this.ixs[lName] = new IX(this, name, id);
        this.setEntity(name, ix);
        this.ixArr.push(ix);
        return ix;
    }
    fromType(name, type) {
        let parts = type.split("|");
        type = parts[0];
        let id = Number(parts[1]);
        switch(type){
            default:
                break;
            //case 'uq': this.id = id; break;
            case "tuid":
                break;
            case "id":
                this.newID(name, id);
                break;
            case "idx":
                this.newIDX(name, id);
                break;
            case "ix":
                this.newIX(name, id);
                break;
            case "action":
                this.newAction(name, id);
                break;
            case "query":
                this.newQuery(name, id);
                break;
            case "book":
                this.newBook(name, id);
                break;
            case "map":
                this.newMap(name, id);
                break;
            case "history":
                this.newHistory(name, id);
                break;
            case "sheet":
                this.newSheet(name, id);
                break;
            case "pending":
                this.newPending(name, id);
                break;
            case "enum":
                this.newEnum(name, id);
                break;
        }
    }
    fromObj(name, obj) {
        switch(obj["$"]){
            case "sheet":
                this.buildSheet(name, obj);
                break;
        }
    }
    buildSheet(name, obj) {
        let sheet = this.sheets[name];
        if (sheet === undefined) sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
    }
    buildFieldTuid(fields, mainFields) {
        if (fields === undefined) return;
        for (let f of fields){
            let { tuid  } = f;
            if (tuid === undefined) continue;
            let t = this.getTuid(tuid);
            if (t === undefined) continue;
            f._tuid = t.buildTuidBox();
        }
        for (let f1 of fields){
            let { owner  } = f1;
            if (owner === undefined) continue;
            let ownerField = fields.find((v)=>v.name === owner);
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find((v)=>v.name === owner);
                }
                if (ownerField === undefined) {
                    debugger;
                    throw new Error(`owner field ${owner} is undefined`);
                }
            }
            let { arr , tuid: tuid1  } = f1;
            let t1 = this.getTuid(ownerField._tuid.tuid.name);
            if (t1 === undefined) continue;
            let div = t1.div(arr || tuid1);
            f1._tuid = div && div.buildTuidDivBox(ownerField);
        /*
            if (f._tuid === undefined) {
                debugger;
                throw new Error(`owner field ${owner} is not tuid`);
            }
            */ }
    }
    buildArrFieldsTuid(arrFields, mainFields) {
        if (arrFields === undefined) return;
        for (let af of arrFields){
            let { fields  } = af;
            if (fields === undefined) continue;
            this.buildFieldTuid(fields, mainFields);
        }
    }
    pullModify(modifyMax) {
        this.tuidsCache.pullModify(modifyMax);
    }
    getUqKey() {
        let uqKey = this.uqName.split(/[-._]/).join("").toLowerCase();
        return uqKey;
    }
    getUqKeyWithConfig() {
        if (!this.config) return;
        let uqKey = this.uqName.split(/[-._]/).join("").toLowerCase();
        let { dev , alias  } = this.config;
        uqKey = capitalCase(dev.alias || dev.name) + capitalCase(alias ?? uqKey);
        return uqKey;
    }
    hasEntity(name) {
        return this.entities[name] !== undefined || this.entities[name.toLowerCase()] !== undefined;
    }
    createProxy() {
        let ret = new Proxy(this.entities, {
            get: (target, key, receiver)=>{
                let lk = key.toLowerCase();
                if (lk[0] === "$") {
                    switch(lk){
                        default:
                            throw new Error(`unknown ${lk} property in uq`);
                        case "$":
                            return this.$proxy;
                        case "$name":
                            return this.name;
                    }
                }
                let ret = target[lk];
                if (ret !== undefined) return ret;
                let func = this[key];
                if (func !== undefined) return func;
                this.errUndefinedEntity(String(key));
            }
        });
        this.proxy = ret;
        this.$proxy = new Proxy(this.entities, {
            get: (target, key, receiver)=>{
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined) return ret;
                let func = this["$" + key];
                if (func !== undefined) return func;
                this.errUndefinedEntity(String(key));
            }
        });
        //this.idCache = new IDCache(this);
        return ret;
    }
    errUndefinedEntity(entity) {
        let err = new Error(`entity ${this.name}.${entity} not defined`);
        err.name = UqError.undefined_entity;
        throw err;
    }
    async apiPost(api, resultType, apiParam) {
        if (resultType === EnumResultType.sql) api = "sql-" + api;
        let ret = await this.uqApi.post(IDPath(api), apiParam);
        return ret;
    }
    async apiActs(param, resultType) {
        // 这边的obj属性序列，也许会不一样
        let arr = [];
        let apiParam = {};
        for(let i in param){
            arr.push(i);
            apiParam[i] = param[i].map((v)=>this.buildValue(v));
        }
        apiParam["$"] = arr;
        let ret = await this.apiPost("acts", resultType, apiParam);
        return ret;
    }
    buildValue(v) {
        if (!v) return v;
        let obj = {};
        for(let j in v){
            let val = v[j];
            if (j === "ID") {
                switch(typeof val){
                    case "object":
                        val = val.name;
                        break;
                }
            } else if (j === "time") {
                if (val) {
                    if (Object.prototype.toString.call(val) === "[object Date]") {
                        val = val.getTime();
                    }
                }
            } else if (typeof val === "object") {
                let id = val["id"];
                if (id === undefined) {
                    val = this.buildValue(val);
                } else {
                    val = id;
                }
            }
            obj[j] = val;
        }
        return obj;
    }
    Acts = async (param)=>{
        //let apiParam = this.ActsApiParam(param);
        let ret = await this.apiActs(param, EnumResultType.data); // await this.apiPost('acts', apiParam);
        let retArr = ret[0].ret.split("\n");
        let arr = [];
        for(let i in param)arr.push(i);
        let retActs = {};
        for(let i1 = 0; i1 < arr.length; i1++){
            retActs[arr[i1]] = ids(retArr[i1].split("	"));
        }
        return retActs;
    };
    AdminGetList = async ()=>{
        return await this.uqApi.getAdmins();
    };
    AdminSetMe = async ()=>{
        return await this.uqApi.setMeAdmin();
    };
    AdminSet = async (user, role, assigned)=>{
        return await this.uqApi.setAdmin(user, role, assigned);
    };
    AdminIsMe = async ()=>{
        return await this.uqApi.isAdmin();
    };
    IDValue = (type, value)=>{
        if (!type) return;
        let ID = this.ids[type.toLowerCase()];
        if (ID === undefined) return;
        /*
        if (ID.fields === undefined) {
            await ID.loadSchema();
        }
        */ return ID.valueFromString(value);
    };
    $Acts = async (param)=>{
        return await this.apiActs(param, EnumResultType.sql);
    };
    async apiActIX(param, resultType) {
        let { IX , ID , values , IXs  } = param;
        let apiParam = {
            IX: entityName(IX),
            ID: entityName(ID),
            IXs: IXs?.map((v)=>({
                    IX: entityName(v.IX),
                    ix: v.ix
                })),
            values: values?.map((v)=>this.buildValue(v))
        };
        let ret = await this.apiPost("act-ix", resultType, apiParam);
        return ret;
    }
    ActIX = async (param)=>{
        let ret = await this.apiActIX(param, EnumResultType.data);
        return ret[0].ret.split("	").map((v)=>Number(v));
    };
    $ActIX = async (param)=>{
        let ret = await this.apiActIX(param, EnumResultType.sql);
        return ret;
    };
    async apiActIxSort(param, resultType) {
        let { IX , ix , id , after  } = param;
        let apiParam = {
            IX: entityName(IX),
            ix,
            id,
            after
        };
        return await this.apiPost("act-ix-sort", resultType, apiParam);
    }
    ActIXSort = async (param)=>{
        return await this.apiActIxSort(param, EnumResultType.data);
    };
    $ActIXSort = async (param)=>{
        return await this.apiActIxSort(param, EnumResultType.sql);
    };
    ActIDProp = async (ID, id, name, value)=>{
        await this.uqApi.post("act-id-prop", {
            ID: ID.name,
            id,
            name,
            value
        });
    };
    ActID = async (param)=>{
        let ret = await this.apiActID(param, EnumResultType.data);
        let r = ret[0].ret.split("	").map((v)=>Number(v))[0];
        if (isNaN(r) === true) return undefined;
        return r;
    };
    $ActID = async (param)=>{
        let ret = await this.apiActID(param, EnumResultType.sql);
        return ret;
    };
    async apiActID(param, resultType) {
        let { ID , value , IX , ix  } = param;
        let apiParam = {
            ID: entityName(ID),
            value: this.buildValue(value),
            IX: IX?.map((v)=>entityName(v)),
            ix: ix?.map((v)=>this.buildValue(v))
        };
        return await this.apiPost("act-id", resultType, apiParam);
    }
    async apiActDetail(param, resultType) {
        let { main , detail , detail2 , detail3  } = param;
        let postParam = {
            main: {
                name: entityName(main.ID),
                value: toScalars(main.value)
            },
            detail: {
                name: entityName(detail.ID),
                values: detail.values?.map((v)=>toScalars(v))
            }
        };
        if (detail2) {
            postParam.detail2 = {
                name: entityName(detail2.ID),
                values: detail2.values?.map((v)=>toScalars(v))
            };
        }
        if (detail3) {
            postParam.detail3 = {
                name: entityName(detail3.ID),
                values: detail3.values?.map((v)=>toScalars(v))
            };
        }
        let ret = await this.apiPost("act-detail", resultType, postParam);
    }
    ActDetail = async (param)=>{
        let ret = await this.apiActDetail(param, EnumResultType.data);
        let val = ret[0].ret;
        let parts = val.split("\n");
        let items = parts.map((v)=>v.split("	"));
        ret = {
            main: ids(items[0])[0],
            detail: ids(items[1]),
            detail2: ids(items[2]),
            detail3: ids(items[3])
        };
        return ret;
    };
    $ActDetail = async (param)=>{
        return await this.apiActDetail(param, EnumResultType.sql);
    };
    async apiQueryID(param, resultType) {
        let { ID , IX , IDX  } = param;
        if (!IDX) {
            IDX = [
                ID
            ];
        }
        let ret = await this.apiPost("query-id", resultType, {
            ...param,
            ID: entityName(ID),
            IX: IX?.map((v)=>entityName(v)),
            IDX: this.IDXToString(IDX)
        });
        return ret;
    }
    QueryID = async (param)=>{
        return await this.apiQueryID(param, EnumResultType.data);
    };
    $QueryID = async (param)=>{
        return await this.apiQueryID(param, EnumResultType.sql);
    };
    async apiIDTv(ids, resultType) {
        let ret = await this.apiPost("id-tv", resultType, ids);
        return ret;
    }
    IDTv = async (ids)=>{
        let ret = await this.apiIDTv(ids, EnumResultType.data);
        let retValues = [];
        for (let row of ret){
            let { $type , $tv  } = row;
            if (!$tv) continue;
            let ID = this.ids[$type];
            if (!ID) continue;
            let { schema  } = ID;
            if (!schema) {
                await ID.loadSchema();
                schema = ID.schema;
            }
            let { nameNoVice  } = schema;
            if (!nameNoVice) continue;
            let values = $tv.split("\n");
            let len = nameNoVice.length;
            for(let i = 0; i < len; i++){
                let p = nameNoVice[i];
                row[p] = values[i];
            }
            delete row.$tv;
            retValues.push(row);
        }
        return retValues;
    };
    $IDTv = async (ids)=>{
        return await this.apiIDTv(ids, EnumResultType.sql);
    };
    async apiIDNO(param, resultType) {
        let { ID , stamp  } = param;
        let ret = await this.apiPost("id-no", resultType, {
            ID: entityName(ID),
            stamp
        });
        return ret;
    }
    IDNO = async (param)=>{
        return await this.apiIDNO(param, EnumResultType.data);
    };
    IDEntity = (typeId)=>{
        return this.entityTypes[typeId];
    };
    $IDNO = async (param)=>{
        return await this.apiIDNO(param, EnumResultType.sql);
    };
    async apiIDDetailGet(param, resultType) {
        let { id , main , detail , detail2 , detail3  } = param;
        let ret = await this.apiPost("id-detail-get", resultType, {
            id,
            main: entityName(main),
            detail: entityName(detail),
            detail2: entityName(detail2),
            detail3: entityName(detail3)
        });
        return ret;
    }
    IDDetailGet = async (param)=>{
        return await this.apiIDDetailGet(param, EnumResultType.data);
    };
    $IDDetailGet = async (param)=>{
        return await this.apiIDDetailGet(param, EnumResultType.sql);
    };
    IDXToString(p) {
        if (Array.isArray(p) === true) return p.map((v)=>entityName(v));
        return entityName(p);
    }
    async apiID(param, resultType) {
        let { IDX  } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost("id", resultType, {
            ...param,
            IDX: this.IDXToString(IDX)
        });
        return ret;
    }
    cache = {};
    cachePromise = {};
    idObj = async (id)=>{
        let obj = this.cache[id];
        if (obj === undefined) {
            let promise = this.cachePromise[id];
            if (promise === undefined) {
                promise = this.apiID({
                    id,
                    IDX: undefined
                }, EnumResultType.data);
                this.cachePromise[id] = promise;
            }
            let ret = await promise;
            obj = ret[0];
            this.cache[id] = obj === undefined ? null : obj;
            delete this.cachePromise[id];
        }
        return obj;
    };
    ID = async (param)=>{
        return await this.apiID(param, EnumResultType.data);
    };
    $ID = async (param)=>{
        return await this.apiID(param, EnumResultType.sql);
    };
    async apiKeyID(param, resultType) {
        let { ID , IDX  } = param;
        let ret = await this.apiPost("key-id", resultType, {
            ...param,
            ID: entityName(ID),
            IDX: IDX?.map((v)=>entityName(v))
        });
        return ret;
    }
    KeyID = async (param)=>{
        return await this.apiKeyID(param, EnumResultType.data);
    };
    $KeyID = async (param)=>{
        return await this.apiKeyID(param, EnumResultType.sql);
    };
    async apiIX(param, resultType) {
        let { IX , IX1 , IDX  } = param;
        //this.checkParam(null, IDX, IX, id, null, page);
        let ret = await this.apiPost("ix", resultType, {
            ...param,
            IX: entityName(IX),
            IX1: entityName(IX1),
            IDX: IDX?.map((v)=>entityName(v))
        });
        return ret;
    }
    IX = async (param)=>{
        return await this.apiIX(param, EnumResultType.data);
    };
    $IX = async (param)=>{
        return await this.apiIX(param, EnumResultType.sql);
    };
    async apiIXValues(param, resultType) {
        let { IX  } = param;
        let ret = await this.apiPost("ix-values", resultType, {
            ...param,
            IX: entityName(IX)
        });
        return ret;
    }
    IXValues = async (param)=>{
        return await this.apiIXValues(param, EnumResultType.data);
    };
    async apiIXr(param, resultType) {
        let { IX , IX1 , IDX  } = param;
        //this.checkParam(null, IDX, IX, id, null, page);
        let ret = await this.apiPost("ixr", resultType, {
            ...param,
            IX: entityName(IX),
            IX1: entityName(IX1),
            IDX: IDX?.map((v)=>entityName(v))
        });
        return ret;
    }
    IXr = async (param)=>{
        return await this.apiIXr(param, EnumResultType.data);
    };
    $IXr = async (param)=>{
        return await this.apiIXr(param, EnumResultType.sql);
    };
    async apiKeyIX(param, resultType) {
        let { ID , IX , IDX  } = param;
        //this.checkParam(ID, IDX, IX, null, key, page);
        let ret = await this.apiPost("key-ix", resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX),
            IDX: IDX?.map((v)=>entityName(v))
        });
        return ret;
    }
    KeyIX = async (param)=>{
        return await this.apiKeyIX(param, EnumResultType.data);
    };
    $KeyIX = async (param)=>{
        return await this.apiKeyIX(param, EnumResultType.sql);
    };
    async apiIDLog(param, resultType) {
        let { IDX  } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost("id-log", resultType, {
            ...param,
            IDX: entityName(IDX)
        });
        return ret;
    }
    IDLog = async (param)=>{
        return await this.apiIDLog(param, EnumResultType.data);
    };
    $IDLog = async (param)=>{
        return await this.apiIDLog(param, EnumResultType.sql);
    };
    async apiIDSum(param, resultType) {
        let { IDX  } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost("id-sum", resultType, {
            ...param,
            IDX: entityName(IDX)
        });
        return ret;
    }
    IDSum = async (param)=>{
        return await this.apiIDSum(param, EnumResultType.data);
    };
    $IDSum = async (param)=>{
        return await this.apiIDSum(param, EnumResultType.sql);
    };
    async apiIDinIX(param, resultType) {
        let { ID , IX  } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost("id-in-ix", resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX)
        });
        return ret;
    }
    IDinIX = async (param)=>{
        return await this.apiIDinIX(param, EnumResultType.data);
    };
    $IDinIX = async (param)=>{
        return await this.apiIDinIX(param, EnumResultType.sql);
    };
    async apiIDxID(param, resultType) {
        let { ID , IX , ID2  } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost("id-x-id", resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX),
            ID2: entityName(ID2)
        });
        return ret;
    }
    IDxID = async (param)=>{
        return await this.apiIDxID(param, EnumResultType.data);
    };
    $IDxID = async (param)=>{
        return await this.apiIDxID(param, EnumResultType.sql);
    };
    async apiIDTree(param, resultType) {
        let { ID  } = param;
        let ret = await this.apiPost("id-tree", resultType, {
            ...param,
            ID: entityName(ID)
        });
        return ret;
    }
    IDTree = async (param)=>{
        return await this.apiIDTree(param, EnumResultType.data);
    };
    $IDTree = async (param)=>{
        return await this.apiIDTree(param, EnumResultType.sql);
    };
}
function ids(item) {
    if (!item) return;
    let len = item.length;
    if (len <= 1) return;
    let ret = [];
    for(let i = 0; i < len - 1; i++)ret.push(Number(item[i]));
    return ret;
}
function entityName(entity) {
    if (!entity) return;
    if (typeof entity === "string") return entity;
    return entity.name;
}
function toScalars(value) {
    if (!value) return value;
    let ret = {};
    for(let i in value){
        let v = value[i];
        if (typeof v === "object") v = v["id"];
        ret[i] = v;
    }
    return ret;
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/uqsMan.ts


class UQsMan {
    uqMans = [];
    constructor(net, uqsSchema){
        this.net = net;
        this.uqsSchema = uqsSchema;
        this.uqMans = [];
        this.collection = {};
    }
    async buildUqs(uqDataArr, version, uqConfigs, isBuildingUQ) {
        await this.init(uqDataArr);
        let localMap = this.net.localDb.createLocalMap("$app");
        let localCacheVersion = localMap.child("version");
        let cacheVersion = localCacheVersion.get();
        if (version !== cacheVersion) {
            for (let uqMan of this.uqMans){
                uqMan.localMap.removeAll();
            }
            localCacheVersion.set(version);
        }
        let retErrors = await this.load();
        if (retErrors.length > 0) return retErrors;
        if (isBuildingUQ === false) {
            this.setTuidImportsLocal();
        }
        if (retErrors.length > 0) return retErrors;
        if (uqConfigs) {
            for (let uqConfig of uqConfigs){
                let { dev , name , alias  } = uqConfig;
                let { name: owner , alias: ownerAlias  } = dev;
                let uqLower = (ownerAlias ?? owner).toLowerCase() + "/" + (alias ?? name).toLowerCase();
                let uq = this.collection[uqLower];
                uq.config = uqConfig;
            }
        }
        this.proxy = this.buildUQs();
    }
    uq(uqName) {
        return this.collection[uqName.toLowerCase()];
    }
    async getUqUserRoles(uqLower) {
        let uqMan = this.collection[uqLower];
        if (uqMan === undefined) return null;
        let roles = await uqMan.getRoles();
        return roles;
    }
    async init(uqsData) {
        //let promiseInits: PromiseLike<void>[] = [];
        for (let uqData of uqsData){
            let { uqOwner , ownerAlias , uqName , uqAlias  } = uqData;
            // 原名加入collection
            let uqFullName = uqOwner + "/" + uqName;
            let uqFull = this.collection[uqFullName];
            let uq;
            if (uqFull) {
                uq = uqFull;
            } else {
                let uqSchema = this.uqsSchema[uqFullName];
                uq = new UqMan(this.net, uqData, uqSchema);
                this.collection[uqFullName] = uq;
            //promiseInits.push(uq.init());
            }
            this.uqMans.push(uq);
            let lower = uqFullName.toLowerCase();
            this.collection[lower] = uq;
            // 别名加入collection
            if (uqAlias) uqName = uqAlias;
            if (ownerAlias) uqOwner = ownerAlias;
            uqFullName = uqOwner + "/" + uqName;
            lower = uqFullName.toLowerCase();
            this.collection[lower] = uq;
        }
    //await Promise.all(promiseInits);
    }
    async load() {
        let retErrors = [];
        let promises = [];
        //let lowerUqNames:string[] = [];
        // collection有小写名字，还有正常名字
        //for (let i in this.collection) {
        for (let uqMan of this.uqMans){
            //let lower = (i as string).toLowerCase();
            //if (lowerUqNames.indexOf(lower) >= 0) continue;
            //lowerUqNames.push(lower);
            //let uq = this.collection[i];
            promises.push(uqMan.loadEntities());
        }
        let results = await Promise.all(promises);
        for (let result of results){
            let retError = result; // await cUq.loadSchema();
            if (retError !== undefined) {
                retErrors.push(retError);
            }
        }
        return retErrors;
    }
    buildUQs() {
        let uqs = {};
        function setUq(uqKey, proxy) {
            if (!uqKey) return;
            let lower = uqKey.toLowerCase();
            uqs[uqKey] = proxy;
            if (lower !== uqKey) uqs[lower] = proxy;
        }
        for (let uqMan of this.uqMans){
            let proxy = uqMan.createProxy();
            setUq(uqMan.getUqKey(), proxy);
            setUq(uqMan.getUqKeyWithConfig(), proxy);
        }
        return new Proxy(uqs, {
            get: (target, key, receiver)=>{
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined) return ret;
                this.errUndefinedUq(String(key));
            }
        });
    }
    errUndefinedUq(uq) {
        let message = `UQ ${uq} not defined`;
        let err = new Error(message);
        err.name = UqError.undefined_uq;
        throw err;
    }
    getUqMans() {
        return this.uqMans;
    }
    setTuidImportsLocal() {
        let ret = [];
        for (let uqMan of this.uqMans){
            for (let tuid of uqMan.tuidArr){
                if (tuid.isImport === true) {
                    let error = this.setInner(tuid);
                    if (error) ret.push(error);
                }
            }
        }
        return ret;
    }
    setInner(tuidImport) {
        let { from  } = tuidImport;
        let fromName = from.owner + "/" + from.uq;
        let uq = this.collection[fromName];
        if (uq === undefined) {
            //debugger;
            if (this.net.props.buildingUq !== true) {
                console.error(`setInner(tuidImport: TuidImport): uq ${fromName} is not loaded`);
            }
            return;
        }
        let iName = tuidImport.name;
        let tuid = uq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} has no Tuid ${iName}`;
        }
        if (tuid.isImport === true) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} Tuid ${iName} is import`;
        }
        tuidImport.setFrom(tuid);
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/uqsLoader.ts


const uqDataLocalStore = "uq-data-local-storage";
class UQsLoader {
    isBuildingUQ = false;
    constructor(net, uqConfigVersion, uqConfigs, uqsSchema){
        this.net = net;
        this.uqConfigVersion = uqConfigVersion;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
    }
    async build() {
        return await this.loadUqs();
    }
    // 返回 errors, 每个uq一行
    async loadUqs() {
        this.uqsMan = new UQsMan(this.net, this.uqsSchema);
        let uqs = await this.loadUqData(this.uqConfigs);
        return await this.uqsMan.buildUqs(uqs, this.uqConfigVersion, this.uqConfigs, this.isBuildingUQ);
    }
    async loadUqData(uqConfigs) {
        let uqs = uqConfigs.map((v)=>{
            let { dev , name , version , alias  } = v;
            let { name: owner , alias: ownerAlias  } = dev;
            return {
                owner,
                ownerAlias,
                name,
                version,
                alias
            };
        });
        let ret = this.loadLocal(uqs);
        if (!ret) {
            let centerAppApi = new CenterAppApi(this.net, "tv/");
            try {
                ret = uqs.length === 0 ? [] : await centerAppApi.uqs(uqs);
            } catch (e) {
                debugger;
            }
            if (ret.length < uqs.length) {
                let err = `下列UQ：\n${uqs.map((v)=>`${v.owner}/${v.name}`).join("\n")}之一不存在`;
                console.error(err);
                throw Error(err);
            }
            //localStorage
            this.net.localDb.setItem(uqDataLocalStore, JSON.stringify(ret));
        }
        for(let i = 0; i < uqs.length; i++){
            let { ownerAlias , alias  } = uqs[i];
            ret[i].ownerAlias = ownerAlias;
            ret[i].uqAlias = alias;
        }
        return ret;
    }
    loadLocal(uqs) {
        // localStorage
        let local = this.net.localDb.getItem(uqDataLocalStore);
        if (!local) return;
        try {
            let ret = JSON.parse(local);
            for (let uq of uqs){
                let { owner , name  } = uq;
                let p = ret.findIndex((v)=>{
                    let { uqOwner , uqName  } = v;
                    return owner.toLowerCase() === uqOwner.toLowerCase() && name.toLowerCase() === uqName.toLowerCase();
                });
                if (p < 0) return;
            }
            return ret;
        } catch  {
            return;
        }
    }
}
class UQsBuildingLoader extends (/* unused pure expression or super */ null && (UQsLoader)) {
    async build() {
        this.isBuildingUQ = true;
        let retErrors = await this.loadUqs();
        return retErrors;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/uqCore/index.ts


















;// CONCATENATED MODULE: ./tonwa-uq/createUQs/createUQsMan.ts

async function createUQsMan(net, appConfig, uqConfigs, uqsSchema) {
    let { version  } = appConfig;
    let uqsLoader = new UQsLoader(net, version, uqConfigs, uqsSchema);
    let initErrors = await uqsLoader.build();
    if (initErrors) {
        console.error(initErrors);
        throw initErrors;
    }
    return uqsLoader.uqsMan;
//let uqs = uqsProxy() as any;
//let a = uqs;
//return a;
}

;// CONCATENATED MODULE: ./tonwa-uq/createUQs/Uq.ts
//import { observer } from "mobx-react";
//import React from "react";

class Uq {
    constructor(uqMan){
        this.$_uqMan = uqMan;
        this.$_uqSql = this.$_createUqSqlProxy();
    }
    $_createProxy() {
        let ret = new Proxy(this.$_uqMan.entities, {
            get: (target, key, receiver)=>{
                if (key === "SQL") {
                    return this.$_uqSql;
                }
                let lk = key.toLowerCase();
                if (lk[0] === "$") {
                    switch(lk){
                        case "$":
                            return this;
                        case "$name":
                            return this.$_uqMan.name;
                    }
                }
                let ret = target[lk];
                if (ret !== undefined) return ret;
                let func = this.$_uqMan[key];
                if (func !== undefined) return func;
                func = this[key];
                if (func !== undefined) return func;
                this.errUndefinedEntity(String(key));
            }
        });
        return ret;
    }
    $_createUqSqlProxy() {
        let ret = new Proxy(this.$_uqMan, {
            get: (target, key, receiver)=>{
                let ret = target["$" + key];
                if (ret !== undefined) return ret;
                this.errUndefinedEntity(String(key));
            }
        });
        return ret;
    }
    errUndefinedEntity(entity) {
        let message = `entity ${this.$_uqMan.name}.${entity} not defined`;
        let err = new Error(message);
        err.name = UqError.undefined_entity;
        throw err;
    }
}

;// CONCATENATED MODULE: ./tonwa-uq/createUQs/uqsProxy.tsx

function uqsProxy(uqsMan) {
    const uqs = {};
    function setUq(uqKey, proxy) {
        if (!uqKey) return;
        let lower = uqKey.toLowerCase();
        uqs[uqKey] = proxy;
        if (lower !== uqKey) uqs[lower] = proxy;
    }
    for (let uqMan of uqsMan.uqMans){
        let uq = new Uq(uqMan);
        let proxy = uq.$_createProxy();
        setUq(uqMan.getUqKey(), proxy);
        setUq(uqMan.getUqKeyWithConfig(), proxy);
    }
    function onUqProxyError(key) {
        for(let i in uqs){
            let uqReact = uqs[i];
            uqReact.localMap.removeAll();
        }
        console.error(`uq proxy ${key} error`);
    }
    return new Proxy(uqs, {
        get: (target, key, receiver)=>{
            let lk = key.toLowerCase();
            let ret = target[lk];
            if (ret !== undefined) return ret;
            debugger;
            console.error(`controller.uqs.${String(key)} undefined`);
            onUqProxyError(String(key));
            return undefined;
        }
    });
}

;// CONCATENATED MODULE: ./tonwa-uq/createUQs/index.ts



;// CONCATENATED MODULE: ./tonwa-uq/index.ts





;// CONCATENATED MODULE: ./uq-app/uqs/BzWorkshop.ts
var Gender;
(function(Gender) {
    Gender[Gender["female"] = 0] = "female";
    Gender[Gender["male"] = 1] = "male";
})(Gender || (Gender = {}));
const TagGroupNames = {
    staff: "staff-tags",
    client: "client-tags",
    workshop: "workshop-tags",
    donator: "donator-tags",
    note: "note-tags"
};
var Role;
(function(Role) {
    Role[Role["staff"] = 10] = "staff";
    Role[Role["counselor"] = 11] = "counselor";
    Role[Role["volunteer"] = 12] = "volunteer";
    Role[Role["board"] = 13] = "board";
    Role[Role["support"] = 14] = "support";
    Role[Role["client"] = 20] = "client";
    Role[Role["donator"] = 30] = "donator";
})(Role || (Role = {}));
const uqSchema = {
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "draft": {
        "name": "Draft",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "entity",
                "type": "smallint"
            },
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3
    },
    "ixdraft": {
        "name": "IxDraft",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "note": {
        "name": "Note",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "client",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3
    },
    "ixstaffclient": {
        "name": "IxStaffClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "tick",
                "type": "int"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "savenote": {
        "name": "SaveNote",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "client",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "note",
                        "tuid": "note"
                    }
                ]
            }
        ]
    },
    "myclients": {
        "name": "MyClients",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "gender": {
        "name": "Gender",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "female": 0,
            "male": 1
        }
    },
    "person": {
        "name": "Person",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "char",
                "size": 50
            },
            {
                "name": "firstName",
                "type": "char",
                "size": 50
            },
            {
                "name": "lastName",
                "type": "char",
                "size": 50
            },
            {
                "name": "middleName",
                "type": "char",
                "size": 50
            },
            {
                "name": "gender",
                "type": "enum"
            },
            {
                "name": "year",
                "type": "smallint"
            },
            {
                "name": "month",
                "type": "tinyint"
            },
            {
                "name": "day",
                "type": "tinyint"
            },
            {
                "name": "email",
                "type": "char",
                "size": 100
            },
            {
                "name": "mobile",
                "type": "char",
                "size": 30
            },
            {
                "name": "mobileCountry",
                "type": "char",
                "size": 10
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "ixpersonlog": {
        "name": "IxPersonLog",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uid",
                "tuid": "$uid"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "clientsurvey": {
        "name": "ClientSurvey",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "client",
                "type": "id"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3
    },
    "getpersonlist": {
        "name": "GetPersonList",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "user",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "person",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "personsearch": {
        "name": "PersonSearch",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            },
            {
                "name": "key",
                "type": "char",
                "size": 30
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "getpersonlog": {
        "name": "GetPersonLog",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "person",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "log",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "taggroupnames": {
        "name": "TagGroupNames",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {
            "staff": "staff-tags",
            "client": "client-tags",
            "workshop": "workshop-tags",
            "donator": "donator-tags",
            "note": "note-tags"
        }
    },
    "taggroup": {
        "name": "TagGroup",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "tag": {
        "name": "Tag",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "vice",
                "type": "char",
                "size": 100
            },
            {
                "name": "single",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name",
            "vice"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "tagitem": {
        "name": "TagItem",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "ixtag": {
        "name": "IxTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixidtag": {
        "name": "IxIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixlocalidtag": {
        "name": "IxLocalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixglobalidtag": {
        "name": "IxGlobalIdTag",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "role": {
        "name": "Role",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "staff": 10,
            "counselor": 11,
            "volunteer": 12,
            "board": 13,
            "support": 14,
            "client": 20,
            "donator": 30
        }
    },
    "ixuserperson": {
        "name": "IxUserPerson",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixpersonrole": {
        "name": "IxPersonRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "test1": {
        "name": "Test1",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 2
    },
    "test2": {
        "name": "Test2",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 2
    },
    "test3": {
        "name": "Test3",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 3
    },
    "test4": {
        "name": "Test4",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "a",
                "type": "char",
                "size": 100
            },
            {
                "name": "b",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "a",
                "type": "char",
                "size": 100
            }
        ],
        "global": false,
        "idType": 3
    },
    "test": {
        "name": "Test",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": []
    },
    "workshop": {
        "name": "Workshop",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            },
            {
                "name": "vice",
                "type": "text"
            },
            {
                "name": "staff",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no",
            "vice"
        ],
        "create": true,
        "global": false,
        "idType": 2
    },
    "session": {
        "name": "Session",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "workshop",
                "type": "id",
                "ID": "workshop",
                "tuid": "workshop"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "vice",
                "type": "char",
                "size": 200
            },
            {
                "name": "time",
                "type": "time"
            },
            {
                "name": "span",
                "type": "smallint"
            }
        ],
        "keys": [],
        "nameNoVice": [
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "sessionperson": {
        "name": "SessionPerson",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "session",
                "type": "id",
                "ID": "session",
                "tuid": "session"
            },
            {
                "name": "person",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            },
            {
                "name": "workshop",
                "type": "id",
                "ID": "workshop",
                "tuid": "workshop"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "session",
                "type": "id",
                "ID": "session",
                "tuid": "session"
            },
            {
                "name": "person",
                "type": "id",
                "ID": "person",
                "tuid": "person"
            }
        ],
        "global": false,
        "idType": 3
    },
    "ixworkshopsession": {
        "name": "IxWorkshopSession",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixsessionstaff": {
        "name": "IxSessionStaff",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixsessionclient": {
        "name": "IxSessionClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "deleted",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "create": true,
        "update": true,
        "xiType": 2
    },
    "setsessionstaff": {
        "name": "SetSessionStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "saveworkshopstaff": {
        "name": "SaveWorkshopStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            }
        ],
        "returns": []
    },
    "savesessionattendee": {
        "name": "SaveSessionAttendee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "mysessions": {
        "name": "MySessions",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "workshop",
                        "type": "id",
                        "ID": "workshop",
                        "tuid": "workshop"
                    },
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "time",
                        "type": "time"
                    },
                    {
                        "name": "span",
                        "type": "smallint"
                    },
                    {
                        "name": "own",
                        "type": "tinyint"
                    },
                    {
                        "name": "substitue",
                        "type": "tinyint"
                    },
                    {
                        "name": "done",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    }
};

;// CONCATENATED MODULE: ./uq-app/uqs/index.ts
//=== UqApp builder created on Fri Jul 29 2022 17:08:53 GMT-0400 (北美东部夏令时间) ===//

const uqsSchema = {
    "bizdev/workshop": uqSchema
};


;// CONCATENATED MODULE: ./uq-app/uqconfig.json
const uqconfig_namespaceObject = JSON.parse('{"devs":{"bz":{"name":"bizdev","alias":"bz"}},"uqs":[{"dev":"bz","name":"workshop","alias":"Workshop"}]}');
;// CONCATENATED MODULE: ./uq-app/uqSession.ts



class UqSession {
    async init() {
        let net = new Net({
            center: appConfig.center,
            debug: appConfig.debug,
            unit: 0,
            testing: true,
            localDb: new LocalMapDb(),
            createObservableMap: ()=>new Map()
        });
        await net.init();
        let uqsMan = await createUQsMan(net, appConfig, uqConfigs, uqsSchema);
        this.uqs = uqsProxy(uqsMan);
        this.net = net;
    }
    title = "app title";
    async load() {
        return "loaded app";
    }
}
const appConfig = {
    version: "0.1.0",
    center: "https://dev.tonwa.ca",
    debug: {
        center: "localhost:3000",
        uq: "localhost:3015",
        res: "localhost:3015"
    },
    noUnit: true,
    oem: undefined,
    htmlTitle: "Warehouse"
};
function uqConfigsFromJson(json) {
    let ret = [];
    let { devs , uqs  } = json;
    for (let uq of uqs){
        let { dev , name , alias  } = uq;
        ret.push({
            dev: devs[dev],
            name,
            alias
        });
    }
    return ret;
}
const uqConfigs = uqConfigsFromJson(uqconfig_namespaceObject);
let uqSession;
async function getUqSession() {
    if (uqSession === undefined) {
        uqSession = new UqSession();
        await uqSession.init();
    }
    return uqSession;
}

;// CONCATENATED MODULE: ./uq-app/index.ts


;// CONCATENATED MODULE: ./pages/api/auth/login.ts

async function handler(req, res) {
    let uqSession = await getUqSession();
    let { body  } = req;
    let { username , password  } = body;
    let ret = await uqSession.net.userApi.login({
        user: username,
        pwd: password,
        guest: undefined
    });
    res.status(200).json(ret);
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8465));
module.exports = __webpack_exports__;

})();