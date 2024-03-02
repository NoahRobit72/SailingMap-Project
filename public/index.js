async function initializeMap() {
    try {
        // Print Map
        var map = L.map('map').setView([42.356365, -71.085250], 16.2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

        const {sailBoat1} = await inilizeBoat(map);
        return {sailBoat1};

    } catch (error) {
        console.error("hello it failed you fuck");
    }
};

async function placeBoats (map, boat1){
    var sailBoat1 = L.marker(boat1, {
        icon: L.divIcon({
            className: 'custom-div-icon',
            html: "<img src='./static/graphics/basicSailboat.png' style='width: 20px; height: 20px;'>",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        })
    }).addTo(map);

    return {sailBoat1}
}

async function inilizeBoat(map){
    try {
        const response = await fetch('/.netlify/functions/getCSV?time=0');
        const boatData = await response.json();

        const boat1 = cordList(boatData.lat, boatData.lon, boatData.angle )

        const {sailBoat1} = await placeBoats(map, boat1);
        return {sailBoat1};

    } catch (error) {
        console.error("Error updating boats:", error);
        throw error; // Rethrow the error to indicate failure
    }
}

var count = 0;

const {sailBoat1} = await initializeMap();
setInterval(async () => {
    count = count + 1;

    console.log("updating display");
    try {
        await moveBoats(sailBoat1, count);

    } catch (error) {
        console.error("Error fetching CSV data:", error);
    }
}, 300);



// testing function
async function moveBoats(sailBoat1, time){

    var stringToSend = "/.netlify/functions/getCSV?time=" + time.toString()
    const response = await fetch(stringToSend);
    const boatData = await response.json();


    // Update coordinates (you can implement your logic here)
    var newLat1 = boatData.lat;
    var newLng1 = boatData.lon;

    // Move the marker to the new coordinates
    sailBoat1.setLatLng([newLat1, newLng1]);

    // Rotate the image inside the marker
    var imgElement1 = sailBoat1.getElement().querySelector('img');


    imgElement1.style.transform = 'rotate(' + boatData.angle + 'deg)';
} 

function cordList(lat, lon, angle) {
    return { lat, lon, angle};
}