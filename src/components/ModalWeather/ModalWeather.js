import React, { useEffect, useState } from 'react';
import Modal from 'containers/Modal/Modal';

import city from 'constants/geoposition';
import axios from 'axios';

const MONTH = 5;
const YEAR = 2021;

const ModalWeather = ({
    data,
    toggleModal,
    modalOpen = false,
}) => {
    const [weatherData, setWeatherData] = useState({});
    const [title, setTitle] = useState('title');
    const [ModalBody, setModalBody] = useState(null);



    const formHtml = (date) => {
        return `${process.env.REACT_APP_WEATHER_BASE_URL}?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city.name}&format=json&date=${date}`
    };

    useEffect(() => {
        if (data && data.selectedDay) {
            const day = new Date();
            day.setDate(data.selectedDay);
            day.setFullYear(YEAR);
            day.setMonth(data.selectedDay < 31 ? MONTH : MONTH + 1);

            const dateString = `${day.getFullYear()}-
                ${MONTH < 10 ? '0' + MONTH : MONTH}-
                ${day.getDate() < 10 ? '0' + day.getDate() : day.getDate()}`;

            const dayString = data.selectedDay < 10 ? `0${data.selectedDay}` : data.selectedDay;
            const monthString = MONTH < 10 ? `0${MONTH}` : MONTH;

            setTitle((
                <span>
                    {`Погода на дату `}
                    <strong>{`${dayString}.${monthString}.${YEAR}`}</strong>
                </span>
            ));

            const html = formHtml(dateString);

            if (html.includes('undefined')) {
                setWeatherData(null);
            } else {
                if (!weatherData[data.selectedDay]) {
                    axios.get(html)
                        .then((w) => {
                            setWeatherData({
                               ...weatherData,
                               [data.selectedDay]: w.data.data.weather[0],
                            });
                        });
                }
            }
        }
    }, [data, weatherData]);

    const modalContent = (day) => {
        if (weatherData[day]) {
            return (
                <div>
                    <div>
                        Город: &nbsp;
                        <strong>{city.nameRus}</strong>
                    </div>
                    <div>
                        Средняя температура, °С: &nbsp;
                        <strong>{weatherData[day].avgtempC}</strong>
                    </div>
                    <div>
                        Рассвет: &nbsp;
                        <strong>{weatherData[day].astronomy[0].sunrise}</strong>
                    </div>
                    <div>
                        Закат: &nbsp;
                        <strong>{weatherData[day].astronomy[0].sunset}</strong>
                    </div>
                </div>
            )
        }

        return (
            <div>
                Ой! Произошла непредвиденная ошибка...
            </div>
        )
    }

    useEffect(() => {
        const day = data?.selectedDay;
        setModalBody(modalContent(day));
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