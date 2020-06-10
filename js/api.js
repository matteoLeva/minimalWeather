//pulsantino con icona lente d'ingrandimento
let circleBtnSearch = document.querySelector("#circle-srchbar");

//barra di ricerca
const srchBar = document.querySelector("#srchbar");

//Mostra e nascondi searchbar
circleBtnSearch.onclick = function() {
//Controllo la classe del pulsantino
let controlCrclBtnSrchState = circleBtnSearch.getAttribute("class")

    if(controlCrclBtnSrchState === "not-active") {
        srchBar.removeAttribute("disabled"); //non è sicuramente il giusto metodo..
        srchBar.hidden = false;
        
        srchBar.style.opacity = "1";
        srchBar.setAttribute("class", "srchbar-anim-in");
        circleBtnSearch.setAttribute("class", "active");
        srchBar.focus()
        
    } else {
        srchBar.setAttribute("class", "srchbar-anim-out");
        circleBtnSearch.setAttribute("class", "not-active");
        srchBar.style.opacity = "0";
        srchBar.disabled = "true";
        
    }
}



//API OpenWeatherMap
const api = {
    key: "e99f804f25b81b09c170fdcceafe154f",
    apiUrl: "https://api.openweathermap.org/data/2.5/"
}

//se preme INVIO allora restituisci le informazioni
srchBar.addEventListener('keypress', setQuery);

//creo la funzione setQuery, che si attiva appena viene premuto INVIO
function setQuery(event) { 
    if(event.keyCode == 13) { //13 è l'unicode che corrisponde al tasto INVIO
        getResults(srchBar.value); //in input la città e in output le informazioni
        srchBar.value = "";
        circleBtnSearch.setAttribute("class", "not-active");
        srchbar.hidden = !srchbar.hidden;
    }
}

