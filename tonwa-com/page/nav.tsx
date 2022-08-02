import React, { useContext } from "react";
import { Spinner } from "../coms";
import { proxy, ref } from "valtio";
import { AppNav, TabNav } from "./AppNav";
import { UPage } from "./Page";

export interface StackItem {
    key: string;
    page: JSX.Element;
    onClose?: () => boolean;
}

export interface TabItem extends StackItem {
    title: string;
    keep?: boolean;
}

export class StackNav<T extends StackItem> {
    readonly data: {
        stack: T[];
    };
    private stackLen: number = 0;
    private callStack: ((value: any | PromiseLike<any>) => void)[] = [];
    private pageKeyNO: number;
    constructor() {
        this.pageKeyNO = 0;
        this.data = proxy({
            stack: [],
        });
    }

    open(page: JSX.Element | (() => Promise<JSX.Element>), onClose?: () => boolean): void {
        if (typeof (page) === 'function') {
            let promise: Promise<JSX.Element> = page();
            let isWaiting = false;
            setTimeout(() => {
                if (isWaiting === undefined) return;
                this.open(<Waiting />);
                isWaiting = true;
            }, 100);
            promise.then(async (pg) => {
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

    protected internalOpen(page: JSX.Element, onClose?: () => boolean): void {
        this.innerClose();
        let pageItem = {
            key: String(++this.pageKeyNO),
            page, onClose,
        } as T;
        this.data.stack.push(ref(pageItem));
        this.stackLen = this.data.stack.length
    }

    close(level: number = 1) {
        this.stackLen -= level;
        this.innerClose();
        //for (let i = 0; i < level; i++) this.innerClose();
    }

    cease(level: number = 1) {
        this.stackLen -= level;
    }

    call<T>(page: JSX.Element | (() => Promise<JSX.Element>)): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.callStack.push(resolve);
            this.open(page);
        });
    }

    returnCall<T>(returnValue: T) {
        let resolve = this.callStack.pop();
        if (resolve === undefined) {
            console.error('nav.call and nav.returnCall not matched');
            return;
        }
        this.cease();
        resolve(returnValue);
    }

    async confirm(msg: string): Promise<boolean> {
        return window.confirm(msg);
    }

    clear() {
        alert('nav clear');
    }

    protected innerClose() {
        let { stack } = this.data;
        let len = stack.length;
        if (len === 0) {
            this.stackLen = 0;
            return;
        }
        if (this.stackLen < 0) this.stackLen = 0;
        let stackLen = this.stackLen;
        for (let i = len - 1; i >= stackLen; i--) {
            let { onClose } = stack[i];
            if (onClose?.() === false) return;
            stack.pop();
        }
    }
}

function Waiting() {
    return <UPage header="..." back="none" headerClassName="bg-secondary">
        <div className="px-5 py-5 text-info text-center">
            <Spinner />
        </div>
    </UPage>;
}

export class Nav extends StackNav<StackItem> {
    readonly appNav: AppNav;
    readonly tabNav: TabNav;

    constructor(appNav: AppNav, tabNav: TabNav, initPage: React.ReactNode) {
        super();
        this.appNav = appNav;
        this.tabNav = tabNav;
        this.internalOpen(initPage as JSX.Element);
    }
    /*
        navigate(to: To, options?: NavigateOptions) {
            this.appNav.navigate(to, options);
        }
    */
    openTab(tabItem: TabItem) {
        this.tabNav.openTab(tabItem);
    }

    protected innerClose() {
        super.innerClose();
        if (this.data.stack.length > 0) return;
        if (this.tabNav) {
            this.tabNav.closeTab();
        }
        else {
            //this.appNav.close();
            this.appNav.cease();
        }
    }
}

export const AppNavContext = React.createContext<AppNav>(undefined);
export const TabNavContext = React.createContext<TabNav>(undefined);
export const PageStackContext = React.createContext<Nav>(undefined);

export function useAppNav() {
    return useContext(AppNavContext);
}

export function useTabNav() {
    return useContext(TabNavContext);
}

export function useNav() {
    return useContext(PageStackContext);
}
