<template>
    <div class="bg-light flex flex-col">
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
        <div class="shadow-top grow">
            <div class="overflow-scroll px-3 py-2 h-full">
                <div v-for="[category, presets] of presetStore.presets">
                    <PresetListCategory :category="category" :presets="presets" />
                </div>
                <div v-show="showPresetInput" class="ps-8">
                    <input ref="pi" class="btn btn-no-bg !bg-green !bg-opacity-50 ps-5 w-full text-left" @keyup.enter.native="savePreset"
                    @keypress="onNameKeypress($event)" @keydown="onNameKeydown" @focusout="showPresetInput = false">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Preset } from '@/presets/Preset';
import { usePresetStore } from '@/store/presets';
import { nextTick, ref } from 'vue';
import PresetListCategory from './PresetListCategory.vue';

const showPresetInput = ref(false);
const pi = ref<HTMLInputElement>();
const presetStore = usePresetStore();

function startSavePreset() {
    showPresetInput.value = true;
    nextTick(() => pi.value?.focus());
}

function savePreset() {
    if (!pi.value) return;
    let name = pi.value.value.replace(/[^a-z0-9_ ]/gi, '');
    juce_createPreset(name, "user");
    showPresetInput.value = false;
    pi.value.blur();
    pi.value.value = '';
}

function onNameKeypress (e : KeyboardEvent) {
    if (!pi.value) return;

    if (e.key == 'Escape') {
        showPresetInput.value = false;
        if (pi.value) pi.value.value = '';
    }

    if (pi.value?.value.length > 18) {
        e.preventDefault();
        return false;
    }

    var regex = new RegExp("^[a-zA-Z0-9 _]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

function onNameKeydown(e : KeyboardEvent) {
    if (e.key == 'a' && (e.ctrlKey || e.metaKey)) {
        console.log("select");
        pi.value?.select();
    }
}

</script>