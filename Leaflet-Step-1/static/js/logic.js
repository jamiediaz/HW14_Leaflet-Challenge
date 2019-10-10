let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
});

let classicmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});

let satmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
});

// classicmap.addTo(myMap);

function markerSize(magnitude) {
    return (Math.exp(magnitude / 1.01 - 0.13)) * 1000;
}

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";





d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    // createFeatures(data.features);

    let earthquakeList = [];
    let eq0 = [];
    let eq1 = [];
    let eq2 = [];
    let eq3 = [];
    let eq4 = [];
    let eq5 = [];


    let feature = data.features;

    console.log(earthquakeList);


    for (i = 0; i < feature.length; i++) {

        earthquakeList.push([feature[i].geometry.coordinates[1],
            feature[i].geometry.coordinates[0],
            feature[i].properties.mag,
            feature[i].properties.title,
            feature[i].properties.place
        ]);

        // 0-1
        if (earthquakeList[i][2] < 1) {

            eq0.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: 1,
                color: "#000000",
                fillColor: "#00cc00",

                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

        // 1 - 2
        if (earthquakeList[i][2] >= 1 && earthquakeList[i][2] < 2) {

            eq1.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: .5,
                color: "#000000",
                fillColor: "#80ff00",
                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

        // 2 - 3
        if (earthquakeList[i][2] >= 2 && earthquakeList[i][2] < 3) {

            eq2.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: .5,
                color: "#000000",
                fillColor: "#ffff00",
                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

        //3 -4 
        if (earthquakeList[i][2] >= 3 && earthquakeList[i][2] < 4) {

            eq3.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: .5,
                color: "#000000",
                fillColor: "#ffbf00",
                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

        // 4 - 5
        if (earthquakeList[i][2] >= 4 && earthquakeList[i][2] < 5) {

            eq4.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: .5,
                color: "#000000",
                fillColor: "#ff8000",
                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

        // >=5
        if (earthquakeList[i][2] >= 5) {

            eq5.push(L.circle([earthquakeList[i][0], earthquakeList[i][1]], {
                fillOpacity: .75,
                weight: .5,
                // opacity: .5,
                color: "#000000",
                fillColor: "#ff0000",
                radius: markerSize(earthquakeList[i][2]),
            }).bindPopup(`${earthquakeList[i][3]}<hr>${earthquakeList[i][4]}`));
        };

    };




    // create faults - this was copied.  :( 
    var faults = new L.layerGroup();

    faultsURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

    d3.json(faultsURL, function(response) {
        function faultStyle(feature) {
            return {
                weight: 2,
                color: "orange"
            };
        }

        L.geoJSON(response, {
            style: faultStyle
        }).addTo(faults);
        faults.addTo(myMap)
    })



    // create control panel

    let eqLayers0 = L.layerGroup(eq0);
    let eqLayers1 = L.layerGroup(eq1);
    let eqLayers2 = L.layerGroup(eq2);
    let eqLayers3 = L.layerGroup(eq3);
    let eqLayers4 = L.layerGroup(eq4);
    let eqLayers5 = L.layerGroup(eq5);

    let baseMaps = {
        Normal: classicmap,
        Satellite: satmap

    };

    let overlayMaps = {
        "Fault Lines": faults,
        "< 1": eqLayers0,
        "1 - 2": eqLayers1,
        "2 - 3": eqLayers2,
        "3 - 4": eqLayers3,
        "4 - 5": eqLayers4,
        "5 +": eqLayers5
    };

    // load default map

    classicmap.addTo(myMap);


    // add control panel with options to map. 

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);



    // create the legend
    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'legend'),
            labels = ['<strong>Magnitude</strong>'],
            categories = ["< 1 ", "1 - 2", "2 - 3", "3 - 4", "4 - 5", "5 + "];

        for (var i = 0; i < categories.length; i++) {

            div.innerHTML +=
                labels.push(
                    '<i class="box" style="background:' + getColor(categories[i]) + '"></i> ' +
                    (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(myMap);

    function getColor(d) {
        return d == '< 1 ' ? "#00cc00" :
            d == '1 - 2' ? "#80ff00" :
            d == '2 - 3' ? "#ffff00" :
            d == '3 - 4' ? "#ffbf00" :
            d == '4 - 5' ? "#ff8000" :
            "#ff0000";
    }

});