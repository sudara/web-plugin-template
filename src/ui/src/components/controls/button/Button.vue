<template>
    <button class="btn group flex justify-center items-center">
        <div class="btn-content group-hover:underline group-active:translate-y-1
         group-disabled:translate-y-0 group-disabled:opacity-40" :class="containerClass">
            <slot></slot>
        </div>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    containerClass?: string
}>();
</script>