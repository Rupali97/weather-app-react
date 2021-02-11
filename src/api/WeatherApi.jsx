import axios from "axios"

const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "99e84e4a7e63c2d3bd757ff7db0315a4";

export const fetchWeather = async (city) => {
  const {data} = await axios.get(baseUrl + `q=${city}&appid=${apiKey}`)

  return data;
}

const hrUrl = "https://api.openweathermap.org/data/2.5/onecall?"

export const fetchHourly = async (lat, lon) => {
  const {data} = await axios.get(hrUrl + `lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`)

  return data;
}