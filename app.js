"use strict";
// afichage d'un carte 
const getMap = function(lat, lon){
  let container = L.DomUtil.get('mapid');
      if(container != null){
        container._leaflet_id = null;
      }
  // On initialise la latitude et la longitude de Marselle (centre de la carte)
  let mymap = L.map("mapid").setView([lat, lon], 11);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
};
getMap(43.2944724, 5.3601373);

const btn = document.querySelector("button");
const inputInfo = document.querySelector("input");
const divResult = document.querySelector(".result");
const divMeteo = document.querySelector(".divMeteo");
const divChar = document.querySelector("#myChart");



// console.log(city,temp,weather);


///// Autocompletion
function autoComplet(letter){
  
  divResult.innerHTML = "";
  fetch("https://places-dsn.algolia.net/1/places/query", {
  method: "POST",
  body: JSON.stringify({ query: inputInfo.value, hitsPerPage: '3' })
  })
  .then(response => response.json())
  .then((data) => {
    // console.log(data);
    data.hits.forEach((elem) => {
      // console.log(elem);
      
       let result = (elem.locale_names.default[0]);
       divResult.insertAdjacentHTML("beforeend",
        `<button class="elementOfListCity">${elem.locale_names.default[0]}</button>`);
        
      });
      // creation des constantes pour les utileser à l'avenir 
      const listCity = document.querySelectorAll(".elementOfListCity")
      for (let i = 0; i < listCity.length; i++) {
          const elementCity = listCity[i];
          elementCity.addEventListener("click", ()=>{
            // demande un function de la meteo
              meteoFun(elementCity.textContent);
              getStatique(elementCity.textContent);

          })
      }
  });

};
inputInfo.addEventListener("keyup", () => {
  autoComplet(inputInfo.value);

} )
// Creation d'une function pout la meteo
const meteoFun = function(city){
  divMeteo.innerHTML = "";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2521e64289208e681d392934a06cd2cd`, {
  })
  .then(response => response.json())
  .then((dataMeteo) => {
    // console.log(dataMeteo); // Look at local_names.default


    // ajouter des elements dans un div
    divMeteo.insertAdjacentHTML("beforeend",
    `<h2>${dataMeteo.name}</h2>
    <h2>${dataMeteo.main.temp - 273,15} Celsius</h2>
    <h2>${dataMeteo.weather[0].main}</h2>`);
    getMap(dataMeteo.coord.lat, dataMeteo.coord.lon);
  });
  
};
const getStatique = (city)=>{
  // creer une requet pour  la meteo  
  const cinqJours =[];
  const tempJours =[];    
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=2521e64289208e681d392934a06cd2cd`)
  .then(response => response.json())
  .then((data) => {
      console.log(data);
      data.list.forEach((element)=>{
          if(element.dt_txt.includes("12:00:00")){
            cinqJours.push(element.dt_txt)
            tempJours.push(element.main.temp)   
          }
      })
            console.log(cinqJours,tempJours);
          chartDiv()
  });
  const chartDiv = ()=> {
    let ctx = document.getElementById('myChart').getContext('2d');
    const config = {
        type: 'line',
        data: {
            labels: ['jour1', 'jour2', 'jour3', 'jour4', 'jour5'],
            datasets: [{
                label: 'prochains jours',
                data:tempJours,
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
        }};
    let myChart = new Chart(ctx,config)    
};   
}
meteoFun("marseille");
getStatique("marseille");
 















