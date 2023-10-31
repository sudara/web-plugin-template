<template>
    <div class="flex justify-center items-center p-8 backdrop-blur-sm">
        <div class="relative bg-light w-full h-full border py-2 border-dark text-center shadow-xl">
            <h1 class="text-center">settings</h1>

            <div class="absolute bottom-2 text-center w-full italic opacity-80 text-xs">
                {{ info.pluginName }} v{{ info.pluginVersion }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePluginInfoStore } from '@/store/info';

const info = usePluginInfoStore();
</script>