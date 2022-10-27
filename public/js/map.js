async function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(40.971908, 29.152371),
        zoom: 16.5,
        zoomControl: true,
        scaleControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "terrain", "satellite", "hybrid"]
        }
    });

    let userViewCookie = getCookie("viewMode");
    if (userViewCookie == "0") {
        map.setOptions({ styles: noPoiDark });
    } else if (userViewCookie == "1") {
        map.setOptions({ styles: noPoi });
    }

    setMapStyles(userViewCookie)

    stops = await getStops()
    setStops();
    icons = await inSchoolLocs();
    setIcons();
    autoUpdate();

    let url = 'https://oksum.com.tr/api/bekleme/ringVer.php';
    let url2 = 'https://bekleme.yeditepe.edu.tr/bekleme-data-ring/ringVer.php';

    buses = await getBuses(url)
    if (!buses) buses = await etBuses(url2)

    setBuses();

    window.setInterval(async function() {
        autoUpdate();
        buses = await getBuses(url);
        if (!buses) buses = await getBuses(url2);
        updateMarkers();
    }, 6 * 1000)
}
window.initMap = initMap;