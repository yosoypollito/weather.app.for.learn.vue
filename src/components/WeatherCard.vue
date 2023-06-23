<script setup>
import SwitchGrades from './SwitchGrades.vue';

const props = defineProps({
  location: {},
  current: {},
  size: String
})
</script>

<template>
  <div :class="`card card-bordered shadow max-w-lg w-full bg-base-100 ${props.size === 'sm' && 'text-xs'}`">
    <div class="card-body items-start w-full">
      <div class="flex flex-row justify-between w-full">
        <div>

          <div>
            <SwitchGrades :temp_c="props.current.temp_c" :temp_f="props.current.temp_f" :is_day="props.current.is_day" />
          </div>

        </div>

        <div class="flex flex-col items-start gap-0.5 font-bold">
          <h2 class="text-sm">
            {{ props.location.name }}
          </h2>
          <span class="text-xs">
            {{ props.location.country }}
            {{ props.location.region && (", " + props.location.region) }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>