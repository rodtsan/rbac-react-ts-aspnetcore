import React, { ReactNode, useLayoutEffect } from 'react';
import { refreshToken, revoke, getUserInfo } from '@store/reducers/account/actions';
import { connect, ConnectedProps } from 'react-redux';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import { getUserId } from '@store/localStorage';
import { clearState } from '@store/localStorage';
import { isEmpty, some } from 'lodash';
import Alert from '@components/controls/Alert';

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
    error,
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
    const hasError = some(error)
    return (
        <div className="rs-layout">
            <Header onLogout={handleLogout} userLogin={userLogin} />
            <Content>
            {hasError && <Alert type="alert-danger" className="text-center">{error.code}: {error.message}</Alert>}
                <>{children}</>
            </Content>
            <Footer />
        </div>
    );
};

export default connector(Layout);
