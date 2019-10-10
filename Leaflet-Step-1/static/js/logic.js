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

    


    // this was copied.  :( 
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



    // Also copied  :( 

    // var legend = L.control({ position: "bottomright" });

    // legend.onAdd = function(map) {

    //     var legendDiv = L.DomUtil.create('div', 'info legend'),

    //         labels = ["< 1 ", "1 - 2", "2 - 3", "3 - 4", "4 - 5", "5 + "];

    //     for (var i = 0; i < labels.length; i++) {
    //         legendDiv.innerHTML += '<i style="background:' + getColor(labels[i]) + '"></i>' +
    //             labels[i] + '<br>';
    //     }

    //     return legendDiv;
    // };

    // function getColor(mag) {
    //     return mag == "5 + " ? "#ff0066" :
    //         mag == "4 - 5" ? "#ff5050" :
    //         mag == "3 - 4" ? "#ff9999" :
    //         mag == "2 - 3" ? "#ffffcc" :
    //         mag == "1 - 2" ? "#99ff99" :
    //         "#00ff00"

    // };

    // legend.addTo(myMap);

    // let eqLayers = [];

    // eqLayers.push(eq0, eq1, eq2, eq3, eq4, eq5)

    // console.log(eqLayers);

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

   

  

    classicmap.addTo(myMap);


    // console.log(eq0);

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);



let colorList = {"5 +": "#ff0000",
                 "4 - 5": "#ff8000",
                 "3 - 4": "#ffbf00",
                 "2 - 3": "#ffff00",
                 "1 - 2": "#80ff00",
                 "< 1": "#00cc00"};

colorize = function(colorList) {

 let container = document.getElementById('legend');
 
 for (let key in colorList) {
    let boxContainer = document.createElement("DIV");
     let box = document.createElement("DIV");
     let label = document.createElement("SPAN");

     label.innerHTML = key;
     box.className = "box";
     box.style.backgroundColor = colorList[key];

     boxContainer.appendChild(box);
     boxContainer.appendChild(label);

     container.appendChild(boxContainer);
 }}

//  colorize(colorList);

 

 
    // create the legend
    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = colorize(colorList);

    // legend.addTo(myMap);

    



});





//   function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     }

//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature

//     });

//     console.log(earthquakes);

//     // Sending our earthquakes layer to the createMap function
//     createMap(earthquakes);
//   }

//   function createMap(earthquakes) {

// Define streetmap and darkmap layers


//     var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: API_KEY
//     });

//     // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//       "Street Map": streetmap,
//       "Dark Map": darkmap
//     };

//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };

//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 5,
//       layers: [streetmap, earthquakes]
//     });

//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(myMap);
//   }