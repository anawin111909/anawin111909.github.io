const revealElements = document.querySelectorAll(".reveal-right");

function revealOnScroll(){

const windowHeight = window.innerHeight;

revealElements.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);

/* Project1  */
const slider = document.querySelector(".media-slider")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

let index = 0

next.onclick = () =>{
    index++
    if(index > 3) index = 0
    slider.style.transform = `translateX(-${index * 100}%)`
}

prev.onclick = () =>{
    index--
    if(index < 0) index = 3
    slider.style.transform = `translateX(-${index * 100}%)`
}