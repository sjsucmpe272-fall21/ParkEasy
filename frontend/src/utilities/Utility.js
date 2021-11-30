export function getHoursAndSeconds(datetime_string) {
    const datetime = new Date(datetime_string);
    return `${datetime.getUTCHours()}:${datetime.getUTCMinutes()|| "00"}`
}