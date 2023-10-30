<template>
    <Slider
      v-model="value"
      :range="range"
      :decimals="decimals"
      :sensitivity="sensitivity"
      :unit="unit"
      :defaultVal="defaultVal"
      :update-always="true">
      <template #sliderDisplay="internalValue">
        <div class="w-full slider text-center h-full flex items-center justify-center">
        <div class="inline-block hover:underline active:underline active: cursor-pointer">
          {{ range.getTextValue(internalValue.value) }}
        </div>
        <div v-if="unit" class="inline-block ms-1">{{ unit }}</div>
        </div>
      </template>
    </Slider>
</template>


<script setup lang="ts">
import ParameterRange from '@/parameter/ParameterRange';
import Slider from './Slider.vue';
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue', 'mousedown', 'mouseup'])

const value = computed<number>({
  get() {
    return props.modelValue;
  },
  set(value : number) {
    emit('update:modelValue', value)
  }
});

interface Props {
  modelValue: number,
  range?: ParameterRange,
  sensitivity?: number,
  defaultVal?: number,
  decimals?: number,
  unit?: string,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => 0,
  range: () => { return new ParameterRange(0, 1, 0.01) },
  sensitivity: () => 0.25,
  defaultVal: () => 0,
  decimals: () => 2,
  unit: () => ""
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables";

.slider {
  background-color: var(--bg-darker);
  padding: 0.25em 0.5em;
  &:active {
    background-color: transparentize($color: var(--green), $amount: 0.7);
  }
}

</style>