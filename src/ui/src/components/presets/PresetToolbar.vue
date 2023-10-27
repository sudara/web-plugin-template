<template>
    <div class="flex justify-between h-full"
    >
        <div class="border-r border-black">
            <button class="btn btn-no-bg" @click="prevPreset">&lt;</button>
        </div>
        <div class="grow overflow-clip w-full"
            :class="{'bg-dark': presetStore.showPresetsPanel}">
            <button class="btn btn-no-bg w-full overflow-ellipsis truncate" 
                    @click="presetStore.showPresetsPanel = !presetStore.showPresetsPanel"
                    :class="{'text-light': presetStore.showPresetsPanel}">
                    {{ presetStore.activePreset ? presetStore.activePreset.name : "init" }}
            </button>
        </div>
        <div class="border-l border-black">
            <button class="btn btn-no-bg" @click="nextPreset">&gt;</button>
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