<script setup>
import CitiesToLook from './CitiesToLook.vue';
import CitySearch from './CitySearch.vue';
import CurrentWeather from "./CurrentWeather.vue"
import LoadingCircle from "./LoadingCircle.vue"

</script>

<template>
  <div class="flex flex-col gap-12 justify-center items-center p-4">
    <div class="text-center">
      <h1 class="text-3xl">Weather App</h1>
      <p>Maded to learn vue for a interview</p>
    </div>
    <Suspense>
      <CurrentWeather />

      <template #fallback>
        <LoadingCircle />
      </template>
    </Suspense>

    <Suspense>
      <CitySearch />

      <template #fallback>
        <LoadingCircle />
      </template>
    </Suspense>

    <Suspense>
      <CitiesToLook />

      <template #fallback>
        <LoadingCircle />
      </template>
    </Suspense>
  </div>
</template>