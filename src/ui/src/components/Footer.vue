<template>
    <div class="shadow-top px-2 text-sm min-h-[30px]">
        <div class="flex align-middle items-center h-full">
            <span class="w-[25%] text-left">{{ info.pluginName }}</span>
            <PresetToolbar class="w-[50%]"/>
            <div class="w-[25%] text-right">
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