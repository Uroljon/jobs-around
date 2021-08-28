//Accordeon component 
let accordionTogglers = document.querySelectorAll(".accordion-item-toggler");
accordionTogglers.forEach(function (toggler) {
    toggler.addEventListener("click", function (e) {
        let accordionBody = e.target.nextElementSibling;
        // accordionBody.classList.toggle("collapse"); // css bilan (js inline style) uncha chiqishmas ekan
        if (accordionBody.style.maxHeight) {//yopdi
            accordionBody.style.maxHeight = null;
            e.target.firstElementChild.className = "fa fa-folder-o";
        } else {//ochdi
            accordionTogglers.forEach(function (othertogglers) { //qolganlarini yopdi va targetni ochdi
                othertogglers.nextElementSibling.style.maxHeight = null;
                othertogglers.firstElementChild.className = "fa fa-folder-o";
            })
            accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`; //height is set according to its content's height
            e.target.firstElementChild.className = "fa fa-folder-open-o";
        }
    })

});

// toggle component content
let componentTriggers = document.querySelectorAll(".component-trigger");
componentTriggers.forEach(function (li) {
    li.addEventListener("click", (e) => {

        componentTriggers.forEach((otherLiElements) => {
            otherLiElements.classList.remove("active");//qolgan li lardan active ni olib tashadi
        })
        e.target.classList.add("active");//bosilgan li ga active class qo'shdi

        let target = li.dataset.target;
        let otherComponents = document.querySelectorAll(".component-content");
        otherComponents.forEach((otherComponent) => {
            otherComponent.style.display = "none";//noshqa componentlarni o'chirdi
        });
        document.querySelector(`.${target}`).style.display = "block";//target componentni yoqdi
    })
})

