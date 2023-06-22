<script setup>
import debounce from "just-debounce-it";
import { ref, watch } from "vue"
import { getAutocomplete } from "../services/weatherApi";
import { useWeatherStore } from "../stores/weather";

const { initializeState, $subscribe } = useWeatherStore();

await initializeState();

const cities = ref([]);

$subscribe(async (mutate, state) => {
  if (!state.location.name) return
  cities.value = await getAutocomplete(state.location.name)
})

const cityToSearch = ref("")

const debouncedGetAutocomplete = debounce(async (search) => {
  const data = await getAutocomplete(search)
  cities.value = data
}, 500)

watch(cityToSearch, () => {
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
        <ul class="dropdown-content menu shadow rounded-box gap-2 w-full bg-neutral-focus">
          <li v-for="city in cities" :key="city.id" class="flex flex-col text-sm">
            <div class="flex flex-col text-left justify-start items-start">
              <h3>{{ city.name }}</h3>
              <span>
                {{ city.country }},
                {{ city.region }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>