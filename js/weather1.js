window.addEventListener('load', ()=> {
  let longi;
  let lati;
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longi = position.coords.longitude;
      lati = position.coords.latitude;

      consto proxy 'https://cors-anywhere.herokuapp.com/';
      const api = '${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=myID';

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data =>{
          const {temp, description} = data.currently; // in the tutorial only;
          // Set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;

        })
    });
  } /* else {
    h1.textContent = "This ain't working properly"
  } */

})

//
// http://api.openweathermap.org/data/2.5/weather?lat=37.5683&lon=126.9778&units=metric&appid=myID
//
// {
//    "coord":{
//       "lon":126.9778,
//       "lat":37.5683
//    },
//    "weather":[
//       {
//          "id":800,
//          "main":"Clear",
//          "description":"clear sky",
//          "icon":"01n"
//       }
//    ],
//    "base":"stations",
//    "main":{
//       "temp":21.01,
//       "feels_like":20.21,
//       "temp_min":20,
//       "temp_max":23,
//       "pressure":1020,
//       "humidity":40
//    },
//    "visibility":10000,
//    "wind":{
//       "speed":3.09,
//       "deg":290
//    },
//    "clouds":{
//       "all":0
//    },
//    "dt":1619004108,
//    "sys":{
//       "type":1,
//       "id":8105,
//       "country":"KR",
//       "sunrise":1618951757,
//       "sunset":1618999921
//    },
//    "timezone":32400,
//    "id":1835848,
//    "name":"Seoul",
//    "cod":200
// }
