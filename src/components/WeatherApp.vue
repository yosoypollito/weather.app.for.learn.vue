<script setup>
import CitiesToLook from './CitiesToLook.vue';
import CitySearch from './CitySearch.vue';
import CurrentWeather from "./CurrentWeather.vue"

</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center p-4">
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