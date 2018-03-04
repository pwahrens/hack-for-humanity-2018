var map;

function initMap() {
    document.getElementById('locationInput').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;

        // Check for enter keypress
        if (key === 13) {
            geocodeAddress(geocoder, map);
        }
    });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: -33.865427, lng: 151.196123},
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');


    var geocoder = new google.maps.Geocoder();

    document.getElementById('searchButton').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'data.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    var markers = []
    var marker
    for (var i in data.locations) {
        var location = data.locations[i]

        marker = createMarker(
            {lat: location.position.lat, lng: location.position.lng},
            location.title,
            location.icon,
            location.content
        )
        markers.push(marker)
    }


      map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');

            return {
              icon: getCircle(magnitude)
          };

      });

      var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


      // Prevent zooming issues on mobile
      window.addEventListener("touchstart", touchHandler, false);
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
    };
}

function eqfeed_callback(results) {
    map.data.addGeoJson(results);
}

function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('locationInput').value;

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);

            resultsMap.fitBounds(results[0].geometry.viewport);
        } else {
            if (status == 'ZERO_RESULTS') {
                alert('No cities or countries found during query');
            } else {
                alert('We could not find the city and/or country for the following reason: ' + status);
            }
        }
    });
}

function createMarker(position, title, icon, content) {
    var infowindow = new google.maps.InfoWindow({
        content: content
    })

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        icon: icon
    })

    marker.addListener('click', function() {
        infowindow.open(map, marker)
    })

    marker.setMap(map)

    return marker
}

function removeMarker(marker) {
    marker.setMap(null)
    marker = null;
}

// prevent multitouch
function touchHandler(event){
    if(event.touches.length > 1){
        event.preventDefault()
    }
}
