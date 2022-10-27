function getJSON(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
}

function getStops() {
    let stopTiles = [];
    let stops = [
        [29.153344380065, 40.974822619286, "<b>ÜST KAPI</b>", 0],
        [29.151670681641, 40.973380759457, "<b>MEYDAN</b>", 1],
        [29.151142833566, 40.97286479837, "<b>TIP FAKÜLTESİ/KIZ ÖĞRENCİ YURDU</b>", 2],
        [29.150640713384, 40.97224669026, "<b>ALT KAPI</b>", 3],
        [29.152829735672, 40.970678258758, "<b>SOSYAL TESİSLER ALT/GÜZEL SANATLAR FAKÜLTESİ</b>", 4],
        [29.155074404904, 40.969561298688, "<b>HAZIRLIK/KIZ ÖĞRENCİ YURTLARI</b>", 5],
        [29.154602675823, 40.970086900884, "<b>KIZ ÖĞRENCİ YURTLARI 2</b>", 6],
        [29.153786944578, 40.971691799306, "<b>HUKUK FAKÜLTESİ/SOSYAL TESİSLER BİNASI</b>", 7],
        [29.151971089063, 40.973101294219, "<b>HAZIRLIK/REKTÖRLÜK BİNASI</b>", 8]
    ]
    for (const stop of stops) {
        stopTiles.push({
            position: new google.maps.LatLng(stop[1], stop[0]),
            map: map,
            properties: {
                title: stop[2],
                id: stop[3],
                description: null,
                index: stop[3]
            }
        });
    }
    return stopTiles;
}

async function getBuses(url) {
    let inBuses;
    const data = await getJSON(url);
    if (data['impodency'] != impodency) {
        impodency = data['impodency']
        inBuses = parseBuses(data)
    } else {
        await new Promise(r => setTimeout(r, 1500));
        const data = await getJSON(url);
        inBuses = parseBuses(data)
    }
    return inBuses;
}

function getIcon(state) {
    const bus1 = 'https://bekleme.yeditepe.edu.tr/ring/icon/bus.png';
    const bus2 = 'https://bekleme.yeditepe.edu.tr/ring/icon/bus-rolanti.png';
    const bus3 = 'https://bekleme.yeditepe.edu.tr/ring/icon/bus-kkontak.png';
    const bus4 = 'https://bekleme.yeditepe.edu.tr/ring/icon/bus-gpsariza.png';
    switch (state) {
        case 1:
            return bus1;
        case 2:
            return bus2;
        case 3:
            return bus3;
        case 4:
            return bus4;
        case 5:
            return bus4;
    }
}

function getState(state) {
    switch (state) {
        case 1:
            return "İlerliyor";
        case 2:
            return "Bekliyor";
        case 3:
            return "Servis Dışı";
        case 4:
            return "Konum Alınamadı";
        case 5:
            return "Arıza Mevcut";
    }
}