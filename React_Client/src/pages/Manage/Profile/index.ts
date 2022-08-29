import { connect, ConnectedProps } from 'react-redux';
import { getProfile, updateProfile, setClear, setError} from '@store/reducers/manage/profile/actions';
/* Models */
import { RootState, Profile } from '@common/models/Interfaces';
/* Components */
import View from './View';

const mapStateToProps = (state: RootState) => ({
    loading: state.profiles.loading,
    error: state.profiles.error,
    profile: state.profiles.profile as Profile
});

const mapDispatchToProps = {
    getProfile,
    setClear,
    setError,
    updateProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ProfilePageProps = ConnectedProps<typeof connector>;

export default connector(View);
