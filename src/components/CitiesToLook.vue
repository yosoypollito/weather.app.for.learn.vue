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
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] place-items-center gap-2 w-full">
    <WeatherCard v-for="(city, url) in toLook" :key="url" :location="city.location" :current="city.current" size="sm" />
  </div>
</template>