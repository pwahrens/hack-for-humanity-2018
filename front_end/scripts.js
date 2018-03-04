var map;
var geocoder;
var markers = []
var resources = {}
resources['Food'] = 0
resources['Water'] = 0
resources['Medicine'] = 0
resources['Blankets'] = 0
resources['Toiletries'] = 0
resources['Power'] = 0


function initMap() {
    apiCall();
    document.getElementById('locationInput').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;

        // Check for enter keypress
        if (key === 13) {
            geocodeAddress(geocoder, map);
        }
    });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        mapTypeId: 'terrain',
        center: new google.maps.LatLng(37.0902, -95.7129),
        mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
          fullscreenControl: false
    });

    geocoder = new google.maps.Geocoder();

    document.getElementById('searchButton').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        map.data.setStyle(function(feature) {
            var magnitude = feature.getProperty('mag');

            return {
                icon: getCircle(magnitude)
            };
        });

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
        }
    );
}

function createMarker(address, title, icon, content, number) {

      var contentString = '<!----' + 'Hello' + '---->' +
      '<div id="content">'+
      '<div id="siteNotice">'+
            '</div>'+
                  '<h2 id="firstHeading" class="firstHeading">'+title+'</h2>'+
                  '<h3>'+content+'</h3>' +
                  '<div id="bodyContent">'+
                        '<p id="secondHeading" class="firstHeading">'+number+'</p>'+
                  '</div>'

            '</div>'+
      '</div>';


    var infowindow = new google.maps.InfoWindow({
           content: contentString
    });

    var marker = new google.maps.Marker()
        geocoder.geocode({'address': address}, function(results, status) {
            if (results === null) {
                return;
            }


        marker.setPosition(results[0].geometry.location)
        marker.setTitle(title)
        marker.setIcon(icon)
        marker.setMap(map)
        // marker.setAnimation(google.maps.Animation.DROP)

            marker.addListener('click', function() {
                infowindow.open(map, marker)
            })

        })

        markers.push(marker)

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

    // api
    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }

        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    function apiCall() {
        var url = "http://0c03c9c8.ngrok.io"
        httpGetAsync(url + "/server/main/", function(response){
            var json = JSON.parse(response)
            for (var i in json.data) {
                createMarker(json.data[i].location, "", null, json.data[i].text, json.data[i].phone_number)
                if (json.data[i].food) {
                    ++resources['Food']
                }
                if (json.data[i].water) {
                    ++resources['Water']
                }
                if (json.data[i].medicine) {
                    ++resources['Medicine']
                }
                if (json.data[i].blankets) {
                    ++resources['Blankets']
                }
                if (json.data[i].toiletries) {
                    ++resources['Toiletries']
                }
                if (json.data[i].power) {
                    ++resources['Power']
                }
            }
        })
    }
