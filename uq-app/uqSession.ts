import { AppConfig, createUQsMan, LocalMapDb, Net, UqConfig, uqsProxy } from "tonwa-uq";
import { UQs, uqsSchema } from "./uqs";
import uqconfigJson from './uqconfig.json';

class UqSession {
    uqs: UQs;
    async init() {
        let net = new Net({
            center: appConfig.center,
            debug: appConfig.debug,
            unit: 0, // env.unit,
            testing: true, // env.testing,
            localDb: new LocalMapDb(),
            createObservableMap: () => new Map(), //new ObservableMap(),
        });
        await net.init();
        let uqsMan = await createUQsMan(net, appConfig, uqConfigs, uqsSchema);
        this.uqs = uqsProxy(uqsMan) as UQs;
    }

    title = 'app title';

    async load(): Promise<string> {
        return 'loaded app';
    }
}

const appConfig: AppConfig = {
    version: '0.1.0',
    center: 'https://dev.tonwa.ca', // 'https://tv.jkchemical.com', // 
    debug: {
        center: 'localhost:3000',
        uq: 'localhost:3015',
        res: 'localhost:3015',
    },
    noUnit: true,
    oem: undefined,
    htmlTitle: 'Warehouse',
};

function uqConfigsFromJson(json: { devs: { [dev: string]: any }; uqs: any[]; }): UqConfig[] {
    let ret: UqConfig[] = [];
    let { devs, uqs } = json;
    for (let uq of uqs) {
        let { dev, name, alias } = uq;
        ret.push({
            dev: devs[dev],
            name,
            alias,
        });
    }
    return ret;
}
const uqConfigs = uqConfigsFromJson(uqconfigJson);

let uqServer: UqSession;
export async function getUqServer(): Promise<UqSession> {
    if (uqServer === undefined) {
        uqServer = new UqSession();
        await uqServer.init();
    }
    return uqServer;
}
