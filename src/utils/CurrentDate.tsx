const newDate: Date = new Date()
const date: number = newDate.getDate();
const month: number = newDate.getMonth() + 1;
const year: number = newDate.getFullYear();
const hours: number = newDate.getHours();
const minutes: number = newDate.getMinutes();

export function GetCurrentDate() {
    return (
        <>
            {date < 10 ? `0${date}` : `${date}`} / {month < 10 ? `0${month}` : `${month}`} / {year}
        </>
    )
}

export function GetCurrentHour() {
    return (
        <>
            {hours < 10 ? `0${hours}` : `${hours}`}:{minutes < 10 ? `0${minutes}` : `${minutes}`}
        </>
    )
}