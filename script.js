localStorage.setItem("weatherO", getResults);
console.log(localStorage.getItem("weatherO"));




const api = {
    key: "f4b81ac464bd2c2b7467d0dc95b86d52",
    base: "https://api.openweathermap.org/data/2.5/",
}

var searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuiler(now);
    
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `Temperature: ${Math.round(weather.main.temp)}<span>°F</span>`;
     
    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerText = `Current Weather: ${(weather.weather[0].main)}`;

    let highLow = document.querySelector('.current .high-low');
    highLow.innerText = `Low/High Temp: ${Math.round(weather.main.temp_min)}°F/${Math.round(weather.main.temp_max)}°F`;

    let humidity = document.querySelector('.current .humidity');
    humidity.innerText = `Humidity: ${(weather.main.humidity)}`;

    let windEL = document.querySelector('.current .windSpeed');
    windEL.innerHTML = `Wind Speed: ${Math.round(weather.wind.speed)} <span> MPH</span>`;

}

    function dateBuiler(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

// function populateCards(weather){
//     $('.cardContainer').empty();
//     weather.forEach(weather => {
//         var newCard = $('#cardTemplate').clone();
//         newCard.removeAttr('id');
//         newCard.find('.cardTitle').text(displayResults)
//     });
//     $('cardContainer').append(newCard);
// }


