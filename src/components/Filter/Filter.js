import React from 'react';
import './filter.scss';

const Filter = ({onChange, text = 'Filter by name' }) => {
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