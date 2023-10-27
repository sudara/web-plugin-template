<template>
    <div class="flex justify-between h-full">
        <div class="border-r border-black">
            <button class="btn btn-no-bg">&lt;</button>
        </div>
        <div class="grow" 
            :class="{'bg-dark': presetStore.showPresetsPanel}">
            <button class="btn btn-no-bg w-full" 
                    @click="presetStore.showPresetsPanel = !presetStore.showPresetsPanel"
                    :class="{'text-light': presetStore.showPresetsPanel}">
                {{ presetStore.activePreset.name }}
            </button>
        </div>
        <div class="border-l border-black">
            <button class="btn btn-no-bg">&gt;</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePresetStore } from '@/store/presets';

const presetStore = usePresetStore();

</script>