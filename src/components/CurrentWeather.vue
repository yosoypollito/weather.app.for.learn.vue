<script setup>
import { useWeatherStore } from '../stores/weather';
import SwitchGrades from './SwitchGrades.vue';
import { storeToRefs } from 'pinia';

const store = useWeatherStore();

const { location, current } = storeToRefs(store);

await store.initializeState();

store.$subscribe((mutate, state) => {
  console.log(state)
})

</script>

<template>
  <div v-if="Object.keys(location).length > 0" class="card card-bordered shadow max-w-lg w-full bg-base-100">
    <div class="card-body items-start w-full">
      <div class="flex flex-row justify-between w-full">
        <div>

          <div>
            <SwitchGrades :temp_c="current.temp_c" :temp_f="current.temp_f" :is_day="current.is_day" />
          </div>

        </div>

        <div class="flex flex-col items-start gap-0.5 font-bold">
          <h2 class="text-sm">
            {{ location.name }}
          </h2>
          <span class="text-xs">
            {{ location.country }}
            {{ location.region && (", " + location.region) }}
          </span>
        </div>

      </div>
    </div>
  </div>

  <div v-else>
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
    HOLAHOLAOHLADPSAKDOASJDASOJDASD
  </div>
</template>