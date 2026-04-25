console.log("The Js file is connected")

let adminMode = false;
let formOpen = false;
let events = [];

document.getElementById("barbtn").addEventListener("click", function toggleAdmin() 
    {adminMode = !adminMode;
    if (adminMode == true){
        document.getElementById("createBtn").style.display = "block";
    } else {
        document.getElementById("createBtn").style.display = "none";
        document.getElementById("Eventcreate").style.display = "none";
        formOpen = false
    } 
});

document.getElementById("createBtn").addEventListener("click", function eventCreationBtn()
{if (formOpen == false){
    document.getElementById("Eventcreate").style.display = "block";
    formOpen = !formOpen
}else {
    document.getElementById("Eventcreate").style.display = "none";
    formOpen = !formOpen
}
    
    console.log();
});
function renderEvents() {
    let storedEvents = JSON.parse(localStorage.getItem("events"));
    let eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";
    storedEvents.forEach(function(event, index) {
        eventsList.innerHTML += `
           <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${event.title}</h5>
                        <p>${event.date} at ${event.time}</p>
                        <p>${event.Location}</p>
                    </div>
                    <div>
                        <button class="btn btn-dark" onclick="editEvent(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEvent(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

document.getElementById("submit-btn").addEventListener("click", function eventCreation(event)
   {event.preventDefault(); 
    console.log("submit clicked");
    let title = document.getElementById("EventTitle").value;
    let Location = document.getElementById("location").value;
    let eventType = document.getElementById("category").value;
    let info = document.getElementById("description").value;
    let date = document.getElementById("Eventdate").value;
    let time = document.getElementById("Eventtime").value;
    let eventState = document.querySelector('input[name="eventState"]:checked').value;
    let NewEvent = {title, Location, eventType, info, date, time, eventState};
    events.push(NewEvent);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents()
});

function deleteEvent(index) {
    events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events",JSON.stringify(events))
    renderEvents();
}

function editEvent(index){
    events = JSON.parse(localStorage.getItem("events"));
}
