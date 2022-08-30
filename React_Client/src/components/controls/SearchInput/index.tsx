import React from 'react';

interface SearchInputProps {
    onSearch: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({ onSearch }) => {
    return (
        <div
            className="mb-3 input-group-search"
            style={{
                minWidth: 300,
                maxWidth: 350,
                marginLeft: 'auto'
            }}
        >
            <i className="material-icons dp48 search-icon">search</i>
            <input
                type="text"
                className="form-control"
                placeholder="Keywords"
                aria-label="Search by keywords"
                aria-describedby="search-by-keywords"
                onChange={onSearch}
            />
        </div>
    );
};

export default SearchInput;
