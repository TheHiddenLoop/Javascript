const apikey="API-KEY";
const input=document.querySelector("input");
const btn=document.getElementById("btn");

const icon = document.querySelector("#icon");
const weather = document.querySelector("#weather");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");


btn.addEventListener("click",()=>{
    let city=input.value;

    getWeather(city);
    
})

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon" />`;

            const weatherCity=data.name;
            const watherContry=data.sys.country;
            weather.innerHTML=`${weatherCity}, ${watherContry}`

            const weatherTemp=data.main.temp;
            let temp=Math.round(weatherTemp);
            temperature.innerHTML=`${temp}°C`

            const weatherHumiy=data.main.humidity;
            humidity.innerHTML=`Humidity: ${weatherHumiy}`

            const weatherDes=data.weather[0].description;

            description.innerHTML=`${weatherDes}`
            console.log(data);
            
    })
        .catch(error => console.error('Error:', error));
}




