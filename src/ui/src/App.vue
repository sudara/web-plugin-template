<template>
    <div id="app-container" class="h-screen flex flex-col text-center">
      <Transition appear>
      <div class="content grow flex flex-col">
        <div class="grow flex justify-center">
          <Slider class="w-0 grow" v-if="gainParam" 
            :paramY="gainParam" 
            :sensX="1" 
            :sensY="1" 
            snapToClick
            >
          </Slider>
        </div>
      </div>
      </Transition>
      <div class="footer">
        <span>{{ store.state.pluginName }}</span>
        <div class="h-full flex items-center">
          {{ store.state.pluginVersion }}
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from './components/Slider.vue';
import ButtonControl from './components/ButtonControl.vue';
import GainMeter from './components/GainMeter.vue';
import { useStore } from './store/store';
import { Parameter } from './parameter'

import { gainToDB } from '@/composables/util';

const store = useStore();

let gainParam = ref<Parameter | null>();

store.dispatch('initPlugin').then(() => {
  gainParam.value = store.state.parameters.get('gain');
});

let gainMeter = ref<typeof GainMeter>();

</script>

<style lang="scss">

@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@/sass/_variables.scss';

@font-face {
  font-family: 'IngramMono';
  font-style: normal;
  src: local('Opensans-Bold'), url(@/assets/fonts/IngramMono.woff) format('woff');
}

body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background-color: $piano-light;
  font-family: IngramMono;
}

/* we will explain what these classes do next! */
.v-enter {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.btn {
  border: 1px solid black;
  padding: 2px 4px;
}

.btn:active {
  transform: translateY(5px);
}

.footer {
  background-color: $piano-blue;
  display:flex;
  justify-content:space-between;
  align-items: center;
  padding: 5px;
  font-size: 0.8em;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 150%;
    width: 200%;
    left: -50%;
    top: 0;
    box-shadow: inset 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  }
}

</style>