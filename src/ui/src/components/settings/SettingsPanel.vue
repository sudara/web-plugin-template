<template>
    <div class="flex justify-center items-center p-8 backdrop-blur-md" @click="settings.showSettings = false">
        <div class="relative bg-light w-full h-full border py-2 border-dark text-center shadow-xl" @click.stop>
            <h1 class="text-center">settings</h1>

            <div class="absolute bottom-2 flex justify-between items-end w-full italic opacity-80 text-xs px-2">
                <div> {{ info.pluginName }} v{{ info.pluginVersion }} </div>
                <div v-if="info.isUpdateAvailable" class="px-1">
                    <Button class="text-orange italic" @click="revealUpdate"
                    title="download update (opens browser)">
                        update available! ({{ info.isUpdateAvailable }})
                </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePluginInfoStore } from '@/store/info';
import { useSettingsStore } from '@/store/settings';
import Button from '../controls/button/Button.vue';

const info = usePluginInfoStore();
const settings = useSettingsStore();

function revealUpdate() {
    juce_revealUpdate();
}

</script>