"use strict";
 let oke
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




const btn = document.querySelector("button");
const inputInfo = document.querySelector("input");
// console.log(btn, inputInfo);



let errorCathch; 
  let url = `https://places-dsn.algolia.net/1/places/query`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        btn.addEventListener('click', function(){
            // console.log(inputInfo.value);
            let found = false;
            data.hits.forEach(function(elem) {              
                if(elem.locale_names.default[0].toLowerCase().includes(inputInfo.value.toLowerCase())){
                  found =true;
                }
              });
              if(found == true){
                console.log("trouve")
    
              }else {
                console.log("pas trouve")
              }
              
            });
          })
    .catch((err) => {
      // fonction pour gérer les erreurs
      console.log("mon erreur est :" + err); // si erreur(s) j'affiche laquelle en console
    });












