import React from 'react';

const TableFooter = ({
    page,
    count,
    itemsPerPage,
    changePage,
    changeCountPerPage
}) => {

    return (
        <div>
            <button>Prev page</button>
            <div>Current page: {page}</div>
            <button>Next page</button>
        </div>
    );
};

export default TableFooter;