//creo la funzione getResults, che richiede le info all'API 
function getResults(query) {
    fetch(`${api.apiUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

//Geolocalizzazione

let coordLat;
  let coordLong;

  const successCallback = (position) => {
    doSomething(position.coords.latitude, position.coords.longitude)
    }
    const errorCallback = () => {
        console.log("A FRA SE NON ME DICI NDO VIVI COME FACCIO A DITTE ER METEO? E RAGIONA SU")
    }

let doSomething = (lat, long) => {
    coordLat = lat;
    coordLong = long;
    fetch(`${api.apiUrl}weather?lat=${coordLat}&lon=${coordLong}&units=metric&appid=${api.key}`)
  .then(weather => {
      return weather.json();
  }).then(displayResults);
  
    
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


//creo la funzione displayResults, per mostrare le informazioni prese dall'API

//----------DISPLAYRESULTS------------
function displayResults(weather) {

    //il valore può essere Clouds, Clear, etc...
    let apiMeteo = weather.weather[0].main;


    console.log("Il meteo è " + apiMeteo)
        //Rimane così perché non pensavo funzionasse, e invece :)
        function lollino() {
            console.log("CIAO AMICO MIO");
            apiMeteo = "Atmosphere"
        }
        
        //SE il valore di apiMeteo è Mist o Smoke o... ALLORA invoca la funziona, tanto l'icona è sempre la stessa
        switch(apiMeteo) {
            case "Mist":
                lollino()
                break;
            case "Smoke":
                lollino();
                break;
            case "Haze":
                lollino();
                break;
            case "Dust":
                lollino();
                break;
            case "Fog":
                lollino();
                break;
            case "Sand":
                lollino();
                break;
            case "Ash":
                lollino();
                break;
            case "Squall":
                lollino();
                break;
            case "Tornado":
                lollino();
                break;
    
        }

    
    //icona posizione
    let iconPosition = document.querySelector("#icon-position");
    iconPosition.textContent = "room";
    //nome città
    let city = document.querySelector("#nm-luogo");
    city.textContent = `${weather.name}` //sostituisce il nome della città
    //temperatura
    let temperature = document.querySelector("#temperature");
    let numberTemp = weather.main.temp;
    temperature.textContent = `${Math.round(numberTemp)}°c`;
    //icona del meteo ...
    let meteoIcon = document.querySelector(".meteo-icon");
  
    let imgUrl = apiMeteo.toLowerCase(); //trovo la cartella, avendo la lettera iniziale minuscola
    
    //giorno o notte?
    let dayornight = (weather.weather[0].icon).includes("n"); //SE l'icona contiene la lettera 'n' che sta per notte [true], ALLORA è notte, ALTRIMENTI è giorno
        
    let isDay = "-s";
    let isNight = "-m";

    //funzione che restituisce -s se giorno, -m se notte (s = sun, m = moon)
    let dOrN = () => {

            if (dayornight == true) {
                return isNight
            } else {
                return isDay
            }
        
    };
    
    //prendi l'immagine in base al meteo
    meteoIcon.setAttribute("src",`img/${imgUrl}/${imgUrl}${dOrN()}-b.png`);

    console.log(meteoIcon)
    //array con le frasi predefinite
    let frasiObj = {
    under10: "Hey guarda! Un pinguino",
    over10: "Conviene portare il cappotto",
    over20: "Non fa freddo dai",
    over25: "Una t-shirt va più che bene",
    over30: "Fa caldo assai",
    rainy: "\"Fuori piove e...\"",
    stayhome: "Conviene restare a casa...",
    snowy: "Nevica 😍",
    cloudy: "Conviene portare l'ombrello"
    }

    //cambia frase in base alla temperatura
     let frase = document.querySelector("#caption");

     for(let i = 0; i <= numberTemp; i++) {
        if(i <= 10) {
            frase.textContent = frasiObj.under10;
        } else if (i < 17) {
            frase.textContent = frasiObj.over10;
        } else if(i < 24) {
            frase.textContent = frasiObj.over20; 
        } else if(i < 29) {
            frase.textContent = frasiObj.over25;
        } else {
            frase.textContent = frasiObj.over30;
        }
        }

        //SE piove o nevica, cambia la frase
        let ifRain = meteoIcon.getAttribute("src").toString();

        if(ifRain.includes("rain")) {
            frase.textContent = frasiObj.rainy;
        } else if(ifRain.includes("snow")) {
            frase.textContent = frasiObj.snowy;
        } else if(ifRain.includes("thunderstorm")) {
            frase.textContent = frasiObj.stayhome;
        } else if(ifRain.includes("clouds")) {
            frase.textContent = frasiObj.cloudy;
        }
      
    //Temperature MIN e MAX
    let tempMinP = document.querySelector(".temp-min-p");
    tempMinP.textContent = Math.round(weather.main.temp_min) + "°";

    let tempMaxP = document.querySelector(".temp-max-p");
    tempMaxP.textContent = Math.round(weather.main.temp_max) + "°";
    
    //informazioni aggiuntive: umidità, vento ...

    //umidità
    let humidityP = document.querySelector("#humidity");
    humidityP.textContent = weather.main.humidity + "%";
    //vento
    let windP = document.querySelector("#wind");
    windP.textContent = Math.round(weather.wind.speed) + " km/h";
    //nuvole (prova a contarle hihi)
    let cloudsP = document.querySelector("#clouds");
    cloudsP.textContent = weather.clouds.all;


    //>>>>>>CHECKLIST
//aggiungi le immagini ad ogni meteo --FATTO 2/06
//cambia l'icona da geolocalizzata a posizione pin --FATTO 2/06
//sistema i giorni successivi --> Mostra informazioni necessarie --FATTO 2/06, da aggiustare l'animazione
//collega i dati aggiuntivi all'API --FATTO 4/06
//geolocalizzazione --pseudo-FATTO 5/06 --FATTO 8/06 
//temp min e max --FATTO 8/06
//mobile-first --pseudo-FATTO 8/06 --FATTO 9/06
//webpack e gitignore

} //fine funzione DisplayResults
