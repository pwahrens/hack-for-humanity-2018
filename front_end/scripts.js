//file:///Users/MasonBruce/Desktop/hack-for-humanity-2018/front_end/map.html
var map;
var geocoder;
var markers = []
var resources = {}
var markerClusterer
var types = {}

resources['Food'] = 0
resources['Water'] = 0
resources['Medicine'] = 0
resources['Blankets'] = 0
resources['Toiletries'] = 0
resources['Power'] = 0

types['Food'] = []
types['Water'] = []
types['Medicine'] = []
types['Blankets'] = []
types['Toiletries'] = []
types['Power'] = []

// Highcharts for the resource graph
var chart = Highcharts.chart('resource-graph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Needed Resources'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Quantity'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Quantity',
        colorByPoint: true,
        data: [{
            name: 'Food',
            y: resources['Food'],
            color: '#4CAF50'
        }, {
            name: 'Water',
            y: resources['Water'],
            color: '#2196F3'
        }, {
            name: 'Medicine',
            y: resources['Medicine'],
            color: '#F44336'
        }, {
            name: 'Blankets',
            y: resources['Blankets'],
            color: '#FF9800'
        }, {
            name: 'Toiletries',
            y: resources['Toiletries'],
            color: '#9C27B0'
        }, {
            name: 'Power',
            y: resources['Power'],
            color: '#FFEB3B'
        }]
    }]
});

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


    document.getElementById('refreshButton').addEventListener('click', refresh());

    var checkboxes = document.getElementsByClassName("resource-checkbox")

    for (var i = 0; i < checkboxes.length; ++i) {
        checkboxes[i].addEventListener('click', function() {
            toggleResources(this.id)

        })
    }

    map.data.setStyle(function(feature) {
        var magnitude = feature.getProperty('mag');
        return {
            icon: getCircle(magnitude)
        };
    });

    var checkboxes = document.getElementsByClassName("resource-checkbox")

    for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].addEventListener('click', function() {
                      toggleResources(this.id)
                  })
    }

}

function refresh() {
      while(markers.length > 0) {
            removeMarker(markers.pop());
        }
        apiCall();
}


function filter() {
      refresh();
      for (marker in markers) {
            for (filter in filters) {
                  for(var i in types[filters[filter]]) {
                        if (types[filters[filter]][i] === marker) {
                              removeMarker(marker)
                        }
                  }
            }
      }
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
    '<h3 id="firstHeading" class="firstHeading">'+title+'</h3>'+
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
        marker.setAnimation(google.maps.Animation.DROP)

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

// api
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
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

var filters = []

function toggleResources(resource) {
    refresh()
    var element = document.getElementById(resource + "-checkbox")
    element.checked = !element.checked
    switch(resource) {
        case 'food':
            console.log('food')
            if (element.checked == false) {
                  filters.push('Food')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Food') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                                  console.log("Removed");
                              }
                        }
                  }
            }
            break;
        case 'water':
            console.log('water')
            if (element.checked == false) {
                  filters.push('Water')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Water') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                              }
                        }
                  }
            }
            break;
        case 'medicine':
            console.log('medicine')
            if (element.checked == false) {
                  filters.push('Medicine')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Medicine') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                              }
                        }
                  }
            }
            break;
        case 'blankets':
            console.log('blankets')
            if (element.checked == false) {
                  filters.push('Blankets')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Blankets') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                              }
                        }
                  }
            }
            break;
        case 'toiletries':
            console.log('toiletries')
            if (element.checked == false) {
                  filters.push('Toiletries')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Toiletries') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                              }
                        }
                  }
            }
            break;
        case 'power':
            console.log('power')
            if (element.checked == false) {
                  filters.push('Power')
            } else {
                  for (var i = 0; i < filters.length; i++) {
                        if (filters[i] === 'Power') {
                              if (i > -1) {
                                  filters.splice(i, 1);
                              }
                        }
                  }
            }
            break;
        default:
            console.log('default')
    }

      filter()
}

function apiCall() {
    var url = "http://7ecab5ef.ngrok.io"
    httpGetAsync(url + "/server/main/", function(response){
        var json = JSON.parse(response)
        for (var i in json.data) {

            var marker = createMarker(json.data[i].location, "", null, json.data[i].text, json.data[i].phone_number)
            if (json.data[i].food) {
                ++resources['Food']

                types['Food'].push(marker)

            }
            if (json.data[i].water) {
                ++resources['Water']
                types['Water'].push(marker)
            }
            if (json.data[i].medicine) {
                ++resources['Medicine']
                types['Medicine'].push(marker)
            }
            if (json.data[i].blankets) {
                ++resources['Blankets']
                types['Blankets'].push(marker)
            }
            if (json.data[i].toiletries) {
                ++resources['Toiletries']
                types['Toiletries'].push(marker)
            }
            if (json.data[i].power) {
                ++resources['Power']
                types['Power'].push(marker)
            }
        }
        chart.update({
            series: [{
                data: [
                    resources['Food'],
                    resources['Water'],
                    resources['Medicine'],
                    resources['Blankets'],
                    resources['Toiletries'],
                    resources['Power']
                ]
            }]
        });

        markerClusterer = new MarkerClusterer(map, markers,
           {imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m',
           gridSize: 10,
           minimumClusterSize: 2});
    })
}
