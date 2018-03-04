var map;
var geocoder;

function initMap() {
    document.getElementById('locationInput').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;

        // Check for enter keypress
        if (key === 13) {
            geocodeAddress(geocoder, map);
        }
    });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat:  37.0902, lng: -95.7129},

        mapTypeId: 'terrain'
    });

    geocoder = new google.maps.Geocoder();

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

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
            location.address,
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
    return resultsMap.center
}

<<<<<<< HEAD
function createMarker(address, title, icon, content) {
=======
function createMarker(position, title, icon, content) {

      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
            '</div>'+
                  '<h2 id="firstHeading" class="firstHeading">'+title+'</h2>'+
                  '<h2 id="firstHeading" class="firstHeading">'+''+'</h2>'+
                  '<div id="bodyContent">'+
                  '<p>'+content+'</p>'
            '</div>'+
      '</div>';

>>>>>>> d232ce2b39efacacbe3e1354767be472823ae518
    var infowindow = new google.maps.InfoWindow({
           content: contentString
    });

    var position

    /*
    geocoder.geocode({'address': address}, function(results, status) {
        console.log(results[0].geometry.location)
        position.push(results[0].geometry.location)
    })

    console.log(position[0])
    */

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
