/*


  ____       _    _      __  __        _____           _           _ 
 |  _ \     | |  | |    |  \/  |      |  __ \         (_)         (_)
 | |_) | ___| | _| | ___| \  / | ___  | |__) | __ ___  _  ___  ___ _ 
 |  _ < / _ \ |/ / |/ _ \ |\/| |/ _ \ |  ___/ '__/ _ \| |/ _ \/ __| |
 | |_) |  __/   <| |  __/ |  | |  __/ | |   | | | (_) | |  __/\__ \ |
 |____/ \___|_|\_\_|\___|_|  |_|\___| |_|   |_|  \___/| |\___||___/_|
                                                     _/ |            
                                                    |__/             
BekleMe Projesi 2022 (R) - Tüm hakları saklıdır!
Projedeki tüm JavaScript fonksiyonları ile ilgili dökümentasyonu first.js içerisinde bulabilirsiniz.
*/

// Okulun içinde bulunan önemli yerlere ikonlar yerleştirir.
function inSchoolLocs() {
    let iconTiles = [];
    let icons = [
        [40.972442506709974, 29.14952941612441, "<b>Alt Kapı</b>", 0, "https://bekleme.yeditepe.edu.tr/ringV2/icon/entrance2.png", 20, 20],
        [40.972330811657834, 29.15050047954425, "<b>Futbol Sahası</b>", 1, "https://bekleme.yeditepe.edu.tr/ringV2/icon/soccer2.png", 20, 20],
        [40.97168996653714, 29.151719820720835, "<b>Basketbol Sahası</b>", 2, "https://bekleme.yeditepe.edu.tr/ringV2/icon/basket2.png", 20, 20],
        [40.971426477464654, 29.152015691606564, "<b>Tenis Sahası</b>", 3, "https://bekleme.yeditepe.edu.tr/ringV2/icon/tennis2.png", 20, 20],
        [40.9721338859642, 29.152338115007687, "<b>Çamlık</b>", 4, "https://bekleme.yeditepe.edu.tr/ringV2/icon/tree2.png", 20, 20],
        [40.97288424620842, 29.150282191691396, "<b>Kız Öğr. Oteli(Güney Alt)</b>", 5, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.97352116638497, 29.15106985596738, "<b>Kız Öğr. Oteli(Meydan)</b>", 6, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.97491847186318, 29.15261480839194, "<b>Açık Otopark</b>", 7, "https://bekleme.yeditepe.edu.tr/ringV2/icon/parking2.png", 20, 20],
        [40.9736426724048, 29.152689910222207, "<b>Üst Çamlık</b>", 8, "https://bekleme.yeditepe.edu.tr/ringV2/icon/tree2.png", 20, 20],
        [40.97170214152563, 29.153842867330695, "<b>Kız Öğr. Oteli(Kuzey 1)</b>", 9, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.97055529319615, 29.154568341654617, "<b>Kız Öğr. Oteli(Kuzey 1)</b>", 10, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.96925625411391, 29.155279893917868, "<b>Kız Öğr. Oteli(Kuzey 2)</b>", 11, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.968768171219295, 29.155599076796467, "<b>Misafirhane</b>", 12, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],
        [40.96858184816764, 29.155738551669575, "<b>Mescit</b>", 13, "https://bekleme.yeditepe.edu.tr/ringV2/icon/mosquee3.png", 20, 20],
        [40.97408009211715, 29.151091313640165, "<b>Erkek Öğr. Oteli</b>", 14, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bed2.png", 20, 20],

        [40.974021761268, 29.152085422659, "<b>Ticari Bilimler Binası</b>", 15, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.972425973821, 29.151559709693, "<b>Mühendislik Binası</b>", 16, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.971814380074, 29.153075157783, "<b>Hukuk Binası</b>", 16, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.973049712597, 29.152428745414, "<b>Güney Hazırlık Binası</b>", 17, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.97280669819, 29.152718423987, "<b>Rektörlük Binası</b>", 18, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.971462002295, 29.152847170019, "<b>Sosyal Tesisler Binası</b>", 19, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.970651931296, 29.154080986165, "<b>Güzel Sanatlar Binası</b>", 20, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.969777043451, 29.155025123741, "<b>Kuzey Hazırlık Binası</b>", 21, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20],
        [40.973900255966, 29.15339434066, "<b>YUTTO Çadırı</b>", 22, "https://bekleme.yeditepe.edu.tr/ringV2/icon/bina_low_poly.png", 20, 20]
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
                scaleX: ikon[5],
                scaleY: ikon[6]
            },
        });
    }
    return iconTiles;
}
// Otobüs bilgilerini temize çeker, ayırır.
function parseBuses(data) {
    var busesIn = []
    for (const busKey of Object.keys(data)) {
        let bus = data[busKey];
        if (typeof(bus) != "object") continue;
        var busData = {
            id: bus.plaka,
            title: bus.plaka,
            description: bus.durum,
            state: getStateInt(bus.durum),
            exState: getStateInt(bus.durum),
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

// Sidebar açma fonksiyonu
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Sidebar kapama fonksiyonu
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}