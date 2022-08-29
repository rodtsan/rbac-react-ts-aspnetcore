import React, { useEffect, useState, useMemo } from 'react';
import { debounce, isEmpty, some } from 'lodash';
import { Paging, User } from '@common/models/Interfaces';
import { UsersPageProps } from '.';
/**  Components */
import Container from '@components/Container';
import Pagination from '@components/Pagination';
import SearchInput from '@components/SearchInput';
import Table from './components/Table';
import Modal from '@src/components/Modal';
import EditUser, { UserFormProps } from './components/Edit';

const View: React.FunctionComponent<UsersPageProps> = ({
    loading,
    paging,
    userRoles,
    error,
    getUsersPerPage,
    setPaging,
    getUserRoles,
    addUserRoles,
    setUserRoles,
    updateUser,
    deleteUser: deleteUserEpic,
    setClear
}) => {
    const [params, setParams] = useState<Paging>({
        page: 1,
        pageSize: 10,
        recordCount: 0,
        orderBy: '',
        keywords: '',
        deleted: false
    });

    const [selectedUser, setSelectedUser] = useState<User>({});
    const [deleteUser, setDeleteUser] = useState<User>({});

    useEffect(() => {
        getUsersPerPage(params);
    }, [params]);

    useEffect(() => {
        return () => {
            setClear();
        };
    }, []);

    useEffect(() => {
        if (selectedUser && selectedUser?.userId) {
            getUserRoles(selectedUser.userId);
        }
        return () => {
            setUserRoles([]);
        };
    }, [selectedUser]);

    const onPageChange = (page: number) =>
        setParams((prevState: Paging) => {
            return {
                ...prevState,
                page
            };
        });

    const handleEdit = (user: User) => {
        setSelectedUser(user);
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSelectedUser({});
        setUserRoles([]);
        event.preventDefault();
    };

    const handleUpdate = (otherProps: UserFormProps) => {
        updateUser({
            userId: selectedUser?.userId as string,
            ...otherProps
        });
        setSelectedUser({});
        setUserRoles([]);
    };

    const handleSort = (orderBy: string) => {
        setParams((prevState: Paging) => {
            return {
                ...prevState,
                page: 1,
                orderBy
            };
        });
    };

    const handleShowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setParams((prevState: Paging) => {
            return {
                ...prevState,
                page: 1,
                deleted: checked
            };
        });
    };

    const handleDelete = (record: User) => {
        setDeleteUser({
            ...record,
            deleted: true
        });
    };

    const handleDeleteCancelClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setDeleteUser({});
        event.preventDefault();
    };

    const handleDeleteClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (deleteUser && deleteUser.userId) deleteUserEpic(deleteUser.userId);
        setDeleteUser({});
        event.preventDefault();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setParams((prevState: Paging) => {
            return {
                ...prevState,
                page: 1,
                keywords: value
            };
        });
    };

    const debounceHandleSearch = useMemo(() => debounce(handleSearchChange, 500), []);
    const isEditUserVisible = userRoles && some(userRoles);
    const isDeleteUserVisible = deleteUser && some(deleteUser);
    const isLoading = isEmpty(selectedUser) && loading;
    const paginationProps = {
        page: params.page,
        pageSize: paging.pageSize,
        siblingCount: 3,
        recordCount: paging.recordCount,
        onPageChange
    };

    return (
        <Container title="Manage Users">
            {isDeleteUserVisible && (
                <Modal
                    visible={isDeleteUserVisible}
                    title="Delete User"
                    okText="Yes"
                    onCancel={handleDeleteCancelClick}
                    onOk={handleDeleteClick}
                >
                    <p>
                        Are you sure you want to {deleteUser.deleted ? 'permanently' : ''}
                        delete {deleteUser?.firstName} {deleteUser?.lastName}?
                    </p>
                </Modal>
            )}
            {isEditUserVisible && (
                <EditUser
                    user={selectedUser}
                    userRoles={userRoles}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                />
            )}
            <div className="mx-auto">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Manage Users</h2>
                        <div className="py-3" />
                    </div>
                    <div className="col-md-4 text-right">
                        <SearchInput onSearch={debounceHandleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex p-2 justify-content-end">
                            <span className="d-inline-block form-check">
                                <input
                                    id="deletedUsers"
                                    name="deletedUsers"
                                    type="checkbox"
                                    className="form-check-input"
                                    defaultChecked={params.deleted}
                                    onChange={handleShowChange}
                                />
                                <label
                                    htmlFor="deletedUsers"
                                    className="form-check-label"
                                >
                                    Show Deleted
                                </label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table
                            loading={isLoading}
                            records={paging.records}
                            sortValue={params.orderBy}
                            onEdit={handleEdit}
                            onSort={handleSort}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-12 d-flex justify-content-end">
                        <Pagination {...paginationProps} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default View;
