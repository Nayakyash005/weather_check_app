const apikey = '1742cda330b290539516219a807e13aa';
const locButton = document.querySelector('#search-bar');           
const todayInfo = document.querySelector('.today-info');
const todayWeatherIcon = document.querySelector('.today-weather i');
const todayTemp = document.querySelector('.weather-temp-l');
const dayslist = document.querySelector('.days-list');

const weatherIconMap={
'01d' : 'sun',
'01n' : 'moon',
'02d' : 'sun',
'02n' : 'moon',
'03d' : 'cloud',
'03n' : 'cloud',
'04d' : 'cloud',
'04n' : 'cloud',
'09d' : 'cloud-rain',
'09n' : 'cloud-rain',
'10d' : 'cloud-rain',
'10n' : 'cloud-rain',
'11d' : 'cloud-lightning',
'11n' : 'cloud-lightning',
'13d' : 'cloud-snow',
'13n' : 'cloud-snow',
'50d' : 'water',
'50n' : 'water',
}

function fetch_Weather_data(location){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

   fetch(apiUrl).then(Response => Response.json()).then(data =>{

    const todayWeather = data.list[0].weather[0].description;
    const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
    const todayWeatherIconcode = data.list[0].weather[0].icon;

    todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en',{weekday: 'long'});
    todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en',{day: 'numeric',month:'long',year: 'numeric'});
    todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconcode]}`;
    todayTemp.textContent = todayTemperature;
    
    const LocationElement = document.querySelector('.today-info > div > span');
    LocationElement.textContent = `${data.city.name},${data.city.country.name}`;

    const weatherdiscriptionElement = document.querySelector('.today-weather > h3');
   weatherdiscriptionElement.textContent = todayWeather;

   const todayPrescription = `${data.list[0].pop} %`;
   const todayHumidity = `${data.list[0].main.humidity} %`;
   const todayWindspeed = `${data.list[0].main.wind.speed} km/hr`;
  
   const dayinfoContainer = document.querySelector('.day-info');
   dayinfoContainer.innerHTML= `
   <div>
   <span class="title">PRECIPITATION</span>
   <span class="value">${todayPrescription}%</span>
 </div>
 <div>
   <span class="title">Humidity</span>
   <span class="value">${todayHumidity} %</span>
 </div>
 <div>
   <span class="title">wind-speed</span>
   <span class="value">${todayWindspeed} km/hr</span>
  </div> 

   `;

   const today = new Date();
   const nextdaysData = data.list.slice(1); 

   const uniquedays = new set();
   var count = 0;
   
   for(const daydata of nextdaysData){
        const forecastdate = new Date(daydata.dt_txt);
        // datAbberivation ids actually the way to represent the data in the correct form
        const dayAbbreviation = forecastdate.toLocaleDateString('en', { weekday: 'short' });
        const daytemp = `${Math.round(daydata.main.temp)}`;
        const iconCode = daydata.weather[0].icon;

        if(!uniquedays.has(dayAbbreviation) && dayAbbreviation !== today.getDate()){

            uniquedays.add(dayAbbreviation);
            dayslist.innerHTML+=`
            
            <ul class="days-list">
            <li>
                <i class='bx ${weatherIconMap[iconCode]}'></i>
                <span>${dayAbbreviation} </span>
                <span class="Weather-temp">
                    ${daytemp}°C
                </span>
            </li>
            <li>
                <i class='bx ${weatherIconMap[iconCode]}'></i>
                <span>${dayAbbreviation}</span>
                <span class="Weather-temp">
                    ${daytemp}°C
                </span>
            </li>
            <li>
                <i class='bx ${weatherIconMap[iconCode]}'></i>
                <span>${dayAbbreviation}</span>
                
                <span class="Weather-temp">
                ${daytemp}°C
                </span>
            </li>
            <li>
                <i class='bx ${weatherIconMap[iconCode]}'></i>
                <span>${dayAbbreviation}</span>
                <span class="Weather-temp">
                    ${daytemp}°C
                </span>
            </li>
        </ul>
            `;
            
        }
        
    }

}).catch(error =>{
    alert(`getting the error ${error} from app API`);
});

}


document.addEventListener('DOMContentLoaded',()=>{
    const defaultLoc = 'Gujarat';
    fetch_Weather_data(defaultLoc);
});

locButton.addEventListener('click',()=>{
const location = prompt('enter any location');
if(!location){
    alert("try Again API is not working");
}else{
    fetch_Weather_data(location);
}
})
