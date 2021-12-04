export function getHoursAndSeconds(datetime_string) {
    const datetime = new Date(datetime_string);
    return `${datetime.getUTCHours()}:${datetime.getUTCMinutes()|| "00"}`
}

export function getLatLngFromGoogleAutoComplete(place) {
    const { geometry } = place || {};
    const { location } = geometry;
    const lat = location.lat();
    const lng = location.lng();

    return { lat, lng };
};

export function calc_distance(lat1, lon1, lat2, lon2) {
    // Returns distance in meters
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export function convertMetersToMiles(meters, inKms = true) {
    let unit;
    unit = 0.000621371 * meters;
    if (inKms) 
        unit *= 1000;
    return unit;
};

export function get_cookie(document, cookie) {
    if (!document || !document.cookie) return;
    
    return document && document.cookie
        .split('; ')
        .find(row => row.startsWith(cookie))
        .split('=')[1];
};