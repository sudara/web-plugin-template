<template>
  <div>
      <div class="slider-wrapper w-full p-3">
        <div class="slider w-full corner-border z-10" ref="slider">
          <slot name="sliderDisplay" :valueX="props.paramX?.value" :valueY="props.paramY?.value" class="-z-10">
              <div class="thumb thumbX" ref="thumbX" :style="thumbStyleX"></div>
              <div class="thumb thumbY" ref="thumbY" :style="thumbStyleY"></div>

              <div class="control-value">{{ displayValue }}</div>
              <div class="unit">{{ displayUnit }}</div>
          </slot>
        </div>
        <h3 class="text-center pt-2">{{ displayParamName }}</h3>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { Parameter } from '@/parameter';
import { startGesture, endGesture } from '@/composables/controls';

const maxShadow = 0.2;

interface Props {
    paramX?: Parameter,
    paramY?: Parameter,
    sensX?: number,
    sensY?: number,
    snapToClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sensX: () => 0.25,
  sensY: () => 0.25,
  snapToClick: () => false
});

let slider = ref<HTMLElement|null>(null);

let isMouseDown = false;

let displayValueX = ref({value: 0, suffix: ''});
let displayValueY = ref({value: 0, suffix: ''});

if (props.paramY?._val) {
  watch(props.paramY._val, async () => {
    updateDisplayValue();
  });
}

if (props.paramX?._val) {
  watch(props.paramX._val, async () => {
    updateDisplayValue();
  });
}

async function updateDisplayValue() {
  if (props.paramX) displayValueX.value = await getDisplayValue(props.paramX?.uid);
  if (props.paramY) displayValueY.value = await getDisplayValue(props.paramY?.uid);
}

let displayValue = computed(() => {
  if (!props.paramX && props.paramY)
    return displayValueY.value.value;
  if (!props.paramY && props.paramX)
    return displayValueX.value.value;
  if (props.paramX && props.paramY) {
    return displayValueY.value.value + '\n' + displayValueX.value.value;
  }
});

let displayUnit = computed(() => {
  if (!props.paramX && props.paramY)
    return displayValueY.value.suffix;
  if (!props.paramY && props.paramX)
    return displayValueX.value.suffix;
  if (props.paramX && props.paramY) {
    return displayValueY.value.suffix + '\n' + displayValueX.value.suffix;
  }
})

let displayParamName = computed(() => {
  if (props.paramX && !props.paramY) return props.paramX.name;
  if (!props.paramX && props.paramY) return props.paramY.name;
  return "";
})

let thumbStyleX = computed(() => {
  if (!props.paramX) return {display: 'none'};

  let t = props.paramX.value01;
  let shadow = t * maxShadow * (props.paramY ? 0.5 : 1);

  return {
    width: t*100 + "%",
    opacity: t * (props.paramY ? 0.8 : 1),
    'box-shadow': `0px 0px 15px 3px rgba(0, 0, 0, ${shadow})`
  };
});

let thumbStyleY = computed(() => {
  if (!props.paramY) return {};

  let t = props.paramY.value01;
  let shadow = t * maxShadow * (props.paramX ? 0.5 : 1);

  return {
    height:  + t*100 + "%",
    opacity: t * (props.paramX ? 0.8 : 1),
    'box-shadow': `0px 0px 15px 0px rgba(0, 0, 0, ${shadow})`
  };
});


function setValueFromEvent(e: MouseEvent, snapToPos:boolean = false) {
    if (!slider.value) return;
    if (e.button && e.button != 0) return;

    let h = slider.value.clientHeight;
    let w = slider.value.clientWidth;

    if (props.paramY) {
      let vY = 0;
      if (snapToPos || e.movementY === undefined) {
        vY = 1 - (e.y - slider.value.getBoundingClientRect().top) / h;
      } else if (e.movementY) {
        let tY = - e.movementY / h * props.sensY;
        if (e.getModifierState('Shift')) tY *= 0.2;
        vY = props.paramY.value01 + tY;
      }
      props.paramY.value = props.paramY.range.valueFrom01(vY);
    }

    if (props.paramX) {
      let vX = 0;
      if (snapToPos || e.movementX === undefined) {
        vX = (e.x - slider.value.getBoundingClientRect().left) / w;
      } else if (e.movementX) {
        let tX = - e.movementX / w * props.sensX;
        if (e.getModifierState('Shift')) tX *= 0.2;
        vX = props.paramX.value01 + tX;
      }
      props.paramX.value = props.paramX.range.valueFrom01(vX);
    }
}


