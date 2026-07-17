// Navbar background on scroll

window.addEventListener("scroll",function(){

    const navbar=document.querySelector(".navbar");


    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});




// Smooth mobile navbar close

const navLinks=document.querySelectorAll(".nav-link");

const navbarCollapse=document.querySelector(".navbar-collapse");


navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        if(navbarCollapse.classList.contains("show")){

            new bootstrap.Collapse(navbarCollapse).hide();

        }

    });

});




// Simple counter animation

const counters=document.querySelectorAll(".stats h2");


counters.forEach(counter=>{


    let target=parseInt(counter.innerText);

    let count=0;


    let interval=setInterval(()=>{


        count+=Math.ceil(target/100);


        if(count>=target){

            counter.innerText=target+"+";

            clearInterval(interval);

        }

        else{

            counter.innerText=count+"+";

        }


    },20);


});