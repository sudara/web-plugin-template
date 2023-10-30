<template>
    <div class="shadow-top text-sm min-h-[30px]">
        <div class="relative flex align-middle justify-center items-center h-full">
            <span class="px-2 absolute left-0 w-[30%] text-left">
                <!-- <span class="text-dark pe-1">✿</span> -->
                <span class="text-dark italic">{{ info.pluginName }}</span>
            </span>
            <div class="absolute left-0 right-0 top-0 bottom-0">
                <PresetToolbar class="w-[40%] mx-auto" />
            </div>
            <div class="absolute right-0 flex justify-start items-center gap-2">
                <button 
                @click="settings.showSettings = !settings.showSettings"
                :class="{'!bg-dark !text-light': settings.showSettings}"
                class="btn btn-no-bg hover:!no-underline !px-2 bg-transparent
                text-dark text-2xl">
                    <vue-feather type="settings" class="w-4"></vue-feather>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePluginInfoStore } from '@/store/info';
import { useSettingsStore } from '@/store/settings';
import PresetToolbar from './presets/PresetToolbar.vue';

const info = usePluginInfoStore();
const settings = useSettingsStore();

</script>

<style lang="scss">
@import '@/sass/_variables.scss';
</style>