import { Hosts, Net } from "../net";
import { UqConfig } from "../tool";
import { UQsLoader, UQsMan } from "../uqCore";
// import { uqsProxy } from "./uqsProxy";

export interface AppConfig { //extends UqsConfig {
    center: string;
    debug: Hosts;
    version: string;        // 版本变化，缓存的uqs才会重载
    loginTop?: JSX.Element;
    oem?: string;               // 用户注册发送验证码的oem厂家，默认同花
    privacy?: string;
    noUnit?: boolean;			// app的运行，不跟unit绑定
    htmlTitle?: string;
}

export async function createUQsMan(net: Net, appConfig: AppConfig, uqConfigs: UqConfig[], uqsSchema: { [uq: string]: any; }): Promise<UQsMan> {
    let { version } = appConfig;
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