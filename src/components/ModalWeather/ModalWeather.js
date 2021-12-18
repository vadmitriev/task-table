import React, {useEffect, useState} from 'react';
import city from 'constants/geoposition';
import axios from 'axios';
import Modal from 'components/Modal/Modal';

const ModalWeather = ({modalOpen = false, data}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [title, setTitle] = useState('title');
    const [ModalBody, setModalBody] = useState(null);

    const month = 5;

    const formHtml = (date) => {
        return `${process.env.REACT_APP_WEATHER_BASE_URL}/${city.name}/${date}?unitGroup=metric&key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`;
    }

    useEffect(() => {
        if (data.selectedDay) {
            const day = new Date(2021, month, data.selectedDay);

            const dateString = `${day.getFullYear()}-${month}-${day.getDate()}`;

            setTitle(dateString);

            const html = formHtml(dateString);

            axios.get(html)
                .then((w) => setWeatherData(w.data));

            // (async function fetchData() {
            //
            // })();
        }
    }, [data]);

    useEffect(() => {
        if (weatherData) {
            setModalBody(
                <div>
                    {weatherData.title}
                </div>
            )
        }
    }, [weatherData]);

    return (
        modalOpen
            ? ModalBody && <Modal title={title} children={ModalBody} />
            : null
    );
};

export default ModalWeather;