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
  
  const addCityURLToLook = async (url)=>{
    console.log(url)
    const currentCity  = await getCurrentWeatherFromURL(url)
    citiesURLToLook.value.set(url, currentCity)
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