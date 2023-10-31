<template>
    <div class="shadow-top text-sm min-h-[30px]">
        <div class="relative flex align-middle justify-center items-center h-full">
            <span class="px-2 absolute left-0 w-[30%] text-left">
                <!-- <span class="text-dark pe-1">✿</span> -->
                <span class="text-dark">{{ info.pluginName }}</span>
            </span>
            <div class="absolute left-0 right-0 top-0 bottom-0">
                <PresetToolbar class="w-[40%] mx-auto" />
            </div>
            <div class="absolute right-0 top-0 bottom-0 flex justify-start items-center 
            border-l border-dark">
                <Button 
                @click="settings.showSettings = !settings.showSettings"
                :class="{'!bg-dark !text-light': settings.showSettings}"
                class="h-full !px-2 bg-transparent
                text-dark text-2xl flex justify-center items-center"
                title="settings">
                    <div class="relative h-full w-full flex justify-center items-center">
                        <div class="absolute rounded bg-orange -top-0.5 -right-0.5 w-2 h-2
                        flex justify-center items-center"
                        v-if="info.isUpdateAvailable">
                        </div>
                        <vue-feather type="settings" class="w-4"></vue-feather>
                    </div>
                </Button>

                <ParameterButton class="!p-0 h-full flex justify-center items-center" uid="bypass" v-slot="slot"
                toggleClass="bg-red text-light">
                    <div class="px-2 h-full flex justify-center items-center">
                        <vue-feather type="power" class="h-full w-4"/>
                    </div>
                </ParameterButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePluginInfoStore } from '@/store/info';
import { useSettingsStore } from '@/store/settings';
import PresetToolbar from './presets/PresetToolbar.vue';
import ParameterButton from '@/components/controls/button/ParameterButton.vue';
import Button from './controls/button/Button.vue';

const info = usePluginInfoStore();
const settings = useSettingsStore();

</script>

<style lang="scss">
@import '@/sass/_variables.scss';
</style>