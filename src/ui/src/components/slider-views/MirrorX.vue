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
    let rectWidth = props.value01;
    let rectX = (0.5 - props.value01 / 2) * 100;
    let shadow = rectWidth * 0.25;
    return {
        width: + (rectWidth) * 100 + "%",
        opacity: rectWidth,
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