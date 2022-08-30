import classNames from 'classnames';
import React, { PureComponent } from 'react';
import TabPane, { TabPaneType } from './TabPane';

export interface TabsProps {
    children: TabPaneType[];
    activeKey?: React.Key;
    onClick: (key: React.Key) => void;
}

class Tabs extends PureComponent<TabsProps> {
    static Pane: typeof TabPane;
    constructor(props: TabsProps) {
        super(props);
    }

    handleClick =
        (key: React.Key) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            this.props.onClick(key);
            event.preventDefault();
            event.stopPropagation();
        };

    render() {
        const children = this.props.children;
        const activeKey = this.props.activeKey;
        const keys = children?.map((child) => child.key);
        const activeChild =
            children?.find((child) => child.key === activeKey) ||
            children[0];
        const activeTabKeys =
            keys.filter((k) => k === activeKey).length > 0
                ? keys.filter((k) => k === activeKey)
                : [];

        return (
            <div className="rs-tabs tabs">
                <ul className="nav nav-tabs">
                    {children &&
                        children.map((child: TabPaneType, key: number) => (
                            <li key={key} className="tab nav-item">
                                <a
                                    className={classNames('nav-link', {
                                        active: activeTabKeys?.includes(child.key)
                                    })}
                                    href="#"
                                    onClick={this.handleClick(child.key || key)}
                                    role="button"
                                >
                                    {child.props.tab}
                                </a>
                            </li>
                        ))}
                </ul>
                <div className="tabs-content p-3 m-0">{activeChild}</div>
            </div>
        );
    }
}

Tabs.Pane = TabPane;

export default Tabs;
