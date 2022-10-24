let map;
let buses;
let stops;
let markers = [];

function getStops() {
    let stopTiles = [];
    let stops = [
        [29.153344380065, 40.974822619286, "<h2><b>ÜST KAPI</b></h2>"],
        [29.151670681641, 40.973380759457, "<h2><b>MEYDAN</b></h2>"],
        [29.150640713384, 40.97224669026, "<h2><b>ALT KAPI</b></h2>"],
        [29.151971089063, 40.973101294219, "<h2><b>HAZIRLIK/REKTÖRLÜK BİNASI</b></h2>"],
        [29.155074404904, 40.969561298688, "<h2><b>HAZIRLIK/KIZ ÖĞRENCİ YURTLARI</b></h2>"],
        [29.154602675823, 40.970086900884, "<h2><b>KIZ ÖĞRENCİ YURTLARI 2</b></h2>"],
        [29.153786944578, 40.971691799306, "<h2><b>HUKUK FAKÜLTESİ/SOSYAL TESİSLER BİNASI</b></h2>"],
        [29.151142833566, 40.97286479837, "<h2><b>TIP FAKÜLTESİ/KIZ ÖĞRENCİ YURDU</b></h2>"],
        [29.152829735672, 40.970678258758, "<h2><b>SOSYAL TESİSLER ALT/GÜZEL SANATLAR FAKÜLTESİ</b></h2>"]
    ]
    for (const stop of stops) {
        stopTiles.push({
            position: new google.maps.LatLng(stop[1], stop[0]),
            map: map,
            properties: {
                title: stop[2],
                description: null
            }
        });
    }
    return stopTiles;
}

function getBuses(url) {
    return fetch(url).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var data = json;
            var busesIn = []
            for (const busKey of Object.keys(data)) {
                let bus = data[busKey];
                if (typeof(bus) != "object") continue;
                var busData = {
                    id: bus.plaka,
                    title: bus.plaka,
                    description: bus.durum,
                    state: bus.durum == 'ILERLIYOR' ? 1 : bus.durum == 'HIZLANIYOR' ? 1 : bus.durum == 'DURUYOR' ? 2 : bus.durum == 'KONTAK_KAPALI' ? 3 : 0,
                    address: bus.adres,
                    coordinates: [bus.lon, bus.lat],
                    longitude: bus.lon,
                    latitude: bus.lat,
                    speed: bus.hizzz,
                    lastUpdate: bus.sonGuncelleme,
                    index: busesIn.length || busesIn.size
                };
                busesIn.push({
                    position: new google.maps.LatLng(busData.latitude, busData.longitude),
                    map: map,
                    properties: busData
                });
            };
            return busesIn;
        })
        .catch(function(error) {
            console.log(error);
            return false;
        });
}

function getIcon(state) {
    const bus1 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Aiga_bus_on_green_circle.svg/1920px-Aiga_bus_on_green_circle.svg.png';
    const bus2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Aiga_bus_on_blue_circle.svg/1920px-Aiga_bus_on_blue_circle.svg.png';
    const bus3 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Aiga_bus_on_red_circle.svg/1024px-Aiga_bus_on_red_circle.svg.png';
    const bus4 = 'https://cdn0.iconfinder.com/data/icons/transportation-86/24/bus-circle-512.png';
    switch (state) {
        case 0:
            return bus4;
        case 1:
            return bus1;
        case 2:
            return bus2;
        case 3:
            return bus3;
    }
}

async function initMap() {
    var myStyles = [{
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }];
    const bounds = {
        north: 40.976808,
        south: 40.966777,
        west: 29.136874,
        east: 29.160553
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 29.152371,
            lng: 40.971908
        },
        restriction: {
            latLngBounds: bounds,
            strictBounds: false,
        },
        zoom: 16,
        zoomControl: true,
        scaleControl: true,
    });

    let url = 'https://oksum.com.tr/api/bekleme/ringVer.php';
    let url2 = 'https://bekleme.yeditepe.edu.tr/bekleme-data-ring/ringVer.php';
    buses = await getBuses(url);
    if (!buses) buses = await getBuses(url2);

    stops = await getStops();

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
                marker.properties = bus.properties;
            }
        }
    }

    function setBuses() {
        for (let i = 0; i < buses.length; i++) {
            let marker = new google.maps.Marker({
                position: buses[i].position,
                icon: {
                    url: getIcon(buses[i].properties.state),
                    scaledSize: new google.maps.Size(30, 30),
                },
                map: map,
                properties: buses[i].properties
            });

            var info = new google.maps.InfoWindow({
                maxWidth: 300,
                content: `<h3>${marker.properties.title}</h3>` + `<p>Durum: <strong>${marker.properties.description}</strong><br />Adres: <strong>${marker.properties.address}</strong></p>`
            });

            google.maps.event.addListener(marker, 'click', function() {
                info.open(map, marker);
            });
            markers.push(marker);
        }
    }

    function setStops() {
        for (let i = 0; i < stops.length; i++) {
            let marker = new google.maps.Marker({
                position: stops[i].position,
                icon: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/800px-Map_pin_icon.svg.png',
                    scaledSize: new google.maps.Size(15, 25),
                },
                map: map,
                properties: stops[i].properties
            });

            var info = new google.maps.InfoWindow({
                maxWidth: 300,
                content: `<h5>${marker.properties.title}</h5>`
            });

            google.maps.event.addListener(marker, 'click', function() {
                info.open(map, marker);
            });
            markers.push(marker);
        }
    }

    setStops();
    setBuses();

    window.setInterval(async function() {
        buses = await getBuses(url);
        if (!buses) buses = await getBuses(url2);
        updateMarkers();
    }, 1000)
}
window.initMap = initMap;