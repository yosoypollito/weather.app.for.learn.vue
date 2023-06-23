<script setup>
import debounce from "just-debounce-it";
import { ref, watch } from "vue"
import { getAutocomplete } from "../services/weatherApi";
import { useWeatherStore } from "../stores/weather";
import { storeToRefs } from "pinia";

const store = useWeatherStore();
const { cityToSearch, location, cities } = storeToRefs(store)

await store.initializeState();

watch(location, async () => {
  if (!location.name) return
  cities.value = await getAutocomplete(location.name)
})

const debouncedGetAutocomplete = debounce(async (search) => {
  const data = await getAutocomplete(search)
  cities.value = data
}, 500)

watch(cityToSearch, () => {
  if (cityToSearch.value === "") return;
  debouncedGetAutocomplete(cityToSearch.value)
})

</script>

<template>
  <div class="flex flex-col gap-2 w-full max-w-md">
    <label class="text-lg font-semibold">
      Look for your city
    </label>
    <div class="flex flex-col gap-2 w-full dropdown">
      <input v-model="cityToSearch" class="input input-bordered w-full" type="text" />
      <div v-if="cities.length > 0" class="dropdown w-full">
        <ul class="dropdown-content menu shadow rounded-box gap-2 w-full bg-neutral-focus z-10">
          <li v-for="city in cities" :key="city.id" class="flex flex-col text-sm">
            <div class="flex flex-row items-center justify-center">
              <div class="flex flex-1 flex-col text-left justify-start items-start bg-lime">
                <h3>{{ city.name }}</h3>
                <span>
                  {{ city.country }},
                  {{ city.region }}
                </span>
              </div>
              <button class="btn btn-primary text-xs p-2" @click="store.addCityURLToLook(city.url)">
                Add
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>