import React from 'react';

const itemsOnPageCount = [5, 10, 15, 20];

const TableFooter = ({
    page,
    pageCount,
    count,
    itemsPerPage,
    changePage,
    changeCountPerPage
}) => {


    return (
        <div className="d-flex justify-content-center">
            <button
                onClick={() => changePage(0)}
                disabled={page === 0}
            >
                {`<<`}
            </button>
            <button
                onClick={() => changePage(page - 1)}
                disabled={page === 0}
            >
                {`<`}
            </button>
            <div>
                <div className="m-1">
                    itemsPerPage: {itemsPerPage}
                    <select
                        name="change-items-count"
                        id="select-change-items-count"
                        onChange={(event) => {
                            changeCountPerPage(event.target.value)
                        }}
                        value={itemsPerPage}
                    >
                        {itemsOnPageCount.map((c) => (
                            <option
                                key={c}
                                value={c}
                                selected={c === count}
                            >
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <div>Current page: {page + 1} of {pageCount}</div>
            </div>

            <button
                onClick={() => changePage(page + 1)}
                disabled={page === count}
            >
                {`>`}
            </button>
            <button
                onClick={() => changePage(pageCount)}
                disabled={page === pageCount}
            >
                {`>>`}
            </button>
        </div>
    );
};

export default TableFooter;