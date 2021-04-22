// api url
const api_url = "http://api.openweathermap.org/data/2.5/weather?lat=37.5683&lon=126.9778&units=metric&appid=myID";

// defining async function
async function getapi(url) {

  // storing response
  const response = await fetch(url);

  // storing data in form of json
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}
// calling that async function
getapi(api_url);

// function to hide the loader
function hideloader() {
  document.getElementByID('loading').style.display = 'none';
}
// function to define innerHTML for HTML table
function show(data) {
  document.getElementByClassName("location-timezone").innerHTML = data.name;
  document.getElementByClassName("temperature-degree").innerHTML = data.main.temp;
  document.getElementByClassName("temperature-description").innerHTML = data.weather.description;
}
