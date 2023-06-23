import { ref } from "vue"
import { defineStore } from "pinia"

import { getClientIp } from "../services/getClientIp"
import { getCurrentPosition, getCurrentWeather, getCurrentWeatherFromURL } from "../services/weatherApi"

export const useWeatherStore = defineStore('weather', () => {

  const initialized = ref(false)
  const location = ref({})
  const current = ref({})
  const clientIP = ref(null) 
  const positionData = ref(null) 
  const citiesURLToLook = ref(new Map())
  
  const savedCitiesURL = JSON.parse(localStorage.getItem('citiesURL'))
  const citiesURL = ref(savedCitiesURL || [])
  
  console.log({savedCitiesURL})
  
  if(citiesURL.value.length !== citiesURLToLook.value){
    citiesURL.value.forEach(url => {
      getCurrentWeatherFromURL(url)
      .then(city=>{
        citiesURLToLook.value.set(url, city)
      })
    })
  
  }
  
  const initializeState = async ()=>{
    if(initialized.value) return;
    initialized.value = true;
    clientIP.value = await getClientIp()
    positionData.value = await getCurrentPosition()
    
    const currentWeather = await getCurrentWeather({
      lat: positionData.value.coords.latitude,
      lon: positionData.value.coords.longitude,
      ip: clientIP
    })
    
    console.log(currentWeather)
    
    location.value = currentWeather.location;
    current.value = currentWeather.current;
    
  }
  
  const saveCitiesUrl = (url)=>{
    let urls = JSON.parse(localStorage.getItem('citiesURL'))
    if(!Array.isArray(urls)){
      urls = []
    }
    urls.push(url)
    urls = [...new Set(urls)];
    localStorage.setItem("citiesURL", JSON.stringify(urls))
  }
  
  const addCityURLToLook = async (url)=>{
    const currentCity  = await getCurrentWeatherFromURL(url)
    citiesURLToLook.value.set(url, currentCity)
    
    saveCitiesUrl(url)
  }

  return {
    initialized,
    location,
    current,
    clientIP,
    positionData,
    citiesURLToLook,
    addCityURLToLook,
    initializeState
  } 
})