import React, {useState, useEffect, Suspense} from 'react';
import Table from '../Table/Table';
import ModalWeather from '../ModalWeather/ModalWeather';

import Pagination from '../Table/TableFooter/TableFooter';
import {getAll} from '../../api/fakeApi';

// import './App.css';
import Filter from '../Filter/Filter';

const App = () => {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
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
            })
        // (async function fetchData() {
        //     const usersData = await getAll(page, itemsPerPage);
        //     setCount(usersData.count);
        //     setUsers(usersData.results);
        // })();
    }, [page, itemsPerPage]);


    const handleHeaderClick = (event) => {
        setModal({
            open: true,
            data: {
                selectedDay: event.target.value,
            },
        })
    };

    const handleFilter = (event) => {
        console.log(event.target.value);
    };

    return (
        <Suspense fallback={<div className="loading" />}>
            <div className="container">
                <div className="wrapper">
                    <div className="d-flex justify-content-between mt-5">
                        <Filter onChange={handleFilter} />

                        <Table onHeaderClick={handleHeaderClick} data={users}/>

                        <ModalWeather modalOpen={modal.open} data={modal.data}/>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default App;
