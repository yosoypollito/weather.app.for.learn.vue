import { ref } from "vue"
import { defineStore } from "pinia"

import { getClientIp } from "../services/getClientIp"
import { getCurrentPosition, getCurrentWeather } from "../services/weatherApi"

export const useWeatherStore = defineStore('weather', () => {

    const initialized = ref(false)
    const location = ref({})
    const current = ref({})
    const clientIP = ref(null) 
    const positionData = ref(null) 
  
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

  return {
    initialized,
    location,
    current,
    clientIP,
    positionData,
    initializeState
  } 
})