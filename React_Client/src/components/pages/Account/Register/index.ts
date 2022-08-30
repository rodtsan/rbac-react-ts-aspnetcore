import { connect, ConnectedProps } from 'react-redux';
import { register, setClear } from '@store/reducers/account/actions';
import { RootState } from '@common/models/Interfaces';
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.account.loading,
    error: state.account.error,
    isRegistered: state.account.isRegistered
});

const mapDispatchToProps = {
    register,
    setClear
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type RegisterPageProps = ConnectedProps<typeof connector>;

export default connector(View);
