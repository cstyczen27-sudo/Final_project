console.log("The Js file is connected")

let adminMode = false;

document.getElementById("barbtn").addEventListener("click", function toggleAdmin() 
    {adminMode = !adminMode;
    console.log(adminMode);
});
console.log(adminMode);
