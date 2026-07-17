const API = "http://localhost:8080";


let train = JSON.parse(
    sessionStorage.getItem("selectedTrain")
);


if(!train){

    alert("Train not selected");
    window.location.href="trains.html";

}


document.getElementById("trainName").innerHTML =
    train.trainNumber + " - " + train.trainName;


document.getElementById("route").innerHTML =
    train.source + " → " + train.destination;



let selectedSeat = null;



window.onload = function(){

    loadSeats();

};



// When coach changes, reload seats
document.getElementById("coach")
.addEventListener("change",function(){

    selectedSeat = null;

    document.getElementById("selectedSeat").innerHTML =
    "No Seat Selected";

    loadSeats();

});





async function loadSeats(){


try{


let coach =
document.getElementById("coach").value;



let response =
await fetch(
API + "/seats/" + train.id + "/" + coach
);



let seats =
await response.json();



showSeats(seats);



}
catch(error){


console.log(error);

alert("Seat loading failed");


}


}






function showSeats(seats){


let container =
document.getElementById("seatContainer");



container.innerHTML = "";



seats.forEach(seat=>{


let button =
document.createElement("button");



button.innerHTML =
seat.seatNumber;



button.className =
seat.booked
?
"seat booked"
:
"seat";



if(!seat.booked){


button.onclick=function(){



document
.querySelectorAll(".seat")
.forEach(s=>{

s.classList.remove("selected");

});



button.classList.add("selected");



selectedSeat =
seat.seatNumber;



document.getElementById("selectedSeat")
.innerHTML =
"Selected Seat : " + selectedSeat;



};


}



container.appendChild(button);



});


}






function continueBooking(){



if(selectedSeat==null){


alert("Select seat");

return;


}



let coach =
document.getElementById("coach").value;



sessionStorage.setItem(
"selectedSeat",
selectedSeat
);



sessionStorage.setItem(
"selectedCoach",
coach
);



window.location.href =
"booking.html";


}