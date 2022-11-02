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

Frontend JS Function list:

* cookie.js
setCookie               -> Tarayıcı üzerinde cookie tanımlar
getCookie               -> Tarayıcı üzerinde tanımlanan bir cookie'nin değerini alır

* distance.js
haversine_distance      -> Haversine formülüne göre uzaklık hesaplaması yapar
getNearestStop          -> En yakın durağı bulur
getNearestBus           -> En yakın otobüsü bulur

* get.js
getJSON                 -> fetch() ile herhangi bir JSON API ile bağlantı kurar.
getStops                -> Ring duraklarını harita üzerine koyar
getBuses                -> Otobüslerin güncel halini çeker.
getIcon                 -> Otobüsün durumuna göre otobüs ikonunu döndürür.
getState                -> Otobüs durumunu daha temiz şekilde göstermek amacıyla sayı halinden kullanıcıya gösterilen yazıyı döndürür.
getStateInt             -> Otobüs durumunu kod içi kolaylık amacıyla integer/sayı haline getirir.

* map.js
loadBalance             -> Hangi sunucuyu kullanacağını rastgele seçip tek sunucu üzerine gelen yükü azaltır
initMap                 -> Haritayı oluşturur

* other.js
inSchoolLocs            -> Okulun içinde bulunan önemli yerlere ikonlar yerleştirir.
parseBuses              -> Otobüs bilgilerini temize çeker, ayırır.

* set.js
setBuses                -> Otobüsleri haritaya ekler
setStops                -> Durak bilgilerini ekler
setIcons                -> İkonları ayarlar
setMapStyles            -> Dark light butonunu ekler

* update.js
autoUpdate              -> Harita üzerindeki markerların eklenmesini/güncellenmesini, aynı zamanda en yakın otobüs ve durak bilgisini hesaplayan fonksiyondur. 
updateMarkers           -> Otobüslerin yerini günceller


*/

let map;
let buses;
let stops;
let impodency;
let impodencyTS;
let icons;
let locMarker;
let markers = [];
let iconMarkers = [];
let stopMarkers = [];
let loadBalancingKey = 0;
let banner = `
  ____       _    _      __  __        _____           _           _ 
 |  _ \     | |  | |    |  \/  |      |  __ \         (_)         (_)
 | |_) | ___| | _| | ___| \  / | ___  | |__) | __ ___  _  ___  ___ _ 
 |  _ < / _ \ |/ / |/ _ \ |\/| |/ _ \ |  ___/ '__/ _ \| |/ _ \/ __| |
 | |_) |  __/   <| |  __/ |  | |  __/ | |   | | | (_) | |  __/\__ \ |
 |____/ \___|_|\_\_|\___|_|  |_|\___| |_|   |_|  \___/| |\___||___/_|
                                                     _/ |            
                                                    |__/             
BekleMe Projesi 2022 (R) - Tüm hakları saklıdır!
`;

// Console banner
console.log(banner);

// Haritanın light modu
var noPoi = [{
    featureType: "poi",
    stylers: [
        { visibility: "off" }
    ]
}];

// Haritanın dark modu
var noPoiDark = [{
        featureType: "poi",
        stylers: [{ visibility: "off" }]
    },
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    }
]