import { connect, ConnectedProps } from 'react-redux';
import { userLogin } from '@src/redux/account/actions';
import { RootState } from '@common/models';
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.account.loading,
    error: state.account.error,
    isPasswordReset: state.account.isPasswordReset
});

const mapDispatchToProps = {
    userLogin,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ResetPasswordPageProps = ConnectedProps<typeof connector>;

export default connector(View);
