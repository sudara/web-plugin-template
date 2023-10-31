<template>
  <AuthPanel class="fixed top-0 left-0 right-0 grow h-screen z-50" v-if="!authStore.authorized" />
  <div id="app-container" class="h-screen flex flex-col">
    <Transition appear>

      <div class="content grow flex relative">
        <!-- main content -->

        <div class="w-1/2 p-3">
          <ParameterSlider class="w-full h-full" uid="gain" />
        </div>
        <div class="w-1/2 p-2">
          <div class="h-1/2 flex justify-center items-center w-full">
            <input type="text" v-model="test" class="w-full max-w-md">
          </div>

          <div class="h-1/2 w-full flex justify-center items-center">
            <ParameterButton class="w-full h-full border border-black" uid="bypass">
              bypass
            </ParameterButton>
          </div>

        </div>

        <Transition>
          <div class="absolute top-0 left-0 right-0 bottom-0 z-20" v-show="presetStore.showPresetsPanel">
            <PresetPanel class="w-full h-full" />
          </div>
        </Transition>

        <Transition>
          <div class="absolute top-0 left-0 right-0 bottom-0 z-20" v-show="settingsStore.showSettings">
            <SettingsPanel class="w-full h-full" />
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
import ParameterButton from './components/controls/button/ParameterButton.vue';
import Parameter from './parameter/Parameter';
import ParameterRange from './parameter/ParameterRange';
import Footer from './components/Footer.vue';
import { usePluginInfoStore } from './store/info';
import PresetPanel from './components/presets/PresetPanel.vue';
import SettingsPanel from './components/settings/SettingsPanel.vue';
import { onMounted, ref, watch } from 'vue';
import AuthPanel from './components/auth/AuthPanel.vue';
import { useSettingsStore } from './store/settings';

const parameterStore = useParameterStore();
const infoStore = usePluginInfoStore();
const presetStore = usePresetStore();
const authStore = useAuthStore();
const settingsStore = useSettingsStore();

let testParam = new Parameter(new ParameterRange(0, 1, 1), "test");

infoStore.loadInfo();
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