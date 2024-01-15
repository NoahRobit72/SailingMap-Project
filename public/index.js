
// Create the Map
var map = L.map('map').setView([42.356365, -71.085250], 16.2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Define a custom marker icon
var mark = L.icon({
    iconUrl: './static/graphics/mark.png', // Specify the path to your custom icon image
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [15, 15], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -15] // Point from which the popup should open relative to the iconAnchor
});

var pinFlag = L.icon({
    iconUrl: './static/graphics/pinFlag.png', // Specify the path to your custom icon image
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [15, 15], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -15] // Point from which the popup should open relative to the iconAnchor
});

var rcBoat = L.icon({
    iconUrl: './static/graphics/RCBoat.png', // Specify the path to your custom icon image
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 15], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -15] // Point from which the popup should open relative to the iconAnchor
});

// init a var
var rotationDegrees = 0;


// Setup for a traingle Course
var markCord = { lat: 42.357908, lon: -71.084098 }
var pinFlagCord = { lat: 42.356144, lon: -71.090297 }
var RCBoatCord = { lat: 42.354287, lon: -71.087197 }
// Coming soon: Gates, offset, trap courses

// Boats Start
var boat1 = { lat: 42.35573945, lon: -71.08950355 }
var boat2 = { lat: 42.3553349, lon: -71.0887091 }
var boat3 = { lat: 42.35493035, lon: -71.08791465 }

L.marker(markCord, { icon: mark }).addTo(map);
L.marker(pinFlagCord, { icon: pinFlag }).addTo(map);
L.marker(RCBoatCord, { icon: rcBoat }).addTo(map);

// Starting Line
var line = L.polyline([
    pinFlagCord,  // Starting point
    RCBoatCord  // Ending point
], {
    color: 'blue', // Line color
    dashArray: '10, 5', // Dash pattern (10 pixels dash, 5 pixels gap)
}).addTo(map);

var sailBoat1 = L.marker(boat1, {
    icon: L.divIcon({
        className: 'custom-div-icon',
        html: "<img src='./static/graphics/basicSailboat.png' style='width: 20px; height: 20px;'>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })
}).addTo(map);



var sailBoat2 = L.marker(boat2, {
    icon: L.divIcon({
        className: 'custom-div-icon',
        html: "<img src='./static/graphics/basicSailboat.png' style='width: 20px; height: 20px;'>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })
}).addTo(map);

var sailBoat3 = L.marker(boat3, {
    icon: L.divIcon({
        className: 'custom-div-icon',
        html: "<img src='./static/graphics/basicSailboat.png' style='width: 20px; height: 20px;'>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })
}).addTo(map);


// Boats End

// testing function
function moveMarker(){
    // Update coordinates (you can implement your logic here)
    var newLat1 = sailBoat1.getLatLng().lat + 0.0001;
    var newLng1 = sailBoat1.getLatLng().lng + 0.0001;

    var newLat2 = sailBoat2.getLatLng().lat + 0.0001;
    var newLng2 = sailBoat2.getLatLng().lng + 0.0001;

    var newLat3 = sailBoat3.getLatLng().lat + 0.0001;
    var newLng3 = sailBoat3.getLatLng().lng + 0.0001;


    // Move the marker to the new coordinates
    sailBoat1.setLatLng([newLat1, newLng1]);
    sailBoat2.setLatLng([newLat2, newLng2]);
    sailBoat3.setLatLng([newLat3, newLng3]);


    // Update the rotation (you can implement your logic here)

    var randomValue = Math.random();
    randomValue < 0.5 ? -1 : 1;
    
    var rotationDegrees1 = 0 + ((Math.random() * 60) * randomValue); // Example: Random rotation angle
    var rotationDegrees2 = 0 + ((Math.random() * 60) * randomValue); // Example: Random rotation angle
    var rotationDegrees3 = 0 + ((Math.random() * 60) * randomValue); // Example: Random rotation angle


    // Rotate the image inside the marker
    var imgElement1 = sailBoat1.getElement().querySelector('img');
    var imgElement2 = sailBoat2.getElement().querySelector('img');
    var imgElement3 = sailBoat3.getElement().querySelector('img');

    imgElement1.style.transform = 'rotate(' + rotationDegrees1 + 'deg)';
    imgElement2.style.transform = 'rotate(' + rotationDegrees2 + 'deg)';
    imgElement3.style.transform = 'rotate(' + rotationDegrees3 + 'deg)';
} 
// Set an interval to update the marker every 1000 milliseconds (1 second)
setInterval(moveMarker, 1000);
