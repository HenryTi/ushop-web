import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppNav } from 'tonwa-com';
import { Guest, AppConfig, LocalDb, NetProps, UqConfig, User, UserApi } from 'tonwa-uq';
import { createUQsMan, Net } from "tonwa-uq";
// UQsLoader, 
// import { uqsProxy } from './uq';
import { env, LocalData } from 'tonwa-com';
import { proxy, useSnapshot } from 'valtio';
import { Spinner } from 'tonwa-com';
import { AppNavContext } from 'tonwa-com';
import { StackContainer } from 'tonwa-com';
import { uqsProxy } from './uq-old';

let uqAppId = 1;
export abstract class UqAppBase<U = any> {
    private readonly appConfig: AppConfig;
    private readonly uqConfigs: UqConfig[];
    private readonly uqsSchema: { [uq: string]: any; };
    private localData: LocalData;
    readonly uqAppBaseId: number;
    readonly net: Net;
    readonly appNav: AppNav;
    readonly userApi: UserApi;
    readonly version: string;    // version in appConfig;
    readonly responsive: {
        user: User;
    }
    guest: number;
    uqs: U;

    constructor(appConfig: AppConfig, uqConfigs: UqConfig[], uqsSchema: { [uq: string]: any; }) {
        this.uqAppBaseId = uqAppId++;
        this.appConfig = appConfig;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
        this.version = appConfig.version;
        this.responsive = proxy({
            user: undefined,
        });
        let props: NetProps = {
            center: appConfig.center,
            debug: appConfig.debug,
            unit: env.unit,
            testing: env.testing,
            localDb: new LocalStorageDb(),
            createObservableMap: () => new Map(), //new ObservableMap(),
        }
        this.net = new Net(props);
        this.localData = new LocalData();

        this.appNav = new AppNav();
        this.userApi = this.net.userApi;
    }

    logined(user: User) {
        this.net.logoutApis();
        this.responsive.user = user;
        this.appNav.onLoginChanged(true);
        if (user) {
            this.net.setCenterToken(user.id, user.token);
        }
        else {
            this.net.clearCenterToken();
        }
        this.localData.user.set(user);
    }

    async setUserProp(propName: string, value: any) {
        await this.userApi.userSetProp(propName, value);
        let { user } = this.responsive;
        (user as any)[propName] = value;
        this.localData.user.set(user);
    }

    saveLocalData() {
        this.localData.saveToLocalStorage();
    }

    protected onInited(): Promise<void> {
        return;
    }

    //private uqsUserId: number = -1;
    private initCalled = false;
    initErrors: string[];
    async init(initPage: React.ReactNode, navigateFunc: NavigateFunction): Promise<void> {
        if (this.initCalled === true) return;
        this.initCalled = true;
        //if (this.responsive.user?.id === this.uqsUserId) return;
        await this.net.init();
        let user = this.localData.user.get();
        if (user) {
            this.logined(user);
        }
        else {
            let guest: Guest = this.localData.guest.get();
            if (guest === undefined) {
                guest = await this.net.userApi.guest();
            }
            if (!guest) {
                debugger;
                throw Error('guest can not be undefined');
            }
            this.net.setCenterToken(0, guest.token);
            this.localData.guest.set(guest);
        }

        //this.uqsUserId = this.responsive.user?.id;

        try {
            let uqsMan = await createUQsMan(this.net, this.appConfig, this.uqConfigs, this.uqsSchema);
            this.uqs = uqsProxy(uqsMan) as U;
            this.appNav.init(initPage, navigateFunc);
            await this.onInited();
        }
        catch (error) {
            console.error(error);
        }
        /*
        let { version } = this.appConfig;
        let uqsLoader = new UQsLoader(this.net, version, this.uqConfigs, this.uqsSchema);
        this.initErrors = await uqsLoader.build();
        this.uqs = uqsProxy(uqsLoader.uqsMan) as any; //  this.uqsMan.proxy;
        if (!this.initErrors) {
            this.appNav.init(initPage, navigateFunc);
            await this.onInited();
        }
        */
    }
}

class LocalStorageDb extends LocalDb {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export const UqAppContext = React.createContext(undefined);
export function useUqAppBase<U, T extends UqAppBase<U> = UqAppBase<U>>() {
    return useContext<T>(UqAppContext);
}

export function UqAppBaseView<T extends UqAppBase>({ uqApp, children }: { uqApp: T; children: ReactNode; }) {
    let { appNav } = uqApp;
    let [appInited, setAppInited] = useState<boolean>(false);
    let { stack } = useSnapshot(appNav.data);
    let navigateFunc = useNavigate();
    useEffect(() => {
        async function appInit() {
            await uqApp.init(children, navigateFunc);
            setAppInited(true);
        }
        appInit();
    }, [uqApp, children, navigateFunc]);
    if (appInited === false) {
        return <div className="p-5 text-center">
            <Spinner className="text-info" />
        </div>;
    }
    if (uqApp.initErrors) {
        return <div>
            <div>uq app start failed. init errors: </div>
            <ul className="text-danger">
                {
                    uqApp.initErrors.map((v, index) => <li key={index}>{v}</li>)
                }
            </ul>
        </div>;
    }
    return <UqAppContext.Provider value={uqApp}>
        <AppNavContext.Provider value={appNav}>
            <StackContainer stackItems={stack} />
        </AppNavContext.Provider>
    </UqAppContext.Provider>;
}
