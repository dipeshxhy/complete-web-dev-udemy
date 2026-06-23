const cityInput = document.getElementById('city-input');
const weatherBtn = document.getElementById('get-weather-btn');
const weatherInfoContainer = document.getElementById('weather-info');
const errorMessageContainer = document.getElementById('error-message');

const API_KEY = '5bd2341514df392f9e0d8740828ea93e';

const tempInCelsius = (tempInKelvin) => {
  return (tempInKelvin - 273.15).toFixed(2);
};

// display: error
function displayError(message) {
  errorMessageContainer.classList.remove('hidden');
  errorMessageContainer.innerHTML = `<p>${message}</p>`;
}
function geoCoding(city) {
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const { lat, lon } = data[0];
        getWeather(lat, lon);
      } else {
        displayError('City not found.');
      }
    })
    .catch((error) => {
      console.error('Error fetching geocoding data:', error);
      displayError('Error fetching geocoding data.');
    });
}
function reset() {
  weatherInfoContainer.classList.add('hidden');
  errorMessageContainer.classList.add('hidden');
}

function getWeather(lat, lon) {
  reset();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // Display weather information
      weatherInfoContainer.classList.remove('hidden');
      weatherInfoContainer.innerHTML = `
        <h2><strong>${data.name}</strong> 🏙️ <span>${data.sys.country}🏞️</span> </h2>
        <p><strong>Temperature:</strong> ${tempInCelsius(data.main.temp)} °C 🌡️ </p>
        <p><strong>Weather:</strong> ${data.weather[0].description} 🌤 ️</p>
        <hr />
        <p><strong>sunrise 🌅:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p><strong>sunset 🌇:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      displayError('Error fetching weather data.');
    });
}

weatherBtn.addEventListener('click', () => {
  reset();
  const city = cityInput.value.trim();
  if (city) {
    geoCoding(city);
  } else {
    displayError('Please enter a city name.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  reset();
  cityInput.value = 'Kathmandu';
  geoCoding('Kathmandu');
  // keyboad enter event
  cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      weatherBtn.click();
    }
  });
});
