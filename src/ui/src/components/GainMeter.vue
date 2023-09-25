<template>
    <div class="container">
        <div class="meter slow" :style="slowMeterStyle"> </div>
        <div class="meter fast" :style="fastMeterStyle"> </div>
    </div>
</template>


<script setup lang="ts">
import { EnvelopeFollower } from '@/EnvelopeFollower';
import { ParameterRange } from '@/parameter';
import { computed } from 'vue';

let slowEnv = new EnvelopeFollower(0.01, 8, 60);
let fastEnv = new EnvelopeFollower(0.01, 0.5, 60);

fastEnv.envelope = -100;
slowEnv.envelope = -100;

let r = new ParameterRange(-60, 0);
let dbToPercent = (db:number) => {
    let h = 0;
    if (isFinite(db)) h = r.valueTo01(db);
    return h;
}

let slowMeterStyle = computed(() => {
    return {'height': dbToPercent(slowEnv.envelope) * 100 + '%'}
});

let fastMeterStyle = computed(() => {
    return {'height': dbToPercent(fastEnv.envelope) * 100 + '%'}
});

function pushValue(db: number) {
  fastEnv.push(db);
  slowEnv.push(db);
}

defineExpose({pushValue});

</script>

<style scoped lang="scss">
@import "@/sass/variables";
.container {
    position: relative;
    overflow: hidden;
    border: 1px solid $piano-light;
}

.meter {
    width: 200%;
    position: absolute;
    bottom: 0;
    left: -50%;
    //transition: height 0.01s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 0 15px -2px rgba(0,0,0,0.2);

    &.fast {
        z-index: 3;
        background-color: $piano-light;
    }
    &.slow {
        z-index: 2;
        background-color: scale-color($piano-light, $lightness: -7%);
    }
}
</style>