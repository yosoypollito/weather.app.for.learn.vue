<script setup>
import { ref } from "vue"

import { IconSunFilled, IconMoon } from '@tabler/icons-vue';

const props = defineProps({
  temp_c: Number,
  temp_f: Number,
  is_day: Number,
  size: String
})

const checked = ref(false);

const sizes = {
  "default": {
    parent: "text-sm",
    tempText: "text-4xl",
    timeParentSize: "w-8 h-8",
    timeIcons: 32
  },
  "sm": {
    parent: "text-xs",
    tempText: "text-xl",
    timeParentSize: "w-6 h-6",
    timeIcons: 24
  }
}
const selectedSize = sizes[props.size || "default"];
</script>

<template>
  <div :class="`flex flex-col items-start justify-center ${selectedSize.parent}`">
    <div class="text-inherit font-semibold flex justify-center items-center gap-1 self-start">
      <span :class="!checked && 'text-warning'">
        °C
      </span>
      <input v-model="checked" type="checkbox" class="toggle toggle-xs bg-warning toggle-warning" />
      <span :class="checked && 'text-warning'">
        °F
      </span>
    </div>

    <div class="flex flex-row gap-1 items-center">
      <h3 :class="selectedSize.tempText">
        {{ Math.floor(checked ? props.temp_f : props.temp_c) }}
      </h3>

      <div :class="selectedSize.timeParentSize">
        <IconSunFilled v-if="props.is_day" :size="selectedSize.timeIcons" class="text-[#ffe168]" />
        <IconMoon v-else :size="selectedSize.timeIcons" />
      </div>
    </div>
  </div>
</template>