import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { Paging, Role } from '@common/models/Interfaces';
import { RolesPageProps } from './';
/* Components*/
import Container from '@components/controls/Container';
import Pagination from '@components/controls/Pagination';
import Table from './components/Table';
import SearchInput from '@components/controls/SearchInput';

const View: React.FunctionComponent<RolesPageProps> = ({
    loading,
    paging,
    error,
    getRolesPerPage,
    setClear
}) => {
    const [params, setParams] = useState<Paging>({
        page: 1,
        pageSize: 10,
        recordCount: 0,
        orderBy: '',
        keywords: ''
    });

    useEffect(() => {
        return () => {
          setClear();
        }
    }, []);

    useEffect(() => {
        getRolesPerPage(params);
    }, [params]);

    const onPageChange = (page: number) =>
        setParams((prevState) => {
            return {
                ...prevState,
                page
            };
        });
    const handleEdit = (role: Role) => {
        console.log(role);
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setParams((prevState: Paging) => {
            return {
                ...prevState,
                page: 1,
                keywords: value
            };
        });
    };

    const debounceHandleSearch = useMemo(() => debounce(handleSearch, 500), []);

    const paginationProps = {
        page: params.page,
        pageSize: paging.pageSize,
        siblingCount: 3,
        recordCount: paging.recordCount,
        onPageChange
    };

    return (
        <Container title="Manage Roles">
            <div className="mx-auto">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Manage Roles</h2>
                        <div className="py-3" />
                    </div>
                    <div className="col-md-4 text-right">
                        <SearchInput onSearch={debounceHandleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table
                            loading={loading}
                            records={paging.records}
                            sortValue={params.orderBy}
                            onEdit={handleEdit}
                            onSort={handleSort}
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
