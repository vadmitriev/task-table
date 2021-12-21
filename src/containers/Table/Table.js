import React from 'react';
import TableFooter from 'containers/Table/TableFooter/TableFooter';
import ScrollContainer from 'react-indiana-drag-scroll';
import { selectTextInElement } from 'utils/utils';
import useSortableData from 'hooks/useSortableData';

import './table.scss';

const createHeaders = (
    headers,
    sortFn,
    onHeaderClick,
    getSortClassNames,
) => {
    return headers.map((item) => ({
        id: item.id,
        content: (
            <>
                <span
                    onClick={(event) => {
                        onHeaderClick(event.target.textContent)
                    }}
                >
                    {item.text}
                </span>
                <span
                    onClick={() => sortFn(item.id)}
                >
                    <i className={getSortClassNames(item.id)} />
                </span>
            </>
        )
    }));
};


const Table = ({
    data,
    headers,
    onHeaderClick,
    page,
    itemsPerPage,
    pageCount,
    changePage,
    changeItemsCount,
}) => {
    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = (name) => {
        const prefix = 'fa fa-fw fa-sort';

        const checkDirection = (direction) => {
            return `${prefix}-${direction}`;
        };

        if (!sortConfig || sortConfig.key !== name) {
            return prefix;
        }

        return checkDirection(sortConfig.direction);
    };

    const columns = createHeaders(headers, requestSort, onHeaderClick, getClassNamesFor);

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <ScrollContainer
                    className="scroll-container"
                    onClick={(event) => {
                        selectTextInElement(event.target);
                    }}
                >
                    <table>
                        <thead>
                            <tr>
                                {columns.map(({ id, content }) => (
                                    <th key={id}>
                                        <div>{content}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        {user.days.map((hour, idx) => {
                                            return (
                                                <td key={`${user.id}-${idx}-${hour}`}>
                                                    {hour}
                                                </td>
                                            );
                                        })}
                                        <td>{user.totalHours}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </ScrollContainer>
            </div>
            <div className="table-footer">
                <TableFooter
                    page={page}
                    itemsPerPage={itemsPerPage}
                    pageCount={pageCount}
                    changePage={(targetPage) => changePage(targetPage)}
                    changeCountPerPage={(c) => changeItemsCount(c)}
                />
            </div>
        </div>
    );
};

export default Table;