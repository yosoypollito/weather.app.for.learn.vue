<script setup>
import WeatherCard from './WeatherCard.vue';
import { useWeatherStore } from '../stores/weather';
import { storeToRefs } from "pinia"

const store = useWeatherStore();
const { citiesURLToLook } = storeToRefs(store);
</script>

<template>
  <WeatherCard v-for="(city, url) in Object.fromEntries(citiesURLToLook.value)" :key="url" :location="city.location"
    :current="city.current" />
</template>