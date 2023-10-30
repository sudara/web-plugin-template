<template>
    <div>
        <button class="btn btn-no-bg w-full text-left hover:no-underline group" @click="expanded = !expanded">
            <h2 class="flex">
                <div class="w-6 flex justify-center items-center" v-if="expanded">
                    <vue-feather class="p-0 -translate-x-2 w-5 translate-y-0.5" 
                    type="chevron-down" stroke-width="1"></vue-feather>
                </div>
                <div class="w-6" v-else>-</div>
                <span class="group-hover:underline">{{ category }}</span>
            </h2>
        </button>
        <Transition>
        <div class="overflow-clip" v-if="expanded">
            <div class="" v-for="preset in presets">
                <button class="btn btn-no-bg w-full text-left" :class="{ '!bg-dark text-light': isActive(preset) }"
                    @click="loadPreset(preset)">
                    <p class="ps-8">{{ preset.name }}</p>
                </button>
            </div>
        </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { Preset } from '@/presets/Preset';
import { usePresetStore } from '@/store/presets';
import exp from 'constants';
import { ref } from 'vue';

const presetStore = usePresetStore();

const expanded = ref(true);

const props = defineProps<{
    category: string,
    presets: Preset[]
}>();

function loadPreset(p : Preset) {
    juce_loadPreset(p.path);
}

function isActive(p: Preset) : boolean {
    if (!presetStore.activePreset) return false;
    return p.path == presetStore.activePreset.path;
}


</script>