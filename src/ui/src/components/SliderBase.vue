<template>
  <slot> </slot>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '@/store/store';
import { Parameter } from '@/parameter';

export interface Props {
    paramX?: Parameter,
    paramY?: Parameter 
}

const props = defineProps<Props>();
const store = useStore();

defineExpose({startGesture, endGesture});

function startGesture() {
  if (props.paramY) {
    if (typeof startPluginParameterGesture === 'function') {
      startPluginParameterGesture(props.paramY.uid);
    }
  }

  if (props.paramX) {
    if (typeof startPluginParameterGesture === 'function') {
      startPluginParameterGesture(props.paramX.uid);
    }
  }
}

function endGesture() {
  if (props.paramY) {
    if (typeof endPluginParameterGesture === 'function') {
      endPluginParameterGesture(props.paramY.uid);
    }
  }

  if (props.paramX) {
    if (typeof endPluginParameterGesture === 'function') {
      endPluginParameterGesture(props.paramX.uid);
    }
  }
}


</script>
