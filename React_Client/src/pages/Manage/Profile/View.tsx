import React, { useEffect, useState } from 'react';
import some from 'lodash/some';
/* From state */
import { getUserId } from '@store/localStorage';
/* Props */
import { ProfilePageProps } from '.';
/* Components */
import Container from '@components/Container';
import Alert from '@components/Alert';
import ProfileForm, { ProfileProps } from './components/Form';

const View: React.FunctionComponent<ProfilePageProps> = ({
    error,
    loading,
    profile,
    getProfile,
    updateProfile,
    setClear,
    setError
}) => {
    const [profileProps, setProfileProps] = useState<ProfileProps>({});

    useEffect(() => {
        getProfile(getUserId());
        return () => {
            setClear();
        };
    }, []);

    useEffect(() => {
        setProfileProps({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            middleName: profile.middleName,
            pictureUrl: profile.pictureUrl,
            birthDate: profile.birthDate,
            phone: profile.phone,
            address1: profile.address1,
            address2: profile.address2,
            city: profile.city,
            stateCode: profile.stateCode,
            countryCode: profile.countryCode,
            postalCode: profile.postalCode
        });
    }, [profile]);

    const handleSubmit = (values: ProfileProps) => {
        updateProfile({
            ...values,
            profileId: profile.profileId as string
        });
    };
    const hasError = some(error);
    return (
        <Container title="My Profile">
            <div className="mx-auto" style={{ maxWidth: 500 }}>
                <h1>My Profile</h1>
                <div className="py-3" />
                {hasError && <Alert type="alert-danger">{error.message}</Alert>}
                <ProfileForm
                    loading={loading}
                    profile={profileProps}
                    onSubmit={handleSubmit}
                    onError={setError}
                />
            </div>
        </Container>
    );
};

export default View;
