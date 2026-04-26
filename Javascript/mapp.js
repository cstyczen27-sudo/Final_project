console.log("The mapp file is loaded")

let keyGeo = "2dc4f7e8d7ea339398ee4b8b8c309452"

function loadEventLocations() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventLocations = document.getElementById("eventLocations");
    eventLocations.innerHTML = "";
    events.forEach(function(event) {
        eventLocations.innerHTML += `
            <div class="card mb-2">
                <div class="card-body">
                    <h6>${event.title}</h6>
                    <p>${event.Location}</p>
                    <button id="mapEvent" class="btn btn-warning btn-sm" onclick="showonMap('${event.Location}')">Show on Map</button>
                </div>
            </div>
        `;
    });
}
function showonMap(location) {
    fetch(`http://api.positionstack.com/v1/forward?access_key=${keyGeo}&query=${location}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let lat = data.data[0].latitude;
        let lon = data.data[0].longitude;

        document.getElementById("mapFrame").src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
        console.log(data.data);
    });
}




loadEventLocations();
