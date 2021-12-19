import React, {useEffect, useState} from 'react';
import city from 'constants/geoposition';
import axios from 'axios';
import Modal from 'components/Modal/Modal';

const ModalWeather = ({data, toggleModal, modalOpen = false}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [title, setTitle] = useState('title');
    const [ModalBody, setModalBody] = useState(null);

    const month = 5;
    const year = 2021;

    const formHtml = (date) => {
        // return `${process.env.REACT_APP_WEATHER_BASE_URL}/${city.name}/${date}?unitGroup=metric&key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`;
        return `${process.env.REACT_APP_WEATHER_BASE_URL}?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city.name}&format=json&date=${date}`
    }

    useEffect(() => {
        if (data && data.selectedDay) {
            const day = new Date();
            day.setDate(data.selectedDay);
            day.setFullYear(year);
            day.setMonth(data.selectedDay < 31 ? month : month + 1);

            const dateString = `${day.getFullYear()}-${month}-${day.getDate()}`;

            const dayString = data.selectedDay < 10 ? `0${data.selectedDay}` : data.selectedDay;
            const monthString = month < 10 ? `0${month}` : month;

            setTitle((
                <span>
                    {`Погода в городе ${city.nameRus} на дату `}
                    <strong>{`${dayString}.${monthString}.${year}`}</strong>
                </span>
            ));

            const html = formHtml(dateString);
            setWeatherData({avgtempC: 15})

            // axios.get(html)
            //     .then((w) => {
            //         setWeatherData(w.data.data.weather[0]);
            //     });
        }
    }, [data]);

    useEffect(() => {
        if (weatherData) {
            setModalBody(
                <div>
                    {weatherData.avgtempC}
                </div>
            )
        }
    }, [data, weatherData]);

    return (
        ModalBody && (
            <Modal
                modalOpen={modalOpen}
                title={title}
                children={ModalBody}
                toggleOpen={toggleModal}
            />
    ));
};

export default ModalWeather;