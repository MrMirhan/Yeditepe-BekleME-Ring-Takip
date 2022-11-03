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

// fetch() ile herhangi bir JSON API ile bağlantı kurar.
function getJSON(url) {
    try {
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => { return responseJson });
    } catch (err) {

        console.log("get.js/getJSON(" + url + ") -> ERROR: " + err);
        return false;
    }
}
// Ring duraklarını harita üzerine koyar
function getStops() {
    let stopTiles = [];
    let stops = [
        [29.153344380065, 40.974822619286, "<b>ÜST KAPI</b>", "<b>RİNG DURAĞI 1</b>", 0],
        [29.151670681641, 40.973380759457, "<b>MEYDAN</b>", "<b>RİNG DURAĞI 2</b>", 1],
        [29.151142833566, 40.97286479837, "<b>TIP FAKÜLTESİ/KIZ ÖĞRENCİ YURDU</b>", "<b>RİNG DURAĞI 3</b>", 2],
        [29.150640713384, 40.97224669026, "<b>ALT KAPI</b>", "<b>RİNG DURAĞI 4</b>", 3],
        [29.152829735672, 40.970678258758, "<b>SOSYAL TESİSLER ALT/GÜZEL SANATLAR FAKÜLTESİ</b>", "<b>RİNG DURAĞI 5</b>", 4],
        [29.155074404904, 40.969561298688, "<b>HAZIRLIK/KIZ ÖĞRENCİ YURTLARI</b>", "<b>RİNG DURAĞI 6</b>", 5],
        [29.154602675823, 40.970086900884, "<b>KIZ ÖĞRENCİ YURTLARI 2</b>", "<b>RİNG DURAĞI 7</b>", 6],
        [29.153786944578, 40.971691799306, "<b>HUKUK FAKÜLTESİ/SOSYAL TESİSLER BİNASI</b>", "<b>RİNG DURAĞI 8</b>", 7],
        [29.151971089063, 40.973101294219, "<b>HAZIRLIK/REKTÖRLÜK BİNASI</b>", "<b>RİNG DURAĞI 9</b>", 8]
    ]
    for (const stop of stops) {
        stopTiles.push({
            position: new google.maps.LatLng(stop[1], stop[0]),
            map: map,
            properties: {
                title: stop[3],
                name: stop[2],
                id: stop[4],
                description: null,
                index: stop[4]
            }
        });
    }
    return stopTiles;
}
// Otobüslerin güncel halini çeker.
async function getBuses(url) {
    try {
        let inBuses;
        const data = await getJSON(url);
        if (typeof(data) != "object") return false;
        if (data['impodency'] != impodency || data['impodencyTS'] > impodencyTS) {
            impodency = data['impodency']
            impodencyTS = data['impodencyTS']
            inBuses = parseBuses(data)
        } else {
            await new Promise(r => setTimeout(r, 3000));
            const data = await getJSON(url);
            inBuses = parseBuses(data)
        }
        return inBuses;
    } catch (err) {

        console.log("get.js/getBuses(" + url + ") -> ERROR: " + err);
        return false;
    }
}
// Otobüsün durumuna göre otobüs ikonunu döndürür.
function getIcon(state) {
    switch (state) {
        case 1:
            return '/ringV2/icon/bus.png';
        case 2:
            return '/ringV2/icon/bus-rolanti.png';
        case 3:
            return '/ringV2/icon/bus-kkontak.png';
        case 4:
            return '/ringV2/icon/bus-gpsariza.png';
        case 5:
            return '/ringV2/icon/bus-gpsariza.png';
        case 6:
            return '/ringV2/icon/bus-kampusdisi.png';
        default:
            return '/ringV2/icon/bus-gpsariza.png';
    }
}
// Otobüs durumunu daha temiz şekilde göstermek amacıyla sayı halinden kullanıcıya gösterilen yazıyı döndürür.
function getState(state) {
    let currentStateVal;
    switch (state) {
        case 1:
            currentStateVal = "İlerliyor";
            break;
        case 2:
            currentStateVal = "Bekliyor";
            break;
        case 3:
            currentStateVal = "Servis Dışı";
            break;
        case 4:
            currentStateVal = "Konum Alınamadı";
            break;
        case 5:
            currentStateVal = "Belirlenemedi";
            break;
        case 6:
            currentStateVal = "Kampüs Dışında";
            break;
        default:
            currentStateVal = "Arıza Mevcut";
            break;
    }

    return currentStateVal;
}
// Otobüs durumunu kod içi kolaylık amacıyla integer/sayı haline getirir.
function getStateInt(state) {
    switch (state) {
        case "ILERLIYOR":
            return 1;
        case "DURUYOR":
            return 2;
        case "KONTAK_KAPALI":
            return 3;
        case "GPS_ARIZA":
            return 4;
        case "BELIRSIZ":
            return 5;
        case "KAMPUS_DISINDA":
            return 6;
        default:
            return 100;
    }
}