<template>
    <div class="view-container">
        <div class="thumb thumbX" ref="thumbX" :style="thumbStyleX"></div>
        <div class="thumb thumbY" ref="thumbY" :style="thumbStyleY"></div>

        <div class="control-value">{{ displayValue }}</div>
        <div class="unit">{{ displayUnit }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

export interface Props {
    paramX: ParameterDef,
    paramY: ParameterDef,
    valueX: number,
    valueY: number,
    color?: string
}

let thumbStyleX = computed(() => {
  let param = props.paramX;
  if (!param) return {display: 'none'};

  let range = param.max - param.min;
  let t = (props.valueX - param.min) / range;

  let shadow = getPercentX() * 0.25 * (props.paramY ? 0.5 : 1);
  return {
    width: (t)*100 + "%",
    opacity: t * (props.paramY ? 0.8 : 1),
    'box-shadow': `0px 0px 15px 3px rgba(0, 0, 0, ${shadow})`
  };
});

let thumbStyleY = computed(() => {
  let param = props.paramY;
  if (!param) return {};

  let range = param.max - param.min;
  let t = (getValueY() - param.min) / range;
  let shadow = getPercentY() * 0.25 * (props.paramX ? 0.5 : 1);
  if (props.paramX) shadow /= 2;
  return {
    height:  + (t)*100 + "%",
    opacity: t * (props.paramX ? 0.8 : 1),
    'box-shadow': `0px 0px 15px 0px rgba(0, 0, 0, ${shadow})`
  };
});

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