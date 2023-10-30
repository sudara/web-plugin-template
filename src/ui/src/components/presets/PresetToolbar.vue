<template>
    <div class="flex justify-between h-full border-dark border-x"
            :class="{'bg-dark': presetStore.showPresetsPanel}"
    >
        <div class=" border-black">
            <button class="btn btn-no-bg h-full" :class="{'text-light' : presetStore.showPresetsPanel}" 
            @click="prevPreset">&lt;</button>
        </div>
        <div class="grow overflow-clip w-full">
            <button class="btn btn-no-bg w-full overflow-ellipsis truncate text-base h-full -translate-y-0.5" 
                    @click="presetStore.showPresetsPanel = !presetStore.showPresetsPanel"
                    :class="{'text-light': presetStore.showPresetsPanel}">
                    {{ presetStore.activePreset ? presetStore.activePreset.name : "init" }}
            </button>
        </div>
        <div class=" border-black">
            <button class="btn btn-no-bg h-full" :class="{'text-light' : presetStore.showPresetsPanel}" 
            @click="nextPreset">&gt;</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePresetStore } from '@/store/presets';

const presetStore = usePresetStore();

function nextPreset() {
    juce_nextPreset();
}

function prevPreset() {
    juce_prevPreset();
}

</script>