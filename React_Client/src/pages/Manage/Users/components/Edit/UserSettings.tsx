import React, { useEffect } from 'react';
import { FormikProps, useFormik } from 'formik';
import { OtherProps } from '.';
import { User } from '@src/common/models';

interface UserSettingsProps {
    user: User;
}

const UserSettings = React.forwardRef(
    ({ user }: UserSettingsProps, ref: React.Ref<FormikProps<OtherProps>>) => {
        const formik = useFormik<OtherProps>({
            initialValues: {},
            innerRef: ref,
            onSubmit: console.log
        });
        useEffect(() => {
            formik.setValues({
                lockoutEnabled: user.lockoutEnabled,
                emailConfirmed: user.emailConfirmed,
                phoneNumberConfirmed: user.phoneNumberConfirmed,
                twoFactorEnabled: user.twoFactorEnabled
            });
        }, [user]);
        return (
            <form className="form-horizontal" onSubmit={formik.handleSubmit}>
                <div className="form-group py-1">
                    <div className="form-check">
                        <input
                            id="lockoutEnabled"
                            name="lockoutEnabled"
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={formik.values.lockoutEnabled}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="lockoutEnabled" className="form-check-label">
                            Lockout Enabled
                        </label>
                    </div>
                </div>
                <div className="form-group py-1">
                    <div className="form-check">
                        <input
                            id="emailConfirmed"
                            name="emailConfirmed"
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={formik.values.emailConfirmed}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="emailConfirmed" className="form-check-label">
                            Email Confirmed
                        </label>
                    </div>
                </div>

                <div className="form-group py-1">
                    <div className="form-check">
                        <input
                            id="phoneNumberConfirmed"
                            name="phoneNumberConfirmed"
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={formik.values.phoneNumberConfirmed}
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="phoneNumberConfirmed"
                            className="form-check-label"
                        >
                            Phone Number Confirmed
                        </label>
                    </div>
                </div>
                <div className="form-group py-1">
                    <div className="form-check">
                        <input
                            id="twoFactorEnabled"
                            name="twoFactorEnabled"
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={formik.values.twoFactorEnabled}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="twoFactorEnabled" className="form-check-label">
                            Two Factor Enabled
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="invisible" />
                </div>
            </form>
        );
    }
);

export default UserSettings;
