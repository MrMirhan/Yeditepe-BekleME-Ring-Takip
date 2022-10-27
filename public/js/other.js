function inSchoolLocs() {
    let iconTiles = [];
    let icons = [
        [40.972442506709974, 29.14952941612441, "<b>Alt Kapı</b>", 0, "https://konum.yeditepe.edu.tr/assets/img/entrance2.png"],
        [40.972330811657834, 29.15050047954425, "<b>Futbol Sahası</b>", 1, "https://konum.yeditepe.edu.tr/assets/img/soccer2.png"],
        [40.97168996653714, 29.151719820720835, "<b>Basketbol Sahası</b>", 2, "https://konum.yeditepe.edu.tr/assets/img/basket2.png"],
        [40.971426477464654, 29.152015691606564, "<b>Tenis Sahası</b>", 3, "https://konum.yeditepe.edu.tr/assets/img/tennis2.png"],
        [40.9721338859642, 29.152338115007687, "<b>Çamlık</b>", 4, "https://konum.yeditepe.edu.tr/assets/img/tree2.png"],
        [40.97288424620842, 29.150282191691396, "<b>Kız Öğr. Oteli(Güney Alt)</b>", 5, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.97352116638497, 29.15106985596738, "<b>Kız Öğr. Oteli(Meydan)</b>", 6, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.97491847186318, 29.15261480839194, "<b>Açık Otopark</b>", 7, "https://konum.yeditepe.edu.tr/assets/img/parking2.png"],
        [40.9736426724048, 29.152689910222207, "<b>Üst Çamlık</b>", 8, "https://konum.yeditepe.edu.tr/assets/img/tree2.png"],
        [40.97170214152563, 29.153842867330695, "<b>Kız Öğr. Oteli(Kuzey 1)</b>", 9, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.97055529319615, 29.154568341654617, "<b>Kız Öğr. Oteli(Kuzey 1)</b>", 10, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.96925625411391, 29.155279893917868, "<b>Kız Öğr. Oteli(Kuzey 2)</b>", 11, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.968768171219295, 29.155599076796467, "<b>Misafirhane</b>", 12, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"],
        [40.96858184816764, 29.155738551669575, "<b>Mescit</b>", 13, "https://konum.yeditepe.edu.tr/assets/img/mosquee3.png"],
        [40.97408009211715, 29.151091313640165, "<b>Erkek Öğr. Oteli</b>", 14, "https://konum.yeditepe.edu.tr/assets/img/bed2.png"]
    ]

    for (const ikon of icons) {
        iconTiles.push({
            position: new google.maps.LatLng(ikon[0], ikon[1]),
            map: map,
            properties: {
                title: ikon[2],
                id: ikon[3],
                description: null,
            },
            icon: {
                url: ikon[4],
                scaledSize: new google.maps.Size(12, 16)
            },
        });
    }
    return iconTiles;
}

function parseBuses(data) {
    var busesIn = []
    for (const busKey of Object.keys(data)) {
        let bus = data[busKey];
        if (typeof(bus) != "object") continue;
        var busData = {
            id: bus.plaka,
            title: bus.plaka,
            description: bus.durum,
            state: bus.durum == 'ILERLIYOR' ? 1 : bus.durum == 'HIZLANIYOR' ? 1 : bus.durum == 'DURUYOR' ? 2 : bus.durum == 'KONTAK_KAPALI' ? 3 : bus.durum == 'GPS_ARIZA' ? 4 : 5,
            exState: bus.durum == 'ILERLIYOR' ? 1 : bus.durum == 'HIZLANIYOR' ? 1 : bus.durum == 'DURUYOR' ? 2 : bus.durum == 'KONTAK_KAPALI' ? 3 : bus.durum == 'GPS_ARIZA' ? 4 : 5,
            address: bus.adres,
            stop: null,
            exStop: null,
            nextStop: null,
            lastStopTime: null,
            nowTime: null,
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
}