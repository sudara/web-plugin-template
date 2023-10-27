<template>
    <div id="app-container" class="h-screen flex flex-col">
      <Transition appear>
      <div class="content grow flex relative">
        <!-- main content -->

        <div class="w-1/2 p-3">
          <ParameterSlider 
            class="w-full h-full" 
            uid="gain"
            />
        </div>
        <div class="w-1/2">
          <Button
            :param="testParam"
            >
            </Button>
        </div>

        <div class="absolute top-0 left-0 right-0 bottom-0 z-40" v-if="presetStore.showPresetsPanel">
            <PresetPanel class="w-full h-full" />
        </div>
      </div>
      </Transition>
      <Footer />
    </div>
</template>

<script setup lang="ts">
import { useParameterStore } from './store/parameters';
import { usePresetStore } from './store/presets';
import ParameterSlider from './components/controls/slider/ParameterSlider.vue';
import Parameter from './parameter/Parameter';
import ParameterRange from './parameter/ParameterRange';
import Button from './components/controls/button/Button.vue';
import Footer from './components/Footer.vue';
import { usePluginInfoStore } from './store/info';
import PresetPanel from './components/presets/PresetPanel.vue';

const parameterStore = useParameterStore();
const infoStore = usePluginInfoStore();
const presetStore = usePresetStore();

let testParam = new Parameter( new ParameterRange(0, 1, 1), "test");

infoStore.loadCurrentVersion();
infoStore.loadPluginName();
parameterStore.reloadParameters();
presetStore.reloadPresets();

</script>

<style lang="scss">

@import '@/sass/_variables.scss';


</style>