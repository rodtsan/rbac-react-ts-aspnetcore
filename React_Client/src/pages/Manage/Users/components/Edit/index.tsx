import React, { useEffect } from 'react';
import { isEqual, some } from 'lodash';
import { UserRole, User } from '@common/models';
/* Components */
import Modal from '@components/Modal';
import Tabs from '@src/components/Tabs';
import { FormikProps, useFormik } from 'formik';
import AssignRoles from './AssignRoles';
import UserSettings from './UserSettings';

export interface EditUserProps {
    user: User;
    userRoles?: UserRole[];
    onUpdate: (props: OtherProps) => void;
    onCancel: React.MouseEventHandler<HTMLButtonElement>;
}

export interface OtherProps {
    lockoutEnabled?: boolean;
    emailConfirmed?: boolean;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    roles?: string[];
}

const EditUser: React.FunctionComponent<EditUserProps> = ({
    user,
    userRoles,
    onUpdate,
    onCancel
}) => {
    const formikRef = React.useRef<FormikProps<OtherProps>>(null);
    const [selectedRoles, setSelectedRoles] = React.useState<UserRole[] | undefined>(
        userRoles
    );
    const [tabKey, setTabKey] = React.useState<React.Key>('roles');

    useEffect(() => {
        setSelectedRoles(userRoles);
        return () => {
            setSelectedRoles([]);
            setTabKey('roles');
        };
    }, [userRoles]);

    const isRolesEqual = (other?: UserRole[]): boolean => {
        return isEqual(userRoles, other);
    };

    const isOtherEqual = (other?: OtherProps): boolean => {
        const userProps = {
            lockoutEnabled: user.lockoutEnabled,
            emailConfirmed: user.emailConfirmed,
            phoneNumberConfirmed: user.phoneNumberConfirmed,
            twoFactorEnabled: user.twoFactorEnabled
        };
        return isEqual(userProps, other);
    };

    const handleChange = (roleId: string, checked: boolean) => {
        setSelectedRoles((prevState) => {
            return prevState?.map((role) => {
                if (role.roleId === roleId) {
                    return {
                        ...role,
                        selected: checked
                    };
                }
                return role;
            });
        });
    };

    const handleOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const roles = selectedRoles
            ?.filter((r) => r.selected)
            .map((r) => String(r.roleId));

        onUpdate({
            ...formikRef.current?.values,
            roles
        });
        event.preventDefault();
    };

    const handleTabClick = (key: React.Key) => {
        setTabKey(key);
    };

    const title = String(user.firstName)
        .concat(' ')
        .concat(user.lastName as string);
    const isDisabled =
        isRolesEqual(selectedRoles) && isOtherEqual(formikRef.current?.values);

    return (
        <Modal
            title={title}
            visible={true}
            disabled={isDisabled}
            okText="Update"
            onOk={handleOk}
            onCancel={onCancel}
        >
            <div className="row">
                <div className="col-12">
                    <Tabs
                        key="assignRolesOrUpdate"
                        activeKey={tabKey}
                        onClick={handleTabClick}
                    >
                        <Tabs.Pane key="roles" tab="Assign Roles">
                            <AssignRoles roles={selectedRoles} onChange={handleChange} />
                        </Tabs.Pane>
                        <Tabs.Pane key="users" tab="User Settings">
                            <UserSettings user={user} ref={formikRef} />
                        </Tabs.Pane>
                        <Tabs.Pane key="claims" tab="User Claims">
                            {JSON.stringify(formikRef.current?.initialValues)}
                        </Tabs.Pane>
                    </Tabs>
                </div>
            </div>
        </Modal>
    );
};

export default EditUser;
