
// defining the variables

let city = document.querySelector("#city"),
    search = document.querySelector("#submit"),
    currentImage = document.querySelector("#currentImg"),
    description = document.querySelector("#description"), 
    currentTemp = document.querySelector("#currentTemp"),
    farenheit = document.querySelector("#farenheit"),
    latitude,
    longitude;
  

// setting default data to be stored in this case, the Montreal position
const siteData = {
  
  lat: "45.54",
  lon: "-73.57"
};    


//Validation if geolocation is possible
if ("geolocation" in navigator){
  
// Getting User's location
navigator.geolocation.getCurrentPosition(positionAssign, error);

}else{
  
  storage(siteData);

}

// Failed geolocalisation function
function error(){
  storage(siteData);
  
}

// Getting User's location
function positionAssign(position){
  
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getWeatherAPI();
}

function getWeatherAPI() {
  // Calling the Weather API for data using FETCH()

  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)

    //Turning the data into json
  .then((response) =>{
    return response.json();
  })
  
  .then((data) =>{
    
    //Matching the data with the UI
    city.innerHTML = data.name;
    currentTemp.innerHTML = `${Math.floor(data.main.temp)}  &#8451`;
    currentImage.setAttribute("src", data.weather[0].icon);
    description.innerHTML = data.weather[0].description;

    // Sending necesary data to the convert function
    convert(data.main.temp)
    
  })
  //In case there would be an error, catching and logging it to the console
  .catch((error) =>{
    console.log("There was an error", error);
  })

}

// Failed geolocalisation function
// Defining Storage()

function storage(siteData){


  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${siteData.lat}&lon=${siteData.lon}`)

    //Turning the data into json
  .then((response) =>{
    return response.json();
  })
  //logging the data to the console
  .then((data) =>{
    
    //Matching the data with the UI
    city.innerHTML = data.name;
    currentTemp.innerHTML = `${Math.floor(data.main.temp)}  &#8451`;
    currentImage.setAttribute("src", data.weather[0].icon);
    description.innerHTML = data.weather[0].description;

    // Sending necesary data to the convert function
    convert(data.main.temp)
    
  })
  //In case there would be an error, catching and logging it to the console
  .catch((error) =>{
    console.log("There was an error", error);
  })

}

// Convert Celsius to Farenheit and back
//defining convert()
function convert(temp){
  farenheit.addEventListener("click", ()=>{    
      
    if (currentTemp.textContent.indexOf("℃") > -1 ){      
      
        currentTemp.innerHTML = "";
        currentTemp.innerHTML = Math.floor(temp*1.8 + 32) + "&#8457";      
      
    }else{
      currentTemp.innerHTML = "";
      currentTemp.innerHTML = Math.floor(temp) +"&#8451";
    }

  });
  
} 
  




