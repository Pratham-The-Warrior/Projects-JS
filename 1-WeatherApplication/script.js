const apiKey = "ee43c78f86801842db540b5d9f22a3d6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    if (weatherMain === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherMain === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/default.png"; // Optional fallback
    }

    // Save the city to localStorage
    localStorage.setItem("lastCity", city);
  } catch (error) {
    alert(error.message);
  }
}

// Handle search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

// Load last city on page load
window.addEventListener("load", () => {
  const savedCity = localStorage.getItem("lastCity");
  if (savedCity) {
    checkWeather(savedCity);
  }
});
