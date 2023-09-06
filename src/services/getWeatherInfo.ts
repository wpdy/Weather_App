import axios from "axios";

const API_KEY = "";

async function GetWeatherInfo(city: string) {
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default GetWeatherInfo;