let sliderHovering = ref(false);
let altDown = ref(false);

onMounted(() => {

  window.addEventListener('mousemove', (e) => {
    if (!slider.value) return;

    if (isMouseDown) {
      setValueFromEvent(e, props.snapToClick);
    }
  });

  slider.value?.addEventListener('mousedown', (e) => {
    //juceLockMouse(true);
    document.body.requestPointerLock();
    if (e.button != 0) return;
    isMouseDown = true;
    if (props.snapToClick) setValueFromEvent(e, props.snapToClick);
    if (props.paramX) startGesture(props.paramX);
    if (props.paramY) startGesture(props.paramY);
  });

  window.addEventListener('mouseup', (e) => {
    //juceLockMouse(false);
    document.exitPointerLock();
    if (e.button != 0) return;
    if (isMouseDown) {
      if (props.paramX) endGesture(props.paramX);
      if (props.paramY) endGesture(props.paramY);
    }

    isMouseDown = false;
  });

  slider.value?.addEventListener('dblclick', (e) => {
    setTimeout(() => {
      if (props.paramY)
        props.paramY.value = props.paramY.defaultVal;
      if (props.paramX)
        props.paramX.value = props.paramX.defaultVal;
    }, 50);
  });

  updateDisplayValue();

})

</script>

<style lang="scss" scoped>
@import "@/sass/variables";

$slider-color: $piano-green;

.slider-wrapper {
  height: 100%;
  width: 100%;
}

.slider {
  height: 100%;
  margin: auto;
  touch-action: none;
  user-select: none;
  position: relative;
  cursor: crosshair;
}

.corner-border::before {
  $border-colour: scale-color($slider-color, $saturation: -10%, $lightness: -15%);
  $border-width: 3px;
  $border-length: 13px;
  background:
    linear-gradient(to right, $border-colour $border-width, transparent $border-width) 0 0,
    linear-gradient(to right, $border-colour $border-width, transparent $border-width) 0 100%,
    linear-gradient(to left, $border-colour $border-width, transparent $border-width) 100% 0,
    linear-gradient(to left, $border-colour $border-width, transparent $border-width) 100% 100%,
    linear-gradient(to bottom, $border-colour $border-width, transparent $border-width) 0 0,
    linear-gradient(to bottom, $border-colour $border-width, transparent $border-width) 100% 0,
    linear-gradient(to top, $border-colour $border-width, transparent $border-width) 0 100%,
    linear-gradient(to top, $border-colour $border-width, transparent $border-width) 100% 100%;

  background-repeat: no-repeat;
  background-size: $border-length $border-length;
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  z-index: 10;
}

.corner-border.hover::before, .corner-border:active::before {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  $border-colour: scale-color($slider-color, $saturation: -30%, $lightness: -40%);
  $border-width: 3px;
  $border-length: 13px;
  background:
    linear-gradient(to right, $border-colour $border-width, transparent $border-width) 0 0,
    linear-gradient(to right, $border-colour $border-width, transparent $border-width) 0 100%,
    linear-gradient(to left, $border-colour $border-width, transparent $border-width) 100% 0,
    linear-gradient(to left, $border-colour $border-width, transparent $border-width) 100% 100%,
    linear-gradient(to bottom, $border-colour $border-width, transparent $border-width) 0 0,
    linear-gradient(to bottom, $border-colour $border-width, transparent $border-width) 100% 0,
    linear-gradient(to top, $border-colour $border-width, transparent $border-width) 0 100%,
    linear-gradient(to top, $border-colour $border-width, transparent $border-width) 100% 100%;

  background-repeat: no-repeat;
  background-size: $border-length $border-length;
}

.thumb {
  background-color: $slider-color;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: -1;
  touch-action: none;
  user-select: none;

  transition: width 0.09s cubic-bezier(0.23, 1, 0.320, 1),
              height 0.1s cubic-bezier(0.19, 1, 0.22, 1),
              border-width 0.05s ease-in;

  border-color: scale-color($slider-color, $saturation: -15%, $lightness: -10%);
  border-style: solid;
  border-width: 0;
}

.thumbX {
  height: 100%;
}

.thumbY {
  width: 100%;
}

.control-value {
  white-space: pre-line;
  font-size:1.25em;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position:absolute;
  top: 0;
}

.unit {
  white-space: pre-line;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position:absolute;
  bottom: 0;
  padding-top: 3.1em;

  color: rgba(61, 58, 58, 0.811);
  font-size:0.7em;
}

</style>