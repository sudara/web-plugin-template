<template>
    <div class="bg-light bg-opacity-90">
        <div class="w-full px-3 flex justify-between border-b border-dark">
            <div>
                <button class="btn btn-no-bg" @click="startSavePreset">+</button>
                <button class="btn btn-no-bg">O</button>
            </div>
            <div>
                <button class="btn btn-no-bg">♥</button>
                <button class="btn btn-no-bg">r</button>
            </div>
        </div>
        <div class="shadow-top px-3 py-2">
            <div v-for="[category, presets] in Object.entries(presetStore.presets)">
                {{ category }}
                <div class="" v-for="preset in presets">
                    <button class="ps-5 btn btn-no-bg w-full text-left" @click="loadPreset(preset)">
                        - {{ preset.name }} ({{ preset.path }})
                    </button>
                </div>
            </div>
            <div v-show="showPresetInput" class="bg-dark text-light">
                <input ref="pi" class="ps-5 btn btn-no-bg w-full text-left" @keyup.enter.native="savePreset">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePresetStore } from '@/store/presets';
import { nextTick, ref } from 'vue';

const showPresetInput = ref(false);
const pi = ref<HTMLInputElement>();
const presetStore = usePresetStore();

function startSavePreset() {
    showPresetInput.value = true;
    nextTick(() => pi.value?.focus());
}

function savePreset() {
    if (!pi.value) return;
    juce_createPreset(pi.value.value, "cat");
    showPresetInput.value = false;
    pi.value.value = '';
}

function loadPreset(p : Preset) {
    juce_loadPreset(p.path);
}

</script>