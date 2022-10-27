function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

function getNearestStop(marker) {
    let nearestStop = null;
    let nearestDistance = 0;
    for (const stop of stopMarkers) {
        let distance = haversine_distance(marker, stop);
        if (nearestStop == null || distance < nearestDistance) {
            nearestStop = stop;
            nearestDistance = distance;
        }
    }
    // minimum yakınlık 0.021774155782806535
    return [nearestStop, nearestDistance];
}

function getNearestBus(marker, givenBuses) {
    let nearestBus = null;
    let nearestDistance = 0;
    for (const bus of givenBuses) {
        let distance = haversine_distance(marker, bus);
        if (nearestBus == null || distance < nearestDistance) {
            nearestBus = bus;
            nearestDistance = distance;
        }
    }
    // minimum yakınlık 0.021774155782806535
    return [nearestBus, nearestDistance];
}