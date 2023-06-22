<script setup>
import { ref } from "vue"

import { IconSunFilled, IconMoon } from '@tabler/icons-vue';

const props = defineProps({
  temp_c: Number,
  temp_f: Number,
  is_day: Number
})

const checked = ref(false);

</script>

<template>
  <div class="flex flex-row gap-1 items-center justify-start">
    <div class="w-8 h-8">

      <IconSunFilled v-if="props.is_day" :size="32" class="text-[#ffe168]" />
      <IconMoon v-else :size="32" />
    </div>
    <h3 class="text-4xl">
      {{ Math.floor(checked ? props.temp_f : props.temp_c) }}
    </h3>
    <div class="text-sm font-semibold flex justify-center items-center gap-1 self-start">
      <span :class="!checked && 'text-warning'">
        °C
      </span>
      <input v-model="checked" type="checkbox" class="toggle toggle-xs bg-warning toggle-warning" />
      <span :class="checked && 'text-warning'">
        °F
      </span>
    </div>
  </div>
</template>