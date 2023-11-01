<template>
    <div class="flex justify-between h-full border-dark border-x w-[40%]"
            :class="{'bg-dark': presetStore.showPresetsPanel}"
    >
        <div class=" border-black">
            <Button class="btn btn-no-bg h-full px-2" :class="{'text-light' : presetStore.showPresetsPanel}" 
            @click="prevPreset" title="load previous preset">&lt;</Button>
    </div>
        <div class="grow overflow-clip w-full">
            <Button class="h-full w-full" 
            container-class="w-full truncate text-base h-full translate-y-0.5" 

            title="presets"
                    @click="presetStore.showPresetsPanel = !presetStore.showPresetsPanel"
                    :class="{'text-light': presetStore.showPresetsPanel,
                    'italic': presetStore.hasPresetChanged}">
                    {{ presetStore.activePreset ? presetStore.activePreset.name : "init" }}
            </Button>
        </div>
        <div class=" border-black">
            <Button class="btn btn-no-bg h-full px-2" :class="{'text-light' : presetStore.showPresetsPanel}" 
            @click="nextPreset" title="load next preset">&gt;</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePresetStore } from '@/store/presets';
import Button from '../controls/button/Button.vue';

const presetStore = usePresetStore();

function nextPreset() {
    juce_nextPreset();
}

function prevPreset() {
    juce_prevPreset();
}

</script>