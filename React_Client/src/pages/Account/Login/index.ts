import { connect, ConnectedProps } from 'react-redux';
import { userLogin, setClear } from '@src/redux/account/actions';
import { RootState } from '@common/models';
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.account.loading,
    isLoggedIn: state.account.isLoggedIn,
    error: state.account.error
});

const mapDispatchToProps = {
    userLogin,
    setClear
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type LoginPageProps = ConnectedProps<typeof connector>;

export default connector(View);
