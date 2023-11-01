<template>
    <ToggleButton v-if="parameter" 
        :model-value="parameter.value == 1"
        @update:model-value="(v: boolean) => {
            if (parameter) parameter.value = v ? 1 : 0
        }"
        :class="toggleClassComputed">
        <slot :toggleState="parameter.value == 1"></slot>
    </ToggleButton>
</template>

<script setup lang="ts">
import PluginParameter from '@/parameter/PluginParameter';
import { computed, ref, watch } from 'vue';
import { useParameterStore } from '@/store/parameters';
import ToggleButton from './ToggleButton.vue';
import { param } from 'jquery';

const parameterStore = useParameterStore();

const props = defineProps<{
    uid: string,
    toggleClass?: string
}>();

const toggleClassComputed = computed(() => {
    if (!parameter.value) return '';
    return parameter.value.value == 1 ? props.toggleClass : ''
})

let parameter = ref<PluginParameter | null>();

parameter.value = parameterStore.parameters.get(props.uid);

// if parameter not already set, keep watching store until its found
if (!parameter.value) {
    let unwatch = watch(parameterStore.parameters, () => {
        parameter.value = parameterStore.parameters.get(props.uid);
        unwatch();
    });
}

</script>