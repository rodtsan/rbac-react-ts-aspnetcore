import React from 'react';
import moment from 'moment';
import { Role } from '@common/models/Interfaces';
/* Components */
import Spinner from '@components/Spinner';
import SortColumn from '@components/SortColumn';
import EmptyState from '@components/EmptyState';

export interface RolesTableProps {
    loading: boolean;
    records?: Role[];
    sortValue?: string;
    onSort?: (columnKey: string) => void;
    onEdit?: (record: Role) => void;
}

const Table: React.FunctionComponent<RolesTableProps> = ({
    records,
    loading,
    sortValue,
    onEdit,
    onSort
}) => {
    const handleEdit =
        (record: Role) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (onEdit) onEdit(record);
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
                                sortKey="name"
                                sortValue={sortValue}
                                onSort={onSort}
                            >
                                Name
                            </SortColumn>
                        </th>
                        <th scope="col">
                            <SortColumn
                                sortKey="description"
                                sortValue={sortValue}
                                onSort={onSort}
                            >
                                Description
                            </SortColumn>
                        </th>
                        <th scope="col" className="text-center">
                            Users
                        </th>
                        <th scope="col">Date Created</th>
                        <th scope="col" style={{ width: 150 }}>
                            Operations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {records && records?.length > 0 ? (
                        <>
                            {records?.map((record, key) => (
                                <tr key={key}>
                                    <th scope="row">
                                        <span className="">{key + 1}</span>
                                    </th>
                                    <td>{record.name}</td>
                                    <td>{record.description}</td>
                                    <td className="text-center">{record.usersCount}</td>
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
                                            className="delete p-2 disabled"
                                            title="Delete"
                                            data-toggle="tooltip"
                                            role="button"
                                        >
                                            <i className="material-icons">&#xE872;</i>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ height: 300 }}>
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
