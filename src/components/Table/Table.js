import React, {useCallback, useEffect, useRef, useState} from 'react';
import TableFooter from './TableFooter/TableFooter';
// import './table.css';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item,
        ref: useRef(),
    }));
}

const Table = ({data}) => {
    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement = useRef(null);

    const dayNumbers = Array.from({length: 31}, (x, i) => i + 1);

    const columns = createHeaders(dayNumbers);

    const minCellWidth = 10;


    const calcHours = ({start, end}) => {

    };

    const mouseDown = (index) => {
        setActiveIndex(index);
    }

    const mouseMove = useCallback((e) => {
        const gridColumns = columns.map((col, i) => {
            if (i === activeIndex) {
                // Calculate the column width
                const width = e.clientX - col.ref.current.offsetLeft;

                if (width >= minCellWidth) {
                    return `${width}px`;
                }
            }

            // Otherwise return the previous width (no changes)
            return `${col.ref.current.offsetWidth}px`;
        });

        // Assign the px values to the table
        tableElement.current.style.gridTemplateColumns =
            `${gridColumns.join(' ')}`;
    }, [activeIndex, columns, minCellWidth]);

    const removeListeners = useCallback(() => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [mouseMove]);



    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);


    useEffect(() => {
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }

        return () => {
            removeListeners();
        }
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);




    console.log('data:', data)

    return (
        <div className="table-wrapper">
            <table className="resizeable-table" ref={tableElement}>
                <thead>
                    <tr>
                        <th>User</th>
                        {/*{dayNumbers.map((day) => {*/}
                        {/*    return <th key={day}>{day}</th>*/}
                        {/*})}*/}
                        {columns.map(({ ref, text }, i) => (
                            <th ref={ref} key={text}>
                                <span>{text}</span>
                                <div
                                    style={{ height: tableHeight }}
                                    onMouseDown={() => mouseDown(i)}
                                    className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
                                />
                            </th>
                        ))}
                        <th>Monthly total </th>
                    </tr>
                </thead>
                <tbody>
                {data && data.map((user) => {
                    return (
                        <tr key={user.id}>
                            {user.Days.map((day) => {
                                return <td key={day.Date}>{day.Date}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <TableFooter
                // page={page}
                // itemsPerPage={itemsPerPage}
                // count={count}
                // changePage={(targetPage) => setPage((targetPage))}
                // changeCountPerPage={(c) => setItemsPerPage(c)}
            />
        </div>
    );
};

export default Table;