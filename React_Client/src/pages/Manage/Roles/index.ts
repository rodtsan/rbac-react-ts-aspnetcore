import { connect, ConnectedProps } from 'react-redux';
import { getRolesPerPage, setClear } from '@store/reducers/manage/roles/actions';
import { RootState, Paging, Role } from '@common/models/Interfaces';
/* Components */
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.roles.loading,
    error: state.roles.error,
    paging: state.roles.paging as Paging<Role>
});

const mapDispatchToProps = {
    getRolesPerPage,
    setClear
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type RolesPageProps = ConnectedProps<typeof connector>;

export default connector(View);
