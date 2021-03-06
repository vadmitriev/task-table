import React, { useState, useEffect } from 'react';
import Table from 'containers/Table/Table';
import ModalWeather from 'components/ModalWeather/ModalWeather';
import Filter from 'containers/Filter/Filter';

import { getAll, getUserByName } from 'api/fakeApi';
import { headers, transformUserData } from 'utils/transformUserData';

import './App.css';

const App = () => {
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [users, setUsers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modal, setModal] = useState({
        open: false,
        data: {
            selectedDay: null,
        },
    });
    const [filter, setFilter] = useState(null);

    const setResults = (userData, count) => {
        const changedData = transformUserData(userData.results);
        setUsers(changedData);

        setPageCount(Math.ceil(userData.count / count));
    }

    useEffect(() => {
        getUserByName(filter, page, itemsPerPage)
            .then((userData) => {
                setResults(userData, itemsPerPage);
            });
    }, [page, itemsPerPage, filter]);

    useEffect(() => {
        getAll(page, itemsPerPage)
            .then((userData) => {
                setResults(userData, itemsPerPage);
            });
    }, []);

    const handleTableHeaderClick = (value) => {
        if (!Number.parseInt(value)) {
            return;
        }

        setModal({
            open: true,
            data: {
                selectedDay: value,
            },
        });
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
        <div className="container">
            <div className="wrapper">
                <Filter onChange={handleFilter} />

                <Table
                    onHeaderClick={handleTableHeaderClick}
                    data={users}
                    headers={headers}
                    page={page}
                    itemsPerPage={itemsPerPage}
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
    );
};

export default App;
