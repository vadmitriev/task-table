import React from 'react';

const Filter = ({onChange}) => {
    return (
        <div>
            <input
                type="text"
                onChange={onChange}
            />
        </div>
    );
};

export default Filter;