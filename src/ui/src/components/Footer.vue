<template>
    <div class="shadow-top px-2 text-sm min-h-[30px]">
        <div class="flex align-middle items-center opacity-80 h-full">
            <span class="w-[30%] text-left">{{ info.pluginName }}</span>
            <PresetToolbar class="w-[40%]"/>
            <div class="w-[30%] text-right">
                v{{ info.pluginVersion }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePluginInfoStore } from '@/store/info';
import PresetToolbar from './presets/PresetToolbar.vue';
const info = usePluginInfoStore();

</script>

<style lang="scss">
@import '@/sass/_variables.scss';
</style>