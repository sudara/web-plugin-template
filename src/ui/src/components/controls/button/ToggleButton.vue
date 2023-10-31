<template>
  <Button @click="toggle">
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue'

const props = defineProps<{
  modelValue: boolean 
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue
  },
  set(value : boolean) {
    emit('update:modelValue', value)
  }
})

function toggle() {
  value.value = !value.value;
}

</script>
