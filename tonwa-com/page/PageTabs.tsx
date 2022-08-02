import React, { ReactElement, useContext, useRef, useState } from "react";
import { ScrollContext, useScroll } from "./useScroll";

interface TabObject {
    id: number;
    name: string;
    tag: string | JSX.Element;
    content: JSX.Element;
    mountable: boolean;         // 只有在点击tab之后，才初始化
}

interface TabProps {
    name: string;
    tag: string | JSX.Element;
    children: React.ReactNode;
}

export function Tab(props: TabProps): JSX.Element {
    return null;
}

let tabId = 1;
function createTabsFromChildren(children: React.ReactNode) {
    let tabs: TabObject[] = [];
    React.Children.forEach(children, (element) => {
        if (React.isValidElement(element) === false) return;
        let elType = (element as any).type;
        if (elType === React.Fragment) return;
        if (elType !== Tab) return;
        invariant(elType === Tab,
            `[${typeof elType === "string" ? elType : elType.name
            }] is not a <Tab> component. All component children of <PageTabs> must be a <Tab>`
        );
        let { props } = element as ReactElement;
        let tab: TabObject = {
            id: tabId++,
            name: props.name,
            tag: props.tag,
            content: <>{props.children}</>,
            mountable: false,
        };
        tabs.push(tab);
    });
    return tabs;
}

export function PageTabs({ children }: { children: React.ReactNode; }) {
    let { current: tabs } = useRef(createTabsFromChildren(children));
    return <InnerPageTabs tabs={tabs} />;
}

function InnerPageTabs({ tabs }: { tabs: TabObject[]; }) {
    let scrollContext = useContext(ScrollContext);
    let [active, setActive] = useState(0);
    tabs[active].mountable = true;
    function onTabClick(tabIndex: number) {
        if (tabIndex === active) return;
        let tab = tabs[tabIndex];
        if (!tab) return;
        tab.mountable = true;
        setActive(tabIndex);
    }
    scrollContext = scrollContext ?? 'page-tabs';
    let overflowY: any;
    switch (scrollContext) {
        default: break;
        case 'app-tabs': overflowY = 'auto'; break;
        case 'page-tabs': overflowY = 'scroll'; break;
    }
    return <ScrollContext.Provider value={scrollContext}>
        <div className="flex-grow-1 d-flex flex-column" style={{ overflowY }}>
            <div className="tonwa-page-content tab-content flex-grow-1">
                {
                    tabs.map((v, index) => <TabPane key={v.id} tab={v} active={active} index={index} />)
                }
            </div>
            <ul className="nav nav-tabs position-sticky tonwa-page-container justify-content-evenly bg-light" style={{ bottom: '0' }}>
                {tabs.map((v, index) => <li key={v.name} className="nav-item flex-fill align-self-stretch">
                    <div onClick={() => onTabClick(index)}
                        className={'nav-link h-100 p-0 ' + (index === active ? 'active' : 'cursor-pointer')}>
                        {v.tag}
                    </div>
                </li>)}
            </ul>
        </div>
    </ScrollContext.Provider>;
}

function TabPane({ tab, active, index }: { tab: TabObject; active: number; index: number; }) {
    let divRef = useScroll();
    let { mountable, content } = tab;
    if (mountable === false) return null;
    return <div ref={divRef} className={'tab-pane ' + (active === index ? 'active' : '')}>
        {content}
    </div>
}

function invariant(condition: boolean, message: string): asserts condition {
    if (!condition) throw new Error(message);
}
