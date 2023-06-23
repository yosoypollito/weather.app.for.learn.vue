<script setup>
import CitiesToLook from './CitiesToLook.vue';
import CitySearch from './CitySearch.vue';
import CurrentWeather from "./CurrentWeather.vue"

</script>

<template>
  <div class="flex flex-col gap-12 justify-center items-center p-4">
    <div class="text-center">
      <h1 class="text-3xl">Weather App</h1>
      <p>Maded for learn vue for a interview</p>
    </div>
    <Suspense>

      <CurrentWeather />

      <template #fallback>
        Loading currentWeather
      </template>
    </Suspense>

    <Suspense>
      <CitySearch />

      <template #fallback>
        Loading CitySearch
      </template>
    </Suspense>

    <Suspense>
      <CitiesToLook />

      <template #fallback>
        Loading citiestoLook
      </template>
    </Suspense>
  </div>
</template>