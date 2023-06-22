<script setup>
import CitySearch from './CitySearch.vue';
import CurrentWeather from "./CurrentWeather.vue"

</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center p-4">
    <Suspense>
      <CurrentWeather />
      <CitySearch />
    </Suspense>
  </div>
</template>