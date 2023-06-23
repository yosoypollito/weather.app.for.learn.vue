<script setup>
import WeatherCard from './WeatherCard.vue';
import { useWeatherStore } from '../stores/weather';

import { ref } from 'vue';

const store = useWeatherStore();
const toLook = ref({})

store.$subscribe((mutate, state) => {
  const citiesToLookObject = Object.fromEntries(state.citiesURLToLook)
  toLook.value = citiesToLookObject
})
</script>

<template v-if="Object.keys(toLook).length > 0">
  <WeatherCard v-for="(city, url) in toLook" :key="url" :location="city.location" :current="city.current" />
</template>