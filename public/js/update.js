function autoUpdate() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var newPoint = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);

        if (locMarker) {
            // Marker already created - Move it
            locMarker.setPosition(newPoint);
        } else {
            // Marker does not exist - Create it
            locMarker = new google.maps.Marker({
                position: newPoint,
                map: map
            });

            var info = new google.maps.InfoWindow({
                maxWidth: 300,
            });

            google.maps.event.addListener(locMarker, 'click', function() {
                let getneareststop = getNearestStop(locMarker)
                let nearestStop = getneareststop[0]
                let nearestStopDistance = getneareststop[1]

                function checkBus(bus) {
                    if (Object.keys(bus).includes('properties'))
                        if (Object.keys(bus.properties).includes('nextStop'))
                            if (bus.properties.stop != null && typeof(bus.properties.stop) == 'object' && Object.keys(bus.properties.stop).includes('properties'))
                                if (bus.properties.nextStop != null && typeof(bus.properties.nextStop) == 'object' && Object.keys(bus.properties.nextStop).includes('properties')) {
                                    if (bus.properties.nextStop.properties.title == nearestStop.properties.title || bus.properties.stop.properties.title == nearestStop.properties.title) return bus
                                } else if (bus.properties.stop.properties.title == nearestStop.properties.title) return bus

                }

                if (nearestStop && nearestStopDistance && nearestStopDistance <= 0.021774155782806535) {
                    let content = `<p>Bulunduğunuz Durak: <strong>${nearestStop.properties.title}</strong></p>`
                    let nearestBuses = buses.filter(checkBus)
                    if (nearestBuses.length > 0 || nearestBuses.size > 0) {
                        let nearestbus = getNearestBus(locMarker, nearestBuses)
                        let nearestBus = nearestbus[0]
                        let nearestBusDistance = nearestbus[1];
                        if (nearestBus) {
                            if (nearestBus) {
                                content += `<br><p>En Yakın Otobüs: <strong>${nearestBus.properties.title}</strong><br>Uzaklık: <strong>${Math.round(((nearestBusDistance * 1.6) + Number.EPSILON) * 100) / 100 * 1000} Metre</strong></p>`
                            }
                        }
                    }
                    info.setContent(content)
                    info.open(locMarker.get('map'), locMarker);
                }

            });
        }
    });
}

function updateMarkers() {
    for (const marker of markers) {
        let bus = buses.find(bus => bus.properties.id == marker.properties.id);
        if (bus) {
            var pos = new google.maps.LatLng(bus.properties.latitude, bus.properties.longitude)
            marker.setPosition(pos);
            marker.setIcon({
                url: getIcon(bus.properties.state),
                scaledSize: new google.maps.Size(30, 30),
            });

            bus.properties.nowTime = Date.now();
            bus.properties.lastStopTime = marker.properties.lastStopTime;
            bus.properties.stop = marker.properties.stop;
            bus.properties.exStop = marker.properties.exStop;
            bus.properties.nextStop = marker.properties.nextStop;
            bus.properties.exState = marker.properties.exState

            if (bus.properties.state == 2) {
                let nearestStop = getNearestStop(marker)[0]

                bus.properties.stop = nearestStop
                if (bus.properties.exStop != bus.properties.stop) {
                    bus.properties.exStop = bus.properties.stop;
                    bus.properties.nextStop = stopMarkers[parseInt(bus.properties.stop.properties.id) + 1];
                    if (marker.properties.state == 1 && bus.properties.exState == 2) {
                        let busSend = {
                            ...bus,
                            exStop: bus.properties.exStop,
                            stop: bus.properties.stop,
                            nextStop: bus.properties.nextStop,
                        }
                        var seen = [];
                        let busData = JSON.stringify(busSend, function(key, val) {
                            if (val != null && typeof val == "object") {
                                if (seen.indexOf(val) >= 0) {
                                    return;
                                }
                                seen.push(val);
                            }
                            return val;
                        });
                        /*$.ajax({
                            type: 'POST',
                            url: '/saveData',
                            dataTyp: 'json',
                            data: busData,
                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                console.log(data)
                            }
                        });*/
                    }
                    bus.properties.lastStopTime = Date.now();
                }
            }
            if (marker.properties.state != bus.properties.state) bus.properties.exState = marker.properties.state;
            markers[markers.indexOf(marker)].properties = bus.properties;
        }
    }
}