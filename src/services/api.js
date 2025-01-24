import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeather = (city) =>
  api.get(`/weather?q=${city}&appid=YOUR_API_KEY`);
