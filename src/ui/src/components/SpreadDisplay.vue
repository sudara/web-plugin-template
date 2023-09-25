<template>
    <canvas id="spreadCanvas" class="h-full w-full" ref="spreadCanvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

export interface Props {
    spread: number,
    pan: number,
    color?: string
    centreColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    color: () => 'rgba(0,0,0,0.5)',
    centreColor: () => 'rgba(40,40,40,0.8)'
});
let spreadCanvas = ref<HTMLCanvasElement|null>(null);

watch(() => props.spread, () => {
    draw();
});

watch(() => props.pan, () => {
    draw();
});

onMounted(() => {
    draw();
})

function draw() {
    let canvas = spreadCanvas.value;
    if (!canvas) return;
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rectWidth = Math.max(5, canvas.width * props.spread * 0.8);
    let rectHeight = 0.3 * canvas.height;
    let rectCenter = canvas.width * props.pan;

    ctx.fillStyle = props.color;
    ctx.fillRect(Math.floor(rectCenter - rectWidth/2), Math.floor(canvas.height / 2 - rectHeight/2),
    rectWidth, rectHeight);

    let centreWidth = 10;
    let centreHeight = 0.7 * canvas.height;

    ctx.fillStyle = props.centreColor;
    ctx.fillRect(Math.floor(rectCenter - centreWidth/2), Math.floor(canvas.height/2 - centreHeight/2),
    centreWidth, centreHeight);
}

</script>

<style>
canvas,
img {
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
}
</style>