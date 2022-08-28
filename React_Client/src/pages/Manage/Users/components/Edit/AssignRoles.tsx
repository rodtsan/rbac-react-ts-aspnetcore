import { UserRole } from '@src/common/models';
import React from 'react';

interface AssignRolesProps {
    roles?: UserRole[];
    onChange: (roleId: string, checked: boolean) => void;
}

const AssignRoles: React.FunctionComponent<AssignRolesProps> = ({ roles, onChange }) => {
    const handleChange =
        (roleId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(roleId, event.target.checked);
        };
    return (
        <table className="table table-bordered table-hover">
            <thead className="table-light">
                <tr>
                    <th scope="col" style={{ width: 40 }}>
                        #
                    </th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {roles?.map((record, key: number) => (
                    <tr key={key}>
                        <th scope="row" className="text-center">
                            <span className="">
                                <input
                                    name="userRoles"
                                    type="checkbox"
                                    defaultChecked={record.selected}
                                    value={record.roleId}
                                    onChange={handleChange(record.roleId)}
                                />
                            </span>
                        </th>
                        <th scope="row">{record.name}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssignRoles;
