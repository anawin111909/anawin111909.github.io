const revealElements = document.querySelectorAll(".reveal-right, .reveal-left");

function revealOnScroll(){

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < triggerBottom){
            el.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
