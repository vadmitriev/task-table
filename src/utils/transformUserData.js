const dayNumbers = Array.from({length: 31}, (x, i) => i + 1);

export const headers = [
    {
        id: 'name',
        text: 'User',
    },
    ...dayNumbers.map((day) => ({
        id: day - 1,
        text: day,
    })),
    {
        id: 'total Hours',
        text: 'Monthly Total',
    },
];

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

export const transformUserData = (userData) => {
    return userData.map((user) => {
        const days = calcDays(user.Days);
        const totalHours = calcTotalHours(days);

        return {
            id: user.id,
            name: user.Fullname,
            days,
            totalHours,
            ...days.map((val) => val),
        }
    });
};
