<template>
  <div class="h-full flex items-center justify-center">
      <div class="button flex items-center justify-center" :class="{'active': getToggleState()}" ref="button">
        <div class="w-min p-5">
          <slot :toggleState="getToggleState()"></slot>

        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Parameter from '@/parameter/Parameter';

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
  min-width: 4em;
  aspect-ratio: 1/1;

  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
  border-color: $slider-color;
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