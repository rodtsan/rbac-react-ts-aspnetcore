import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { yesOrNo } from '@common/utils/methods';
import { User } from '@common/models/Interfaces';
/* Components */
import Spinner from '@components/Spinner';
import SortColumn from '@components/SortColumn';
import EmptyState from '@components/EmptyState';

export interface UsersTableProps {
    loading: boolean;
    records?: User[];
    sortValue?: string;
    onSort?: (columnKey: string) => void;
    onEdit?: (record: User) => void;
    onDelete?: (record: User) => void;
}

const Table: React.FunctionComponent<UsersTableProps> = ({
    records,
    loading,
    sortValue,
    onEdit,
    onDelete,
    onSort
}) => {
    const handleEdit =
        (record: User) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (onEdit) onEdit(record);
            event.preventDefault();
        };
    const handleDelete =
        (record: User) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (onDelete) onDelete(record);
            event.preventDefault();
        };
    return (
        <Spinner loading={loading}>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col" style={{ width: 60 }}>
                            #
                        </th>
                        <th scope="col">
                            <SortColumn
                                sortKey="firstName"
                                sortValue={sortValue}
                                onSort={onSort}
                            >
                                First Name
                            </SortColumn>
                        </th>
                        <th scope="col">
                            <SortColumn
                                sortKey="lastName"
                                sortValue={sortValue}
                                onSort={onSort}
                            >
                                Last Name
                            </SortColumn>
                        </th>
                        <th scope="col">
                            <SortColumn
                                sortKey="email"
                                sortValue={sortValue}
                                onSort={onSort}
                            >
                                Email
                            </SortColumn>
                        </th>
                        <th scope="col" className="text-center">
                            Confirmed
                        </th>
                        <th scope="col" className="text-center">
                            Lockout Enabled
                        </th>
                        <th scope="col">Lockout End</th>
                        <th scope="col">Roles</th>
                        <th scope="col">Date Joined</th>
                        <th scope="col" style={{ width: 150 }}>
                            Operations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {records && records?.length > 0 ? (
                        <>
                            {records.map((record, key: number) => (
                                <tr key={key}>
                                    <th scope="row">
                                        <span className="">{key + 1}</span>
                                    </th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.email}</td>
                                    <td className="text-center">
                                        {yesOrNo(record.emailConfirmed)}
                                    </td>
                                    <td className="text-center">
                                        {yesOrNo(record.lockoutEnabled)}
                                    </td>
                                    <td>
                                        {moment(record.lockoutEnd).isValid() &&
                                            moment(record.lockoutEnd).format(
                                                'YYYY-MM-DD'
                                            )}
                                    </td>
                                    <td>{record.roles?.join(',')}</td>
                                    <td>
                                        {moment(record.createdWhen).format('YYYY-MM-DD')}
                                    </td>
                                    <td>
                                        <span
                                            className="add p-2 disabled"
                                            title="Add"
                                            data-toggle="tooltip"
                                            role="button"
                                        >
                                            <i className="material-icons">&#xE03B;</i>
                                        </span>
                                        <span
                                            className="edit p-2"
                                            title="Edit"
                                            data-toggle="tooltip"
                                            role="button"
                                            onClick={handleEdit(record)}
                                        >
                                            <i className="material-icons">&#xE254;</i>
                                        </span>
                                        <span
                                            className={classNames('delete p-2', {
                                                disabled: record.deleted
                                            })}
                                            title="Delete"
                                            data-toggle="tooltip"
                                            role="button"
                                            aria-disabled={record.deleted}
                                            onClick={handleDelete(record)}
                                        >
                                            <i className="material-icons">&#xE872;</i>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={10} style={{ height: 300 }}>
                                {!loading && (
                                    <EmptyState>No records available.</EmptyState>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Spinner>
    );
};

export default Table;
