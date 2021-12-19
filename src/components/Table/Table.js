import React, {useEffect, useRef, useState} from 'react';
import TableFooter from 'components/Table/TableFooter/TableFooter';
import ScrollContainer from 'react-indiana-drag-scroll';
import './table.scss';
import {selectTextInElement} from 'utils/utils';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item,
        ref: useRef(),
    }));
}

const Table = ({
   data,
   onHeaderClick,
   page,
   itemsPerPage,
   count,
   pageCount,
   changePage,
   changeItemsCount,
}) => {
    const [processedData, setProcessedData] = useState([]);


    const dayNumbers = Array.from({length: 31}, (x, i) => i + 1);

    // const columns = createHeaders(dayNumbers);

    const minCellWidth = 10;

    // const onMouseDown = (event) => {
    //   setScroll({
    //       ...scroll,
    //       isScrolling: true,
    //       clientX: event.clientX,
    //   });
    // };
    //
    // const onMouseUp = () => {
    //   setScroll({
    //       ...scroll,
    //       isScrolling: false,
    //   });
    // };
    //
    // const onMouseMove = (event) => {
    //     const { clientX, scrollX } = scroll;
    //     if (scroll.isScrolling) {
    //         scrollRef.current.scrollLeft = scrollX + event.clientX - clientX;
    //         setScroll({
    //             ...scroll,
    //             scrollX: scrollX + event.clientX - clientX,
    //             clientX: event.clientX,
    //         });
    //     }
    // };


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

    // const mouseDown = (index) => {
    //     setActiveIndex(index);
    // }
    //
    // const mouseMove = useCallback((e) => {
    //     const gridColumns = columns.map((col, i) => {
    //         if (i === activeIndex) {
    //             // Calculate the column width
    //             const width = e.clientX - col.ref.current.offsetLeft;
    //
    //             if (width >= minCellWidth) {
    //                 return `${width}px`;
    //             }
    //         }
    //
    //         // Otherwise return the previous width (no changes)
    //         return `${col.ref.current.offsetWidth}px`;
    //     });
    //
    //     // Assign the px values to the table
    //     tableElement.current.style.gridTemplateColumns =
    //         `${gridColumns.join(' ')}`;
    // }, [activeIndex, columns, minCellWidth]);
    //
    // const removeListeners = useCallback(() => {
    //     window.removeEventListener('mousemove', mouseMove);
    //     window.removeEventListener('mouseup', removeListeners);
    // }, [mouseMove]);
    //
    //
    //
    // const mouseUp = useCallback(() => {
    //     setActiveIndex(null);
    //     removeListeners();
    // }, [setActiveIndex, removeListeners]);
    //
    //
    // useEffect(() => {
    //     setTableHeight(tableElement.current.offsetHeight);
    // }, []);
    //
    // useEffect(() => {
    //     if (activeIndex !== null) {
    //         window.addEventListener('mousemove', mouseMove);
    //         window.addEventListener('mouseup', mouseUp);
    //     }
    //
    //     return () => {
    //         removeListeners();
    //     }
    // }, [activeIndex, mouseMove, mouseUp, removeListeners]);


    useEffect(() => {
        if (data) {
            const changedData = data.map((user) => {
                const days = calcDays(user.Days);
                const totalHours = calcTotalHours(days);

                return {
                    id: user.id,
                    name: user.Fullname,
                    days,
                    totalHours,
                }
            });

            setProcessedData(changedData)
        }
    }, [data]);

    // const getClassNamesFor = (name) => {
    //     if (!sortConfig) {
    //         return;
    //     }
    //     return sortConfig.key === name ? sortConfig.direction : undefined;
    // };

    const [isScrolling, setIsScrolling] = useState(false);




    return (
        <div className="table-container">
            <div className="table-wrapper">
                <ScrollContainer
                    className="scroll-container"
                    onClick={(event) => {
                        selectTextInElement(event.target);
                        event.stopPropagation()
                    }}
                >
                    <table
                        // ref={tableElement}
                    >
                        <thead>
                        <tr>
                            <th
                                onClick={() => {

                                }}
                            >
                                <span>User</span>
                                <span>
                                    <i className="fa fa-fw fa-sort"/>
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
                                        {/*<button*/}
                                        {/*    key={day}*/}
                                        {/*    id={day}*/}
                                        {/*    onClick={(event) => {*/}
                                        {/*        requestSort(event.target.id);*/}
                                        {/*        event.stopPropagation();*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    up*/}
                                        {/*</button>*/}
                                    </span>
                                    <span>
                                        <i className="fa fa-fw fa-sort"/>
                                    </span>
                                </th>
                            ))}
                            {/*{columns.map(({ ref, text }, i) => (*/}
                            {/*    <th ref={ref} key={text} onClick={onHeaderClick}>*/}
                            {/*        <span id={text}>{text}</span>*/}
                            {/*        <div*/}
                            {/*            style={{ height: tableHeight }}*/}
                            {/*            onMouseDown={() => mouseDown(i)}*/}
                            {/*            className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}*/}
                            {/*        />*/}
                            {/*    </th>*/}
                            {/*))}*/}
                            <th>
                                <span>
                                    Monthly total
                                </span>
                                <span>
                                    <i className="fa fa-fw fa-sort"/>
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {processedData && processedData.map((user) => {
                            return (
                                <tr key={user.id} >
                                    <td onClick={(event) => event.stopPropagation()}>{user.name}</td>
                                    {user.days.map((hour, idx) => {
                                        return (
                                            <td
                                                key={`${user.id}-${idx}-${hour}`}
                                                onClick={(event) => event.stopPropagation()}
                                            >
                                                {hour}
                                            </td>
                                        )
                                    })}
                                    <td onClick={(event) => event.stopPropagation()}>{user.totalHours}</td>
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
                    count={count}
                    pageCount={pageCount}
                    changePage={(targetPage) => changePage(targetPage)}
                    changeCountPerPage={(c) => changeItemsCount(c)}
                />
            </div>
        </div>
    );
};

export default Table;