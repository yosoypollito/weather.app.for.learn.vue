import ENDPOINTS from "./endpoints";

const HOST_RAPID_API = import.meta.env.VITE_WEATHER_RAPID_API_HOST;
const API_KEY = import.meta.env.VITE_WEATHER_RAPID_API_KEY;


const HOST_URL = `https://${HOST_RAPID_API}`;

const HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': HOST_RAPID_API
}

export const getCurrentPosition = ()=> new Promise((resolve, reject)=>{
  navigator.geolocation.getCurrentPosition(resolve, (err)=>{
    //TODO handle errors
    resolve({
      coords:{
        latitude: 0,
        longitude:0
      }
    })
  }, {
    enableHighAccuracy: true
  });
});

export const getCurrentWeather = async ({
  lat, lon, ip
}) => {
  console.log({ lat, lon })
  
  const toSearch = (lat && lon) ? `${lat},${lon}` : ip
  
  const res = await fetch(`${HOST_URL}${ENDPOINTS.CURRENT_WEATHER}?q=${toSearch}`,{
    headers: HEADERS
  })
  const data = await res.json();
  return data;
}

export const getLocation = async (ip)=>{
  const res = await fetch(`${HOST_URL}${ENDPOINTS.IPLOOKUP}?q=${ip}`,{
    headers: HEADERS
  })
  
  const data = await res.json();
  return data;
}

export const getAutocomplete = async (search)=>{
  const res = await fetch(`${HOST_URL}${ENDPOINTS.AUTOCOMPLETE}?q=${search || ""}`,{
    method:'GET',
    headers: HEADERS
  })
  const data = await res.json();
  
  return data;
}