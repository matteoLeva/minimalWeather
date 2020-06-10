
let moreInfoContainer = document.querySelector(".moreinfo-container");
let moreInfoP = document.querySelector("#moreinfo");
let moreInfoUl = document.querySelector(".moreinfo-ul");
let arrowInfo = document.querySelector("#arrow");

//Più informazioni > Meno informazioni
moreInfoContainer.onclick = function(){
    if(moreInfoP.textContent == "Più informazioni") {

        moreInfoContainer.style.animation = "todown .4s ease-in-out  forwards"; //div che si allunga
        moreInfoP.textContent = "Meno informazioni";
        moreInfoUl.style.visibility = "visible"; //lista non ordinata resa visibile
        moreInfoUl.style.animation = "showLi .3s ease-in-out forwards .2s" //lista non ordinata animazione
        arrowInfo.style.transform = "rotate(180deg)"; //freccetta 
    } else {

        moreInfoP.textContent = "Più informazioni";
        moreInfoContainer.style.animation = "toup .4s ease-in-out forwards"; //div che si accorcia
        moreInfoUl.style.animation = "hiddenLi .2s"; //ul scompare
        arrowInfo.style.transform = "rotate(360deg)"; //freccetta 
        
    }
   
}

//Temperature min e max
let tempMin = document.querySelector("#temp-min-container");
let tempMinP = document.querySelector(".temp-min-p");
let minIcon = document.querySelector(".temp-min-icon");

let tempMax = document.querySelector("#temp-max-container");
let tempMaxP = document.querySelector(".temp-max-p");
let maxIcon = document.querySelector(".temp-max-icon");

tempMin.onclick = function showTemp() {
    let controlClass = tempMin.getAttribute("class");
    if(controlClass.includes("not-active")) {

        tempMin.setAttribute("class", "active srchbar-anim-in");
        tempMinP.removeAttribute("hidden");
        minIcon.setAttribute("hidden","")
        
    } else {
        tempMin.setAttribute("class", "not-active srchbar-anim-out");
        tempMinP.setAttribute("hidden","");
        minIcon.removeAttribute("hidden");
    }
}


tempMax.onclick = function showTemp() {
    let controlClass = tempMax.getAttribute("class");
    if(controlClass.includes("not-active")) {

        tempMax.setAttribute("class", "active srchbar-anim-in");
        tempMaxP.removeAttribute("hidden");
        maxIcon.setAttribute("hidden","")
        
    } else {
        tempMax.setAttribute("class", "not-active srchbar-anim-out");
        tempMaxP.setAttribute("hidden","");
        maxIcon.removeAttribute("hidden");
    }
}



