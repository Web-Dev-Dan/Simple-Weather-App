// Button Functionality
const apiKey = '84f6f4d0561b37b364b619246ea847fa';
let cityName;

const cityInput = document.getElementById('cityInput');
const fetchBtn = document.getElementById('fetchBtn');

fetchBtn.addEventListener('click', searchWeather);

function searchWeather() {
    if (cityInput.value) {
        cityName = cityInput.value;
        fetchWeather(cityName);
        cityInput.value = '';
    } else {
        return;
    }
}

function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let weather = data.weather[0].main;
            let temperature = data.main.temp;
            let name = data.name;
            createCard(weather, temperature, name);
        })
        .catch(error => {
            console.log(error);
        })
}

function createCard(weather, temperature, name) {
    // CREATE CARD:
    const cardArea = document.getElementById('cardArea');

    // New Card
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    // cardArea.appendChild(newCard);
    cardArea.prepend(newCard);

    // New Delete Button
    const newCardDeleteBtn = document.createElement('button');
    newCardDeleteBtn.classList.add('delete-card-btn');
    newCard.appendChild(newCardDeleteBtn);

    const newDeleteIcon = document.createElement('i');
    newDeleteIcon.classList.add('delete-icon', 'fa-solid', 'fa-xmark');
    newCardDeleteBtn.appendChild(newDeleteIcon);

    // New Header
    const newCardHeader = document.createElement('p');
    newCardHeader.classList.add('card-title');
    newCardHeader.textContent = name;
    newCard.appendChild(newCardHeader);

    // New Icon
    const newCardIcon = document.createElement('i');
    newCardIcon.classList.add('card-icon');
    // Add more options for weather icons
    // (Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado)

    if (weather === 'Clear') {
        newCardIcon.classList.add('fa-solid', 'fa-sun');
        newCard.classList.add('card--sunny');
    } else if (weather === 'Clouds') {
        newCardIcon.classList.add('fa-solid', 'fa-cloud');
        newCard.classList.add('card--cloudy');
    } else if (weather === 'Snow') {
        newCardIcon.classList.add('fa-solid', 'fa-snowflake');
        newCard.classList.add('card--snowy');
    } else if (weather === 'Rain' || weather === 'Drizzle') {
        newCardIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy');
        newCard.classList.add('card--rainy');
    } else if (weather === 'Thunderstorm') {
        newCardIcon.classList.add('fa-solid', 'fa-cloud-bolt');
        newCard.classList.add('card--stormy');
    } else if (weather === 'Tornado' || weather === 'Squall') {
        newCardIcon.classList.add('fa-solid', 'fa-wind');
        newCard.classList.add('card--windy');
    } else {
        newCardIcon.classList.add('fa-solid', 'fa-cloud');
        newCard.classList.add('card--cloudy');
    }
    newCard.appendChild(newCardIcon);

    // New Temperature
    const newCardTemperature = document.createElement('p');
    newCardTemperature.classList.add('card-temperature');
    newCardTemperature.textContent = `${Math.round(temperature)}°C`;
    newCard.appendChild(newCardTemperature);

    // New Description
    const newCardDescription = document.createElement('p');
    newCardDescription.classList.add('card-description');
    newCardDescription.textContent = weather;
    newCard.appendChild(newCardDescription);
}

document.addEventListener('click', (e) => {
    const clickedArea = e.target;

    if (clickedArea.classList.contains('delete-icon') || clickedArea.classList.contains('delete-card-btn')) {
        let selectedCard;

        if (clickedArea.classList.contains('delete-icon')) {
            const selectedButton = clickedArea.parentElement;
            selectedCard = selectedButton.parentElement;
            selectedCard.remove();
        } else if (clickedArea.classList.contains('delete-card-btn')) {
            selectedCard = clickedArea.parentElement;
            selectedCard.remove();
        }
    } else {
        return;
    }
})
