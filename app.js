"use strict";
const getMap = function(){
  // On initialise la latitude et la longitude de Marselle (centre de la carte)
  let mymap = L.map("mapid").setView([43.2944724, 5.3601373], 16);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
  let marker = L.marker([43.2944724, 5.3601373], 16).addTo(mymap);
};
getMap();

const btn = document.querySelector("button");
const inputInfo = document.querySelector("input");
const divResult = document.querySelector(".result")

 
// console.log(divResult);
// console.log(btn, inputInfo);

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
        const resultDeCherch = `
        <li>${result}</li>`
      //  console.log(resultDeCherch);
       divResult.insertAdjacentHTML("beforeend", resultDeCherch);
      
    });
    const listBl = document.querySelectorAll('li');
    console.log(listBl);
    
    //// creer un function pour choissir un element de li
  });
};
inputInfo.addEventListener("keyup", () => {
  autoComplet(inputInfo.value);

} )



// const meteoFun = function(){
//   fetch(`api.openweathermap.org/data/2.5/weather?q=${}&appid=2521e64289208e681d392934a06cd2cd`, {
//     method: "GET",
//     body: JSON.stringify({ query: inputInfo.value, hitsPerPage: '3' })
//   })
//   .then(response => response.json())
//   .then((dataMeteo) => {
//     console.log(dataMeteo); // Look at local_names.default
//   });
  
// };

// const searchAlgoliaPlaces = (event) => {
//   fetch("https://places-dsn.algolia.net/1/places/query", {
//   method: "POST",
//   body: JSON.stringify({ query: inputInfo.value })
//   })
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data)
//   });
  
//  };
//  btn.addEventListener("keyup", searchAlgoliaPlaces);












