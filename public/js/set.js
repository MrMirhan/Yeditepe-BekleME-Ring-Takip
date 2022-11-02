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

// Otobüsleri haritaya ekler
function setBuses() {
    for (const bus of buses) {
        let marker = new google.maps.Marker({
            position: bus.position,
            icon: {
                url: getIcon(bus.properties.state),
                scaledSize: new google.maps.Size(30, 30),
            },
            map: map,
            properties: bus.properties
        });

        var info = new google.maps.InfoWindow({
            maxWidth: 300,
        });

        google.maps.event.addListener(marker, 'click', function() {
            try {
                info.setContent(`<h3>${marker.properties.title}</h3>` + `<p>Durum: <strong>${getState(marker.properties.state)}</strong><br />Mevcut Durak: <strong>${marker.properties.stop.properties.title || "Yok"}</strong><br />Sonraki Durak: <strong>${marker.properties.nextStop.properties.title || "Yok"}</strong><br />Adres: <strong>${marker.properties.address}</strong><br />Koordinat: <strong>${marker.properties.latitude}, ${marker.properties.longitude}</strong></p>`)
                info.open(marker.get('map'), marker);
            } catch {
                info.setContent(`<h3>${marker.properties.title}</h3>` + `<p>Durum: <strong>${getState(marker.properties.state)}</strong><br />Adres: <strong>${marker.properties.address}</strong><br />Koordinat: <strong>${marker.properties.latitude}, ${marker.properties.longitude}</strong></p>`)
                info.open(marker.get('map'), marker);
            }
        });
        markers.push(marker);
    }
}
// Durak bilgilerini ekler
function setStops() {
    for (const stop of stops) {
        let marker = new google.maps.Marker({
            position: stop.position,
            icon: {
                url: '/icon/bus-stop-wm.svg.png',
                scaledSize: new google.maps.Size(20, 28),
            },
            map: map,
            properties: stop.properties
        });

        var info = new google.maps.InfoWindow({
            maxWidth: 300
        });

        google.maps.event.addListener(marker, 'click', function() {
            info.setContent(`<h3>${marker.properties.title}</h3><p>${marker.properties.name}</p>`)
            info.open(marker.get('map'), marker);
        });
        stopMarkers.push(marker);
    }
}
// İkonları ayarlar
function setIcons() {
    for (const icon of icons) {
        let marker = new google.maps.Marker({
            position: icon.position,
            icon: {
                url: icon.icon.url,
                scaledSize: new google.maps.Size(icon.icon.scaleX, icon.icon.scaleY)
            },
            map: map,
            properties: icon.properties
        });

        var info = new google.maps.InfoWindow({
            maxWidth: 300
        });

        google.maps.event.addListener(marker, 'click', function() {
            info.setContent(`<h3>${marker.properties.title}</h3><p></p>`)
            info.open(marker.get('map'), marker);
        });
        iconMarkers.push(marker);
    }
}
// Dark light butonunu ekler
function setMapStyles(defaultV) {
    function createCenterControl(map) {
        const controlButton = document.createElement("button");
        controlButton.style.backgroundColor = "#fff";
        controlButton.style.border = "0px solid #fff";
        controlButton.style.borderRadius = "3px";
        controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlButton.style.color = "rgb(25,25,25)";
        controlButton.style.cursor = "pointer";
        controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
        controlButton.style.fontSize = "25px";
        controlButton.style.lineHeight = "38px";
        controlButton.style.margin = "8px 10 22px";
        controlButton.style.padding = "0 5px";
        controlButton.style.textAlign = "center";

        if (!defaultV || defaultV == undefined || defaultV == null || defaultV == "" || defaultV == " ") {
            controlButton.textContent = "☀️"
        } else {
            controlButton.textContent = defaultV == "1" ? "☀️" : defaultV == "0" ? "🌙" : "☀️";
        }

        controlButton.type = "button";

        controlButton.addEventListener("click", () => {
            controlButton.textContent = controlButton.textContent === "🌙" ? "☀️" : "🌙"
            if (controlButton.textContent === "🌙") {
                map.setOptions({ styles: noPoiDark });
                setCookie("viewMode", "0", 365);
            } else {
                map.setOptions({ styles: noPoi });
                setCookie("viewMode", "1", 365);
            }
        });

        return controlButton;
    }
    const centerControlDiv = document.createElement("div");
    const centerControl = createCenterControl(map);
    centerControlDiv.appendChild(centerControl);

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
}

function setMapSide() {
    function createSidebarButton(map) {
        const controlButton = document.createElement("button");
        controlButton.style.backgroundColor = "#fff";
        controlButton.style.border = "0px solid #fff";
        controlButton.style.borderRadius = "3px";
        controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlButton.style.color = "rgb(25,25,25)";
        controlButton.style.cursor = "pointer";
        controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
        controlButton.style.fontSize = "25px";
        controlButton.style.lineHeight = "38px";
        controlButton.style.margin = "8px 10 22px";
        controlButton.style.padding = "0 5px";
        controlButton.style.textAlign = "center";

        controlButton.textContent = '☰'

        controlButton.type = "button";

        controlButton.addEventListener("click", () => {
            openNav()
        });

        return controlButton;
    }
    const centerControlDiv = document.createElement("div");
    const centerControl = createSidebarButton(map);
    centerControlDiv.appendChild(centerControl);

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
}