const API_URL = "http://localhost:8080/trains";


document.querySelector(".search-btn")
.addEventListener("click", searchTrains);


window.onload = function(){

    loadAllTrains();

};



async function loadAllTrains(){

    try{

        const response = await fetch(API_URL);

        const trains = await response.json();

        displayTrains(trains);

    }
    catch(error){

        console.log(error);

        alert("Unable to load trains");

    }

}





async function searchTrains(){


    let source =
    document.getElementById("from").value.trim();


    let destination =
    document.getElementById("to").value.trim();



    if(source=="" || destination==""){

        alert("Enter source and destination");

        return;

    }



    try{


        let response =
        await fetch(
        `${API_URL}/search?source=${source}&destination=${destination}`
        );


        let trains =
        await response.json();



        displayTrains(trains);


    }
    catch(error){

        console.log(error);

    }

}







function displayTrains(trains){


    let container =
    document.getElementById("trainContainer");


    container.innerHTML="";



    trains.forEach(train=>{


        container.innerHTML += `


<div class="card shadow mb-4">


<div class="card-body">


<h4 class="text-primary">

<i class="bi bi-train-front-fill"></i>

${train.trainNumber} -
${train.trainName}

</h4>



<p>

${train.source}

➜

${train.destination}

</p>



<div class="row">


<div class="col-md-3">

Departure

<br>

<b>${train.departureTime}</b>

</div>


<div class="col-md-3">

Arrival

<br>

<b>${train.arrivalTime}</b>

</div>


<div class="col-md-3">

Seats

<br>

<b>${train.availableSeats}</b>

</div>



<div class="col-md-3">

Fare

<br>

<b>₹${train.fare}</b>

</div>


</div>



<button

class="btn btn-success mt-3"

onclick="selectTrain(${train.id})">


Select Seat


</button>



</div>


</div>


`;



    });



}





function selectTrain(id){


fetch(API_URL+"/"+id)

.then(res=>res.json())

.then(train=>{


sessionStorage.setItem(
"selectedTrain",
JSON.stringify(train)
);



window.location.href="seat-selection.html";



});


}