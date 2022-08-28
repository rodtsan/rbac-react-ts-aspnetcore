import React, { ReactNode } from 'react';

export interface TabPaneProps {
    tab: ReactNode;
    children: ReactNode;
}

const TabPane: React.FunctionComponent<TabPaneProps> = ({ children }) => {
    return <div className="tab-panel">{children}</div>;
};

export type TabPaneType = React.ReactElement<TabPaneProps>;

export default TabPane;