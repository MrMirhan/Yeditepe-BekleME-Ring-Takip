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

// Hangi sunucuyu kullanacağını round robin algoritmasına göre seçip, sunucular üzerine gelen yükü azaltır.
async function loadBalance() {
    const url = 'https://bekleme.yeditepe.edu.tr/bekleme-data-ring/ringVer.php';
    const url2 = 'https://oksum.com.tr/api/bekleme/ringVer.php';

    const endpoints = [url, url2];
    const endpointsSize = endpoints.length - 1;

    let pickedUrl;
    let functioning = 0;

    while (functioning == 0) {

        if (loadBalancingKey > endpointsSize) {

            loadBalancingKey = 0;
        }
        pickedUrl = endpoints[loadBalancingKey];
        buses = await getBuses(pickedUrl);
        if (buses) {

            functioning = 1;
        } else {

            console.log(pickedUrl + " ile bağlantı kurulamadı!");
        }

        loadBalancingKey++;
    }
}

// Haritayı oluşturur
async function initMap() {
    var myWrapper = $("#wrapper");
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        myWrapper.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            // code to execute after transition ends
            google.maps.event.trigger(map, 'resize');
        });
    });

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
    // Toggle dark & light mode
    let userViewCookie = getCookie("viewMode");
    if (userViewCookie == "0") {
        map.setOptions({ styles: noPoiDark });
    } else if (userViewCookie == "1") {
        map.setOptions({ styles: noPoi });
    }
	
	// Versiyonu yaz
	try {
		document.getElementById("version").innerHTML = "v" + version;
	} catch(err) {
		// ?????????
	}

    setMapStyles(userViewCookie)
    setMapSide()

    // durak ve ikon markerlarını oluşturuyor
    stops = await getStops()
    setStops();
    icons = await inSchoolLocs();
    setIcons();
    autoUpdate();
    await loadBalance();
    setBuses();

    // Saati kontrol et
    const date = new Date();
    const hour = date.getHours();
    if (hour < 8 && hour > 0) {
        alert("UYARI! Şu an saat 08:15'den önce veya 00:00'dan geç olduğu için İstek Servis A.Ş ringleri servis dışı olabilir. Lütfen daha sonra tekrar deneyin.");
    }

    // 3000 ms de bir haritayı güncelliyor
    window.setInterval(async function() {
        autoUpdate();
        await loadBalance();
        updateMarkers();
    }, 3 * 1000)
}
window.initMap = initMap;