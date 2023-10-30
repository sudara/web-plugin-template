<template>
    <div class="w-full h-full">
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
                <div class="w-full flex justify-between group" 
                    :class="{ '!bg-dark': isActive(preset) }">
                    <button class="btn btn-no-bg w-full text-left"
                        :class="{ '!text-light': isActive(preset) }"
                        @click="loadPreset(preset)">
                        <p class="ps-8">{{ preset.name }}</p>
                    </button>
                    <div class="flex items-center justify-center translate-y-0.5 gap-3 px-2">
                        <button class="h-full btn invisible group-hover:visible !px-0"
                            :class="{ '!visible': preset.favorite }"
                            @click="toggleFavorite(preset)">
                            <vue-feather type="heart" class="w-4" 
                            :fill="preset.favorite ? 'var(--red)' : 'none'" 
                            :stroke="preset.favorite ? 'var(--red)' : isActive(preset) ? 'var(--light)' : 'var(--dark)'" 
                            />
                        </button>
                        <button class="btn !px-0" 
                            :class="{ '!text-light': isActive(preset), 'invisible': category != 'user' }"
                            @click="emit('deletePreset', preset)">
                            <vue-feather type="x" class="w-4"></vue-feather>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { Preset } from '@/presets/Preset';
import { usePresetStore } from '@/store/presets';
import { ref } from 'vue';

const presetStore = usePresetStore();

const expanded = ref(true);

const props = defineProps<{
    category: string,
    presets: Preset[]
}>();

const emit = defineEmits(['deletePreset']);

function loadPreset(p : Preset) {
    juce_loadPreset(p.path);
}

function isActive(p: Preset) : boolean {
    if (!presetStore.activePreset) return false;
    return p.path == presetStore.activePreset.path;
}

async function toggleFavorite(p : Preset) {
    await juce_favoritePreset(p.path, !p.favorite);
    presetStore.reloadPresets();
}

async function deletePreset(p : Preset) {
    await juce_deletePreset(p.path);
}


</script>