<template>
    <div class="w-full h-full">
        <Button class="btn btn-no-bg w-full text-left hover:no-underline group !justify-start" @click="expanded = !expanded">
            <div class="flex h-full">
                <div class="flex justify-center items-center me-1 translate-y-0.5">
                    <vue-feather v-if="expanded" type="chevron-down" :stroke-width="1" class="w-5 " />
                    <div v-else class="w-5 flex items-center justify-center h-full">
                        <div class="border-b border-dark h-0 w-3"></div>
                    </div>
                </div>
                <h2 class="group-hover:underline">{{ category }}</h2>
            </div>
        </Button>
        <Transition>
        <div class="overflow-clip" v-if="expanded">
            <div class="" v-for="preset in presets">
                <div class="w-full flex justify-between group/preset" 
                    :class="{ '!bg-dark': isActive(preset) }">
                    <Button class="py-0.5 btn btn-no-bg w-full !justify-start"
                        :class="{ '!text-light': isActive(preset) }"
                        @click="loadPreset(preset)">
                        <p class="ps-8 text-left">{{ preset.name }}</p>
                    </Button>
                    <div class="flex items-center justify-center translate-y-0.5 gap-3 px-2">
                        <Button class="h-full btn invisible group-hover/preset:visible !px-0 z-50"
                            :class="{ '!visible': preset.favorite }"
                            @click="toggleFavorite(preset)"
                            title="mark preset as favorite">
                            <vue-feather type="heart" class="w-4" 
                            :fill="preset.favorite ? 'var(--red)' : 'none'" 
                            :stroke="preset.favorite ? 'var(--red)' : isActive(preset) ? 'var(--light)' : 'var(--dark)'" 
                            />
                        </Button>
                        <Button class="btn !px-0" 
                            :class="{ '!text-light': isActive(preset), 'invisible': category != 'user' }"
                            @click="emit('deletePreset', preset)"
                            title="delete preset">
                            <vue-feather type="x" class="w-4"></vue-feather>
                        </Button>
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
import Button from '../controls/button/Button.vue';
import exp from 'constants';

const presetStore = usePresetStore();

const expanded = ref(true);

const props = defineProps<{
    category: string,
    presets: Preset[]
}>();

defineExpose({
    expanded,
    presets: props.presets
});

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