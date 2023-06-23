<script setup>
import { useWeatherStore } from '../stores/weather';
import { storeToRefs } from 'pinia';
import WeatherCard from './WeatherCard.vue';

const store = useWeatherStore();

const { location, current } = storeToRefs(store);

await store.initializeState();

store.$subscribe((mutate, state) => {
  console.log(state)
})

</script>

<template v-if="Object.keys(location).length > 0">
  <WeatherCard :location="location" :current="current" />
</template>