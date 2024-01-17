
var rotationDegrees = 0;

async function initializeMap() {
    try {
        // Print Map
        var map = L.map('map').setView([42.356365, -71.085250], 16.2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);
        console.log("1");
        const config = await configureMarks();
        console.log("1");

        const pinResponse = await fetch('/.netlify/functions/getPinCord');
        const pinCord = await pinResponse.json();  // Use await to get the JSON data

        const markResponse = await fetch('/.netlify/functions/getMarkCord');
        const markCord = await markResponse.json();  // Use await to get the JSON data

        const boatResponse = await fetch('/.netlify/functions/getBoatCord');
        const RCBoatCord = await boatResponse.json();  // Use await to get the JSON data


        console.log("1");

        await placeMarks(map, markCord, pinCord,  RCBoatCord, config.mark, config.pin, config.rcBoat);
        console.log("1");

        console.log("all good before boats data");
        const {sailBoat1, sailBoat2, sailBoat3} = await updateBoats(map);
        console.log("this is after boats data trying for boats data");
        return {sailBoat1, sailBoat2, sailBoat3};


    } catch (error) {
        console.error("hello it failed you fuck");
    }
};

// First we inilize the map and the course
const {sailBoat1, sailBoat2, sailBoat3} = await initializeMap();
console.log(sailBoat1);
setInterval(() => {
    moveMarker(sailBoat1, sailBoat2, sailBoat3);
}, 1000);


// Then we update the boats every second

// async function updateBoats(map){
//     boatData = await fetch('/.netlify/functions/getRacingCord');
//     console.log(boatData);

//     var boat1 = { lat: 42.35573945, lon: -71.08950355 };
//     var boat2 = { lat: 42.3553349, lon: -71.0887091 };
//     var boat3 = { lat: 42.35493035, lon: -71.08791465 };

//     const {sailBoat1, sailBoat2, sailBoat3} = await placeBoats(map, boat1, boat2, boat3);
//     return {sailBoat1, sailBoat2, sailBoat3};
// };

async function updateBoats(map){
    try {
        console.log("entered the UpdateBoats Function")
        const boatDataResponse = await fetch('/.netlify/functions/getRacingCord');
        if (!boatDataResponse.status == 200) {
            throw new Error(`Failed to fetch boat data. Status: ${boatDataResponse.status}`);
        }
        console.log("after the UpdateBoats Function")


        const boatData = await boatDataResponse.json();
        console.log(boatData);
        console.log(boatData[1]);

        // if (!boatData || !boatData.sailBoats || !Array.isArray(boatData.sailBoats) || boatData.sailBoats.length !== 3) {
        //     throw new Error("Invalid boat data received");
        // }





        // const [boat1, boat2, boat3] = boatData.sailBoats;

        // const {sailBoat1, sailBoat2, sailBoat3} = await placeBoats(map, boat1, boat2, boat3);
        // return {sailBoat1, sailBoat2, sailBoat3};
        return boatDataResponse;

    } catch (error) {
        console.error("Error updating boats:", error);
        throw error; // Rethrow the error to indicate failure
    }
}


// This will configure the pictures and return them as objects
async function configureMarks() {
    // Define a custom marker icon
    var mark = L.icon({
        iconUrl: './static/graphics/mark.png', // Specify the path to your custom icon image
        iconSize: [20, 20], // Size of the icon
        iconAnchor: [15, 15], // Point of the icon that corresponds to the marker's location
        popupAnchor: [0, -15] // Point from which the popup should open relative to the iconAnchor
    });

    var pin = L.icon({
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

    return {mark,pin,rcBoat};
}

// This will palce the marks given objects
async function placeMarks(map, markCord, pinCord, RCBoatCord, mark, pin, rcBoat){
    L.marker(markCord, { icon: mark }).addTo(map);
    L.marker(pinCord, { icon: pin }).addTo(map);
    L.marker(RCBoatCord, { icon: rcBoat }).addTo(map);

    // Starting Line
    L.polyline([pinCord, RCBoatCord], {color: 'blue', dashArray: '10, 5'}).addTo(map);
}

// given the lon and lab of the boats, this will place them on the map. (configure and place)
async function placeBoats (map, boat1, boat2, boat3){
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

    return {sailBoat1, sailBoat2, sailBoat3}
}


// testing function
function moveMarker(sailBoat1, sailBoat2, sailBoat3){

    // Update coordinates (you can implement your logic here)
    var newLat1 = sailBoat1.getLatLng().lat + 0.0001;
    var newLng1 = sailBoat1.getLatLng().lng + 0.0001;

    var newLng2 = sailBoat2.getLatLng().lng + 0.0001;
    var newLat2 = sailBoat2.getLatLng().lat + 0.0001;

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





// fetch the pin cordinates from the sever
async function fetchDataFromServer(){
    try {
        // Use fetch to make a request to the serverless function endpoint
        const response = await fetch('/.netlify/functions/getPinCord');

        // Parse the JSON response
        const data = await response.json();

        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function boatList(name, cords) {
    return { name, cords};
  }
  
  // Function to create an address
function cordList(lat, lon, angle) {
    return { lat, lon, angle };
  }