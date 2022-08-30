import React from 'react';
import { Profile } from '@common/models/Interfaces';
/* Components */
import Spinner from '@components/controls/Spinner';
export interface ProfileViewProps {
    loading?: boolean;
    profile?: Profile;
}

const View: React.FunctionComponent<ProfileViewProps> = ({ loading, profile }) => {
    return (
        <Spinner loading={loading}>
            <div>
                <div style={{ maxWidth: 500 }}>
                    <h1>My Profile</h1>
                    <div className="py-3" />
                    <Spinner loading={loading}>
                        <div>{JSON.stringify(profile)}</div>
                    </Spinner>
                </div>
            </div>
        </Spinner>
    );
};

export default View;
