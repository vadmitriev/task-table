import React from 'react';
import { debounce } from 'utils/utils'
import './filter.scss';

const Filter = ({onChange, text = 'Filter by name' }) => {
    onChange = debounce(onChange, 500);

    return (
        <div className="filter-container">
            <label htmlFor="input" className="filter-label">
                {text}
            </label>
            <input
                type="text"
                id="filter"
                className="filter-input"
                onChange={(event) => {
                    onChange(event.target.value)
                }}
            />
        </div>
    );
};

export default Filter;