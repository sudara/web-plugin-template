<template>
  <div class="p-3">
      <div class="button" :class="{'active': getToggleState()}" ref="button">
          <slot name="buttonText" :toggleState="getToggleState()"></slot>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SliderBase from './SliderBase.vue';
import { isHovering } from '@/composables/mouse';
import { Parameter } from "@/parameter";

const maxShadow = 0.3;

const props = defineProps<{
  param: Parameter
}>();

function getToggleState() : boolean { 
  return props.param.value == 1; 
}

function setToggleState(val: boolean) {
  props.param.value = val ? 1 : 0;
}

let button= ref<HTMLElement|null>(null);

onMounted(() => {
  button.value?.addEventListener('mousedown', (e) => {
    setToggleState(!getToggleState())
  });
})

</script>

<style lang="scss" scoped>
@import "@/sass/variables";

$slider-color: $piano-green;

.button {
  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
  border-color: $slider-color;
  height: 100%;
  aspect-ratio: 1/1;
  margin: auto;
  position: relative;
  cursor: pointer;

  &.active {
    background-color: $slider-color;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
  }
  &.hover, &:active {
    border-color: scale-color($slider-color, $saturation: -30%, $lightness: -30%);
  }
  &:active {
    transform: translateY(5px);
  }

  transition:   border-color 0.08s ease-in-out,
                background-color 0.03s ease-out,
                transform 0.03s ease-in-out;
}

</style>