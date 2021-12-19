import React from 'react';
import './tableFooter.scss';

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
        <div className="footer-container">
            <div className="btn-group">
                <button
                    onClick={() => changePage(0)}
                    disabled={page === 0}
                    className="btn-footer"
                >
                    {`<<`}
                </button>
                <button
                    onClick={() => changePage(page - 1)}
                    disabled={page === 0}
                    className="btn-footer"
                >
                    {`<`}
                </button>
            </div>
            <div>
                <div className="page-params">
                    <div className="current-page">
                        Current page: {page + 1} of {pageCount}
                    </div>

                    <span className="items-per-page">items per page:</span>
                    <select
                        name="change-items-count"
                        // id="select-change-items-count"
                        onChange={(event) => {
                            changeCountPerPage(event.target.value)
                        }}
                        value={itemsPerPage}
                    >
                        {itemsOnPageCount.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                </div>

            </div>
            <div className="btn-group">
                <button
                    onClick={() => changePage(page + 1)}
                    disabled={page === pageCount - 1}
                    className="btn-footer"
                >
                    {`>`}
                </button>
                <button
                    onClick={() => changePage(pageCount - 1)}
                    disabled={page === pageCount - 1}
                    className="btn-footer"
                >
                    {`>>`}
                </button>
            </div>
        </div>
    );
};

export default TableFooter;