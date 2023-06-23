<script setup>
import SwitchGrades from './SwitchGrades.vue';

const props = defineProps({
  location: {},
  current: {},
  size: String
})

const sizes = {
  "default": {
    bodyPadding: "p-8",
    locationName: "text-sm",
    locationInfo: "text-xs"
  },
  "sm": {
    bodyPadding: "p-4",
    locationName: "text-xs",
    locationInfo: "text-xs"
  }
}

const selectedSize = sizes[props.size || "default"];
</script>

<template>
  <div class="card card-bordered shadow max-w-lg w-full bg-base-100">
    <div :class="`card-body w-full ${selectedSize.bodyPadding}`">
      <div class="flex flex-row justify-between items-center w-full">
        <div>

          <div>
            <SwitchGrades :temp_c="props.current.temp_c" :temp_f="props.current.temp_f" :is_day="props.current.is_day"
              :size="props.size" />
          </div>

        </div>

        <div class="flex flex-col items-start gap-0.5 font-bold">
          <h2 :class="selectedSize.locationName">
            {{ props.location.name }}
          </h2>
          <span :class="selectedSize.locationInfo">
            {{ props.location.country }}
            {{ props.location.region && (", " + props.location.region) }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>