import React, {useEffect, useState} from 'react';
import city from './../../constants/geoposition';
import axios from 'axios';

const ModalWeather = ({modalOpen = false, data}) => {
    const [weatherData, setWeatherData] = useState(null);

    const formHtml = (date) => {
        return `${process.env.REACT_APP_WEATHER_BASE_URL}/${city.name}/${date}?unitGroup=metric&key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`;
    }

    useEffect(() => {
        if (data.selectedDay) {
            const now = new Date();
            let day;
            if (now.getMonth() === 0) {
                day = new Date(now.getFullYear(), 11, data.selectedDay);
            } else {
                day = new Date(now.getFullYear(), now.getMonth() - 1, data.selectedDay);
            }

            const dateString = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

            const html = formHtml(dateString);

            (async function fetchData() {
                axios.get(html)
                    .then((w) => setWeatherData(w.data));
            })();
        }
    }, [data]);

    return (
        modalOpen
            ? (
                <div>
                    {city.name} weather:
                    {weatherData &&
                        <div>
                            {weatherData.resolvedAddress}
                        </div>
                    }
                </div>
            )
            : null
    );
};

export default ModalWeather;