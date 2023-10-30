<template>
  <AuthPanel class="fixed top-0 left-0 right-0 grow h-screen z-50" v-if="!authStore.authorized" />
  <div id="app-container" class="h-screen flex flex-col">
    <Transition appear>

      <div class="content grow flex relative">
        <!-- main content -->

        <div class="w-1/2 p-3">
          <ParameterSlider class="w-full h-full" uid="gain" />
        </div>
        <div class="w-1/2">
          <div class="h-1/2 flex justify-center items-center">
            <input type="text" v-model="test">
          </div>

          <div class="h-1/2 w-full flex justify-center items-center">
            <Button :param="testParam">
            </Button>
          </div>

        </div>

        <Transition>
          <div class="absolute top-0 left-0 right-0 bottom-0 z-20" v-if="presetStore.showPresetsPanel">
            <PresetPanel class="w-full h-full" />
          </div>
        </Transition>
      </div>
    </Transition>
    <Footer class="bg-light z-20" />
  </div>
</template>

<script setup lang="ts">
import { useParameterStore } from './store/parameters';
import { usePresetStore } from './store/presets';
import { useAuthStore } from './store/auth';
import ParameterSlider from './components/controls/slider/ParameterSlider.vue';
import Parameter from './parameter/Parameter';
import ParameterRange from './parameter/ParameterRange';
import Button from './components/controls/button/Button.vue';
import Footer from './components/Footer.vue';
import { usePluginInfoStore } from './store/info';
import PresetPanel from './components/presets/PresetPanel.vue';
import { onMounted, ref, watch } from 'vue';
import AuthPanel from './components/auth/AuthPanel.vue';

const parameterStore = useParameterStore();
const infoStore = usePluginInfoStore();
const presetStore = usePresetStore();
const authStore = useAuthStore();

let testParam = new Parameter(new ParameterRange(0, 1, 1), "test");

infoStore.loadCurrentVersion();
infoStore.loadPluginName();
parameterStore.reloadParameters();
presetStore.reloadPresets(true);
authStore.loadAuthInfo();

let test = ref('');

watch(test, () => {
  juce_setConfig("test", test.value);
});

onMounted(async () => {
  test.value = await juce_getConfig("test");
})

</script>

<style lang="scss">
@import '@/sass/_variables.scss';
</style>