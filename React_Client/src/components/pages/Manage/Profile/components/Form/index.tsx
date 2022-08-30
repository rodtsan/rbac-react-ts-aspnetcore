import React, { useEffect, useRef, useState } from 'react';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { useFormik } from 'formik';
import { Country, State, City } from 'country-state-city/lib';
import { isEqual } from 'lodash';
import { Profile } from '@common/models/Interfaces';
import { ProfileValidationSchema } from '@common/models/ValidationShemas';
/* Components */
import ImageCropper, { ImageProps } from '@components/controls/ImageCropper';
import Spinner from '@components/controls/Spinner';
import { FBS_PROFILE_IMAGES_PATH, FBS_BASEURL } from '@common/appSettings';

const firebaseStorage = getStorage();

export interface ProfileProps extends Profile {}

export interface ProfileFormProps {
    loading: boolean;
    profile: ProfileProps;
    onSubmit: (values: ProfileProps) => void;
    onError: (error: Error) => void;
}

const ProfileForm: React.FunctionComponent<ProfileFormProps> = ({
    loading,
    profile,
    onSubmit,
    onError
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pictureRef = useRef<HTMLImageElement>(null);
    const countries = Country.getAllCountries();
    const formik = useFormik<ProfileProps>({
        initialValues: {
            city: '',
            stateCode: '',
            countryCode: ''
        },
        validationSchema: ProfileValidationSchema,
        validateOnBlur: true,
        onSubmit
    });

    useEffect(() => {
        formik.setValues(profile);
    }, [profile]);

    const handlePictureClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setVisible(true);
        event.preventDefault();
        event.stopPropagation();
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setVisible(false);
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDone = (image: ImageProps) => {
        if (Object.keys(image).length > 2) {
            var base64result = image.data?.split(',')[1];
            try {
                setIsLoading(true);
                const fsRef = ref(
                    firebaseStorage,
                    String(FBS_PROFILE_IMAGES_PATH)
                        .concat(profile.profileId as string)
                        .concat('_')
                        .concat(image?.name!)
                );
                uploadString(fsRef, base64result!, 'base64', {
                    contentType: image.type
                })
                    .then((snapshot) => {
                        formik.setValues((prevState) => {
                            return {
                                ...prevState,
                                pictureUrl: String(FBS_BASEURL)
                                    .concat(encodeURIComponent(snapshot.ref.fullPath))
                                    .concat('?alt=media')
                            };
                        });
                    })
                    .catch(onError)
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (error) {
                onError(error as Error);
            } finally {
                setIsLoading(false);
            }
        }
        setVisible(false);
    };

    const isDisabled = isEqual(profile, formik.values);

    return (
        <div>
            {visible && (
                <ImageCropper
                    visible={visible}
                    imageSource={pictureRef?.current?.src || ''}
                    onDone={handleDone}
                    onCancel={handleCancel}
                />
            )}
            <Spinner loading={loading || isLoading}>
                <form onSubmit={formik.handleSubmit} className="form-horizontal">
                    <div className="form-group text-center">
                        <div>
                            <img
                                ref={pictureRef}
                                src={formik.values.pictureUrl}
                                className="img-thumbnail img-profile"
                            />
                            <div className="py-3" />
                            <button onClick={handlePictureClick}>Change Picture</button>
                            <div className="py-4" />
                        </div>
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            defaultValue={formik.values.firstName}
                            onChange={formik.handleChange('firstName')}
                            className="form-control"
                            required
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <p className="error text-danger">{formik.errors.firstName}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            defaultValue={formik.values.lastName}
                            onChange={formik.handleChange('lastName')}
                            className="form-control"
                            required
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="error text-danger">{formik.errors.lastName}</p>
                        )}
                    </div>
                    <div className="p-10"></div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            defaultValue={formik.values.email}
                            className="form-control"
                            disabled
                        />
                    </div>
                    <div className="py-3" />
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            defaultValue={formik.values.phone}
                            onChange={formik.handleChange}
                            className="form-control"
                            maxLength={18}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="error text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="address1">
                            Address 1
                        </label>
                        <input
                            id="address1"
                            name="address1"
                            defaultValue={formik.values.address1}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.touched.address1 && formik.errors.address1 && (
                            <p className="error text-danger">{formik.errors.address1}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="address2">
                            Address 2
                        </label>
                        <input
                            id="address2"
                            name="address2"
                            defaultValue={formik.values.address2}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                        {formik.touched.address2 && formik.errors.address2 && (
                            <p className="error text-danger">{formik.errors.address2}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="countryCode">
                            Country
                        </label>
                        <select
                            id="countryCode"
                            name="countryCode"
                            value={formik.values.countryCode}
                            className="form-select form-select-md"
                            aria-label=".form-select-lg example"
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldValue('stateCode', '')}
                        >
                            <option value="">Select your country</option>
                            {countries.map((c) => (
                                <option key={c.isoCode} value={c.isoCode}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.countryCode && formik.errors.countryCode && (
                            <p className="error text-danger">
                                {formik.errors.countryCode}
                            </p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="stateCode">
                            State
                        </label>
                        <select
                            id="stateCode"
                            name="stateCode"
                            value={formik.values.stateCode}
                            className="form-select form-select-md"
                            aria-label=".form-select-lg example"
                            placeholder="Select your state"
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldValue('city', '')}
                        >
                            <option value="">Select your state</option>
                            {State.getStatesOfCountry(formik.values.countryCode).map(
                                (s) => (
                                    <option key={s.isoCode} value={s.isoCode}>
                                        {s.name}
                                    </option>
                                )
                            )}
                        </select>
                        {formik.touched.stateCode && formik.errors.stateCode && (
                            <p className="error text-danger">{formik.errors.stateCode}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="city">
                            City
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formik.values.city}
                            className="form-select form-select-md"
                            aria-label=".form-select-lg example"
                            placeholder="Select your city"
                            onChange={formik.handleChange}
                        >
                            {City.getCitiesOfState(
                                formik.values.countryCode as string,
                                formik.values.stateCode as string
                            ).map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.city && formik.errors.city && (
                            <p className="error text-danger">{formik.errors.city}</p>
                        )}
                    </div>
                    <div className="form-group py-2">
                        <label className="form-label" htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            defaultValue={formik.values.postalCode}
                            onChange={formik.handleChange}
                            className="form-control"
                            maxLength={8}
                        />
                        {formik.touched.postalCode && formik.errors.postalCode && (
                            <p className="error text-danger">
                                {formik.errors.postalCode}
                            </p>
                        )}
                    </div>
                    <div
                        className="form-group"
                        style={{ padding: 50, textAlign: 'center' }}
                    >
                        <button
                            className="btn btn-primary ms-auto w-50"
                            type="submit"
                            disabled={isDisabled}
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </Spinner>
        </div>
    );
};

export { ProfileProps };

export default ProfileForm;
