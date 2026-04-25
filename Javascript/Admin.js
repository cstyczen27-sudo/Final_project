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
});
