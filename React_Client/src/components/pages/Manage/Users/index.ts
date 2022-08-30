import { connect, ConnectedProps } from 'react-redux';
import {
    getUsersPerPage,
    setPaging,
    getUserRoles,
    setUserRoles,
    addUserRoles,
    updateUser,
    deleteUser,
    setClear
} from '@store/reducers/manage/users/actions';
import { RootState, Paging, User, UserRole } from '@common/models/Interfaces';
/* Components */
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.users.loading,
    error: state.users.error,
    paging: state.users.paging as Paging<User>,
    userRoles: state.users.userRoles as UserRole[]
});

const mapDispatchToProps = {
    getUsersPerPage,
    setPaging,
    getUserRoles,
    setUserRoles,
    addUserRoles,
    updateUser,
    deleteUser,
    setClear
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type UsersPageProps = ConnectedProps<typeof connector>;

export default connector(View);
