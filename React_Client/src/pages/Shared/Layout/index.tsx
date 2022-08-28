import React, { ReactNode, useLayoutEffect } from 'react';
import { refreshToken, revoke, getUserInfo } from '@src/redux/account/actions';
import { connect, ConnectedProps } from 'react-redux';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import { getUserId } from '@src/store/localStorage';
import { clearState } from '@src/store/localStorage';
import { isEmpty } from 'lodash';

function mapStateToProps(state: any) {
    return {
        loading: state.account.loading,
        error: state.account.error,
        userLogin: state.account.userLogin || {}
    };
}

const mapDispatchToProps = {
    getUserInfo,
    refreshToken,
    revoke
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface OwnProps {
    children: ReactNode;
}

type LayoutProps = OwnProps & ConnectedProps<typeof connector>;

const Layout: React.FunctionComponent<LayoutProps> = ({
    revoke,
    getUserInfo,
    userLogin,
    children
}) => {
    const userId = getUserId();
    useLayoutEffect(() => {
        if (!isEmpty(userId)) {
            getUserInfo(userId);
        }
    }, [userId]);

    const handleLogout = () => {
        clearState();
        revoke();
    };
    return (
        <div className="rs-layout">
            <Header onLogout={handleLogout} userLogin={userLogin} />
            <Content>{children}</Content>
            <Footer />
        </div>
    );
};

export default connector(Layout);
