<template>
    <Slider
    v-if="parameter" 
    v-model="parameter.value"
    :range="parameter.range"
    :unit="parameter.unit"
    >
    </Slider>
</template>

<script setup lang="ts">
import PluginParameter from '@/parameter/PluginParameter';
import Slider from './Slider.vue';
import { ref, watch } from 'vue';
import { useParameterStore } from '@/store/parameters';

const parameterStore = useParameterStore();

const props = defineProps<{
    uid: string
}>();

let parameter = ref<PluginParameter | null>();

parameter.value = parameterStore.parameters.get(props.uid);

// if parameter not already set, keep watching store until its found
if (!parameter.value) {
    console.log("parameter not found");
    let unwatch = watch(parameterStore.parameters, () => {
        parameter.value = parameterStore.parameters.get('gain');
        unwatch();
    });
}

</script>