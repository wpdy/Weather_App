import { useState } from "react";
import GetWeatherInfo from "./services/getWeatherInfo";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

interface weatherType {
  name: string;
  main: {
    temp: number;
    humidity: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<weatherType>();

  const searchPressed = async () => {
    const data = await GetWeatherInfo(search);
    console.log(data);
    setWeatherData(data);
    setSearch("");
  };

  function weatherCondition(condition: string) {
    switch (condition) {
      case "Clouds":
        return "./cloud.png";
      case "Clear":
        return "./clear.png";
      case "Drizzle":
        return "./drizzle.png";
      case "Rain":
        return "./rain.png";
      case "Snow":
        return "./snow.png";
      default:
        return "No weather Type";
    }
  }

  return (
    <div className="main-container">
      <div className="WeatherCard">
        <div className="WeatherCardHeader">
          <Input
            type="text"
            placeholder="Enter City..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            size="lg"
            startDecorator={<img src="./search.png" alt="weather type" />}
            endDecorator={
              <Button onClick={() => searchPressed()}>Sumbit</Button>
            }
          />
        </div>

        <div className="WeatherCardFooter">
          {weatherData ? (
            <>
              <img
                className="weather-image"
                src={weatherCondition(weatherData.weather[0].main)}
                alt="weather type"
              />
              <div className="weather-temp">
                {Math.round(weatherData.main.temp)}°c
              </div>
              <div className="weather-location">{weatherData.name}</div>

              <div className="data-container">
                <div className="element">
                  <img
                    src="./humidity.png"
                    alt="humidity"
                    className="humidity-img"
                  />
                  <div className="data">
                    <div className="weather-humidity">
                      {weatherData.main.humidity}%
                    </div>
                    <div>Humidity</div>
                  </div>
                </div>
                <div className="element">
                  <img src="./wind.png" alt="wind" className="wind-img" />
                  <div className="data">
                    <div className="weather-speed">
                      {Math.round(weatherData.wind.speed)}km/h
                    </div>
                    <div>Wind Speed</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1 style={{ fontSize: "150px", color: "lightblue" }}>:C</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
