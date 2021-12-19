import React, { useState, useEffect, Suspense } from 'react';
import Table from 'components/Table/Table';
import ModalWeather from 'components/ModalWeather/ModalWeather';

import { getAll, getUserByName } from 'api/fakeApi';

import './App.css';
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
            selectedDay: null,
        },
    });
    const [filter, setFilter] = useState(null);

    const setResults = (userData, count) => {
        setCount(userData.count);
        setUsers(userData.results);

        setPageCount(Math.ceil(userData.count / count));
    }

    useEffect(() => {
        getUserByName(filter, itemsPerPage)
            .then((userData) => {
                setResults(userData, itemsPerPage);
            })
    }, [filter]);

    useEffect(() => {
        getAll(page, itemsPerPage)
            .then((userData) => {
                setResults(userData, itemsPerPage);
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

    const handleFilter = (text) => {
        setFilter(text);
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
                    <Filter onChange={handleFilter} />

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

                    <ModalWeather
                        toggleModal={() => setModal({
                            open: !modal.open,
                            data: null,
                        })}
                        modalOpen={modal.open}
                        data={modal.data}
                    />
                </div>
            </div>
        // </Suspense>
    );
};

export default App;
