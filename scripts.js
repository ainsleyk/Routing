function Hide(HideID)
{
  HideID.style.display = "none";
}

var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/ainsleykm/ck3c6e5yq20pa1cphuqs9rqer/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox,</a> Icons: <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik',
    maxZoom: 18
}).addTo(map);

L.easyButton('<img src="pin.png">', function(btn, map){
    map.locate({setView: true, maxZoom: 16});;
}).addTo(map);


var control = L.Routing.control({
    waypoints: [
      null
        // L.latLng(47.246587, -122.438830),
        // L.latLng(47.258024, -122.444725),
        // L.latLng(47.318017, -122.542970)
    ],
    router: L.Routing.mapbox('pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ'),
    geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ'),
    routeWhileDragging: true,
    units:'imperial',
    collapsible: true,
    show: false,
    reverseWaypoints: true
}).addTo(map);


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Starting Location', container),
        destBtn = createButton('Go to this location', container);
            L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
              });
            L.DomEvent.on(destBtn, 'click', function() {
                  control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                  control.show();
                  map.closePopup();
              });
    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
 });
