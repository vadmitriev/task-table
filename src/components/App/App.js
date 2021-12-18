import React, {useState, useEffect, Suspense} from 'react';
import Table from 'components/Table/Table';
import ModalWeather from 'components/ModalWeather/ModalWeather';

import Pagination from '../Table/TableFooter/TableFooter';
import {getAll} from 'api/fakeApi';

// import './App.css';
import Filter from 'components/Filter/Filter';
import Modal from 'components/Modal/Modal';

const App = () => {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [users, setUsers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modal, setModal] = useState({
        open: true,
        data: {
            selectedDay: 26,
        },
    });


    useEffect(() => {
        getAll(page, itemsPerPage)
            .then((userData) => {
                setCount(userData.count);
                setUsers(userData.results);

                setPageCount(Math.ceil(userData.count / itemsPerPage));
            })
    }, [page, itemsPerPage]);


    const handleTableHeaderClick = (value) => {
        setModal({
            open: true,
            data: {
                selectedDay: value,
            },
        })
    };

    const handleFilter = (event) => {
        console.log(event.target.value);
    };

    const changePage = (targetPage) => {
        setPage(targetPage);
    };

    const changePageCount = (itemsCount) => {
        setItemsPerPage(itemsCount);
    };

    return (
        // <Suspense fallback={<div className="loading" />}>
            <div className="container">
                <div className="wrapper">
                    <div className="d-flex justify-content-between mt-5">
                        {/*<Filter onChange={handleFilter} />*/}

                        <Table
                            onHeaderClick={handleTableHeaderClick}
                            data={users}
                            page={page}
                            itemsPerPage={itemsPerPage}
                            count={count}
                            pageCount={pageCount}
                            changePage={changePage}
                            changeItemsCount={changePageCount}
                        />

                        <ModalWeather modalOpen={modal.open} data={modal.data}/>
                        {/*<Modal title={`Weather at ${modal.data.selectedDay}`} />*/}
                    </div>
                </div>
            </div>
        // </Suspense>
    );
};

export default App;
