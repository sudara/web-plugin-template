<template>
    <div class="view-container">
        <div class="thumb" :style="thumbStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

export interface Props {
    value01: number,
    color?: string
}

const props = withDefaults(defineProps<Props>(), {
    color: () => 'rgba(0,0,0,0.5)',
});

let thumbStyle = computed(() => {
    let rectWidth = Math.abs(0.5 - props.value01);
    let rectX = Math.min(0.5, props.value01) * 100;
    let shadow = rectWidth * 2 * 0.25;
    return {
        width: + (rectWidth) * 100 + "%",
        opacity: rectWidth * 2,
        'box-shadow': `0px 0px 15px 3px rgba(0, 0, 0, ${shadow})`,
        left: rectX + '%'
    };
});

</script>

<style lang="scss" scoped>
@import "@/sass/_variables.scss";
.thumb {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: $piano-green;
}
</style>