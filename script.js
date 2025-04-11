const apiKey = ""; // Your API key

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");
  const error = document.getElementById("error-message");
  const loader = document.getElementById("loader");

  if (!city) {
    error.style.display = "block";
    error.textContent = "Please enter a city name.";
    result.style.display = "none";
    return;
  }

  loader.style.display = "block";
  error.style.display = "none";
  result.style.display = "none";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    const weatherMain = data.weather[0].main;
    const temperature = data.main.temp;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const prediction = predictWeather(weatherMain, temperature);

    result.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Condition:</strong> ${weatherMain}</p>
      <p><strong>Temperature:</strong> ${Math.round(temperature)}°C</p>
      <img src="${iconUrl}" alt="Weather icon" />
      <p><strong>Prediction:</strong> ${prediction}</p>
    `;

    result.style.display = "block";
  } catch (err) {
    error.style.display = "block";
    error.textContent = err.message;
  } finally {
    loader.style.display = "none";
  }
});

// Custom prediction logic
function predictWeather(weather, temperature) {
  if (temperature >= 25) {
    return "Hot Weather";
  } else if (temperature < 25 && weather === "Clear") {
    return "Clear";
  } else if (temperature < 15 && weather === "Clouds") {
    return "Cold";
  } else if (temperature < 5 && weather === "Snow") {
    return "Snowy";
  } else {
    return "Unknown";
  }
}
