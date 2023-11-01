<template>
    <Slider
    v-if="parameter" 
    v-model="parameter.value"
    :range="parameter.range"
    :unit="parameter.unit"
    @gestureStart="startDrag"
    @gestureEnd="endDrag"
    >
    </Slider>
</template>

<script setup lang="ts">
import PluginParameter from '@/parameter/PluginParameter';
import Slider from './Slider.vue';
import { ref, watch } from 'vue';
import { useParameterStore } from '@/store/parameters';
import { startGesture, endGesture } from '@/parameter/ParameterConnection';

const parameterStore = useParameterStore();

const props = defineProps<{
    uid: string
}>();

let parameter = ref<PluginParameter | null>();

parameter.value = parameterStore.parameters.get(props.uid);

// if parameter not already set, keep watching store until its found
if (!parameter.value) {
    let unwatch = watch(parameterStore.parameters, () => {
        parameter.value = parameterStore.parameters.get(props.uid);
        unwatch();
    });
}

function startDrag() {
    if (!parameter.value) return;
    startGesture(parameter.value);
}

function endDrag() {
    if (!parameter.value) return;
    endGesture(parameter.value);
}

</script>