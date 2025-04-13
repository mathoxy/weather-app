let form = document.querySelector("form");
let container = document.querySelector(".container");
let input = document.querySelector("input");
let city = document.querySelector(".name");
let temperature = document.querySelector(".temperature");
let description = document.querySelector(".description");
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    if (input.value != "") {
        searchWeather()
    }
})

let id = '12dbc7b8d6bbafbddf194424cb6812d1';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

function searchWeather() {
    fetch(url+'&q='+ input.value)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            temperature.querySelector('span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;

            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
        }else{
            container.classList.add('error');
            setTimeout(() => {
                container.classList.remove('error');
            }, 100);
        }
        input.value = '';
    })
}

const initApp = () => {
    input.value = 'Rabat';
    searchWeather();
}
initApp();
