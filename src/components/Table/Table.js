import React, {useEffect, useRef, useState} from 'react';
import TableFooter from 'components/Table/TableFooter/TableFooter';
import ScrollContainer from 'react-indiana-drag-scroll';
import { selectTextInElement } from 'utils/utils';
import useSortableData from 'hooks/useSortableData';

import './table.scss';

const Table = ({
   data,
   onHeaderClick,
   page,
   itemsPerPage,
   pageCount,
   changePage,
   changeItemsCount,
}) => {
    const dayNumbers = Array.from({length: 31}, (x, i) => i + 1);

    const calcHours = ({Start, End}) => {
        const start = new Date().setHours(Start.split('-')[0], Start.split('-')[1]);
        const end = new Date().setHours(End.split('-')[0], End.split('-')[1]);

        return Math.ceil((end - start) / 1000 / 60 / 24 * 10) / 10;
    };

    const calcTotalHours = (days) => {
        const userHours = days.reduce((acc, current) => {
            return acc + Number(current);
        }, 0)

        return Math.round(userHours * 10) / 10;
    };

    const calcDays = (days) => {
        return dayNumbers.map((dayNumber) => {
            const idx = days.findIndex((day) => {
                return Number(day.Date.slice(day.Date.length - 2)) === Number(dayNumber);
            });
            if (idx === -1) {
                return 0;
            }
            return calcHours(days[idx]);
        });
    };
    const transformUserData = (userData) => {
        return userData.map((user) => {
            const days = calcDays(user.Days);
            const totalHours = calcTotalHours(days);

            return {
                id: user.id,
                name: user.Fullname,
                days,
                totalHours,
                ...days.map((val) => val),
            }
        });
    };

    const { items, requestSort, sortConfig } = useSortableData(transformUserData(data));

    const getClassNamesFor = (name) => {
        const checkDirection = (direction) => {
            return direction === 'asc'
                ? 'fa fa-fw fa-sort-asc'
                : 'fa fa-fw fa-sort-desc';
        };

        if (!sortConfig) {
            return 'fa fa-fw fa-sort';
        }
        return sortConfig.key === name
            ? checkDirection(sortConfig.direction)
            : 'fa fa-fw fa-sort';
    };

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <ScrollContainer
                    className="scroll-container"
                    onClick={(event) => {
                        selectTextInElement(event.target);
                        event.stopPropagation()
                    }}
                    hideScrollbars={true}
                >
                    <table>
                        <thead>
                        <tr>
                            <th
                                onClick={() => requestSort('name')}
                            >
                                <span>User</span>
                                <span>
                                    <i className={getClassNamesFor('name')}/>
                                </span>
                            </th>
                            {dayNumbers.map((day) => (
                                <th
                                    key={day}
                                >
                                    <span
                                          onClick={(event) => {
                                              onHeaderClick(event.target.textContent)
                                          }}
                                    >
                                        {day}
                                    </span>
                                    <span
                                        onClick={() => requestSort(day-1)}
                                    >
                                        <i className={getClassNamesFor(day-1)}/>
                                    </span>
                                </th>
                            ))}
                            <th
                                onClick={() => requestSort('totalHours')}
                            >
                                <span>
                                    Monthly total
                                </span>
                                <span>
                                    <i className={getClassNamesFor('totalHours')}/>
                                </span>
                            </th>
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