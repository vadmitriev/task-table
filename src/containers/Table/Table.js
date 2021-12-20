import React, { useEffect, useRef, useState, useCallback } from 'react';
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
        ref: useRef(),
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
    minCellWidth = 50,
}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement = useRef(null);

    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = (name) => {
        const prefix = 'fa fa-fw fa-sort';

        const checkDirection = (direction) => {
            return direction === 'asc'
                ? `${prefix}-asc`
                : `${prefix}-desc`;
        };

        if (!sortConfig) {
            return prefix;
        }
        return sortConfig.key === name
            ? checkDirection(sortConfig.direction)
            : prefix;
    };

    const columns = createHeaders(headers, requestSort, onHeaderClick, getClassNamesFor);

    const mouseDown = (index) => {
        setActiveIndex(index);
    };

    const mouseMove = useCallback(
        (e) => {
            const gridColumns = columns.map((col, i) => {
                if (i === activeIndex) {
                    const width = e.clientX - col.ref.current.offsetLeft;

                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
        },
        [activeIndex, columns, minCellWidth]
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <ScrollContainer
                    className="scroll-container"
                    onClick={(event) => {
                        selectTextInElement(event.target);
                    }}
                >
                    <table className="resizeable-table" ref={tableElement}>
                        <thead>
                            <tr>
                                {columns.map(({ id, ref, content }, i) => (
                                    <th ref={ref} key={id}>
                                        <div>{content}</div>
                                        <div
                                            // style={{ height: tableHeight }}
                                            onMouseDown={() => mouseDown(i)}
                                            className={`resize-handle ${
                                                activeIndex === i ? "active" : "idle"
                                            }`}
                                        />
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
                                            )
                                        })}
                                        <td>{user.totalHours}</td>
                                    </tr>
                                )
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