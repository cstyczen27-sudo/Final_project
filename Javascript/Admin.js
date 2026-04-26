console.log("The Admin file is connected")

let adminMode = false;
let formOpen = false;
let events = [];
let editIndex = -1;
let Savedevents = [];

document.getElementById("barbtn").addEventListener("click", function toggleAdmin() 
    {adminMode = !adminMode;
    if (adminMode == true){
        document.getElementById("createBtn").style.display = "block";
    } else {
        document.getElementById("createBtn").style.display = "none";
        document.getElementById("Eventcreate").style.display = "none";
        formOpen = false
    } 
    renderEvents()
});
if (document.getElementById("createBtn")) {
    document.getElementById("createBtn").addEventListener("click", function eventCreationBtn()
{if (formOpen == false){
    document.getElementById("Eventcreate").style.display = "block";
    formOpen = !formOpen
}else {
    document.getElementById("Eventcreate").style.display = "none";
    formOpen = !formOpen
}
    
    console.log();
})};

function renderEvents(filter = "") {
    let storedEvents;
    Savedevents = JSON.parse(localStorage.getItem("Savedevents")) || [];
    if (filter === "Savedevents") {
        storedEvents = JSON.parse(localStorage.getItem("Savedevents")) || [];
    } else {
        storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    }
    let eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";
    storedEvents.forEach(function(event, index) { 
        let formattedDate = new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        let formattedTime = new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
        let isSaved = Savedevents.some(e => e.title === event.title);
         if (filter === "" || filter === "Savedevents" || event.eventType === filter) {
            eventsList.innerHTML += `
                <div class="card">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5>${event.title}</h5>
                            <p>${formattedDate} at ${formattedTime}</p>
                            <p>${event.Location}</p>
                            <p>${event.eventType}</p>
                        </div>
                        <div>
                        ${adminMode ? `<button class="btn btn-dark" onclick="editEvent(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEvent(${index})">Delete</button>` 
                        : `${isSaved ? `<button class="btn btn-dark" onclick="unsaveEvent(${index})">Saved ✓</button>` 
                        : `<button class="btn btn-warning" onclick="saveEvent(${index})">Save</button>`}`}
                        </div>
                    </div>
                 </div>`;
    }});
};
if (document.getElementById("submit-btn")) {
    document.getElementById("submit-btn").addEventListener("click", function eventCreation(event){
    events = JSON.parse(localStorage.getItem("events")) || [];
    let title = document.getElementById("EventTitle").value;
    let Location = document.getElementById("location").value;
    let eventType = document.getElementById("category").value;
    let info = document.getElementById("description").value;
    let date = document.getElementById("Eventdate").value;
    let time = document.getElementById("Eventtime").value;
    let eventState = document.querySelector('input[name="eventState"]:checked').value;
    let NewEvent = {title, Location, eventType, info, date, time, eventState};
    if (editIndex === -1) {
    events.push(NewEvent);
    } else {
    events[editIndex] = NewEvent;
    editIndex = -1;
    }
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents()
});
}

function deleteEvent(index) {
    events = JSON.parse(localStorage.getItem("events")) || [];
    events.splice(index, 1);
    localStorage.setItem("events",JSON.stringify(events))
    renderEvents();
}

function editEvent(index){
    events = JSON.parse(localStorage.getItem("events"));
    let eventToEdit = events[index];
    
    document.getElementById("EventTitle").value = eventToEdit.title;
    document.getElementById("location").value = eventToEdit.Location;
    document.getElementById("category").value = eventToEdit.eventType;
    document.getElementById("description").value = eventToEdit.info;
    document.getElementById("Eventdate").value = eventToEdit.date;
    document.getElementById("Eventtime").value = eventToEdit.time;
    document.getElementById("Eventcreate").style.display = "block";
    editIndex = index;
    formOpen = true;
}
function saveEvent(index) {
    Savedevents = JSON.parse(localStorage.getItem("Savedevents")) || [];
    events = JSON.parse(localStorage.getItem("events")) || [];
    let eventToSave = events[index];
    let alreadySaved = Savedevents.some(e => e.title === eventToSave.title);
    if (!alreadySaved) {
    Savedevents.push(eventToSave);
    }
    localStorage.setItem("Savedevents", JSON.stringify(Savedevents));
    renderEvents();
}

if (document.getElementById("filter")) {
    document.getElementById("filter").addEventListener("click", function(){
    let filterValue = this.value;
    console.log(filterValue)
    renderEvents(filterValue);
});
}

function unsaveEvent(index) {
    Savedevents = JSON.parse(localStorage.getItem("Savedevents")) || [];
    events = JSON.parse(localStorage.getItem("events")) || [];
    let eventToUnsave = events[index];
    Savedevents = Savedevents.filter(e => e.title !== eventToUnsave.title);
    localStorage.setItem("Savedevents", JSON.stringify(Savedevents));
    renderEvents();
}

if (document.getElementById("eventsList")) {
    renderEvents();
}