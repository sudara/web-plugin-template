<template>
  <div @contextmenu="onContextMenu($event)" ref="sliderContainer">
    <slot name="sliderDisplay" :value="internalValue">
      <div class="slider corner-border w-full h-full z-10" ref="slider">
        <div class="-z-10">
          <div class="thumb" ref="thumb" :style="thumbStyle"></div>

          <div v-if="!hideValue" class="control-value">{{ value.toFixed(decimals) }}</div>
          <div v-if="!hideValue" class="unit">{{ unit }}</div>
        </div>
      </div>
    </slot>

    <context-menu v-model:show="showContextMenu" :options="optionsComponent">
      <div class="flex justify-between px-3">
        <input id="slider-context-input" class="text-center" :value="value.toFixed(decimals)"
          v-on:keyup.enter="{ inputValueChange($event); showContextMenu = false; }" :step="props.range.step" />
        <!--<p class="opacity-40">{{ displayValueY.suffix }}</p>-->
      </div>
    </context-menu>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, onMounted, ref, nextTick, watchEffect } from 'vue';
import ParameterRange from '@/parameter/ParameterRange';
import { type MenuOptions, ContextMenu } from '@imengyu/vue3-context-menu';

interface Props {
  range?: ParameterRange,
  defaultVal?: number,
  sensitivity?: number,
  snapToClick?: boolean,
  hideValue?: boolean,
  modelValue: number,
  decimals?: number,
  unit?: string,
  updateAlways?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => 0,
  range: () => { return new ParameterRange(0, 1, 0.01) },
  sensitivity: () => 0.25,
  snapToClick: () => false,
  hideValue: () => false,
  defaultVal: () => 0,
  decimals: () => 2,
  unit: () => "",
  updateAlways: () => true
});

const emit = defineEmits(['update:modelValue', 'mousedown', 'mouseup'])

const internalValue = ref(0);

const value = computed<number>({
  get() {
    return internalValue.value;
  },
  set(v : number) {
    unsnappedValue.value = props.range.valueTo01(v);
    internalValue.value = v;
    if (props.updateAlways) emit('update:modelValue', internalValue.value);
  }
});

const value01 = computed<number>({
  get() {
    return props.range.valueTo01(internalValue.value)
  },
  set(v) {
    internalValue.value = props.range.valueFrom01(v);
    if (props.updateAlways) emit('update:modelValue', internalValue.value);
  }
});


let unsnappedValue = ref(value01.value);

let slider = ref<HTMLElement | null>(null);
let sliderContainer = ref<HTMLElement | null>(null);

let isMouseDown = false;

// context menu input
function inputValueChange(e: Event) {
  let id = (e.target as HTMLElement).id.substring(5);
  let el = e.target as HTMLInputElement;
  //setDisplayValue(id, el.value);
  value.value = props.range.limit(parseFloat(el.value));
  emit('update:modelValue', internalValue.value);
}

let thumbStyle = computed(() => {
  const maxShadow = 0.2;
  let shadow = value01.value * maxShadow;

  return {
    height: + value01.value * 100 + "%",
    opacity: value01.value,
    'box-shadow': `0px 0px 15px 0px rgba(0, 0, 0, ${shadow})`
  };
});


function setValueFromEvent(e: MouseEvent, snapToPos: boolean = false) {
  if (!sliderContainer.value) return;
  if (e.button && e.button != 0) return;

  let h = sliderContainer.value.clientHeight;

  if (snapToPos || e.movementY === undefined) {
    //value01.value = 1 - (e.y - sliderContainer.value.getBoundingClientRect().top) / h;
  } else {
    let deltaY = - e.movementY / h * props.sensitivity;
    if (e.getModifierState('Shift')) deltaY *= 0.2;

    unsnappedValue.value = unsnappedValue.value + deltaY;
    value01.value = unsnappedValue.value;
  }
}

function mouseDown(e : MouseEvent) {
    if (e.button != 0) return;
    if (props.snapToClick) setValueFromEvent(e, props.snapToClick);
    emit('mousedown', e);
    isMouseDown = true;

    window.addEventListener('mousemove', mouseMove);
}

defineExpose({
  mouseDown,
});

function mouseMove(e : MouseEvent) {
    if (!sliderContainer.value) return;

    if (isMouseDown) {
      setValueFromEvent(e);
      e.preventDefault();
    }
}

onMounted(() => {

  watchEffect(() => {
    internalValue.value = props.modelValue;
    unsnappedValue.value = props.range.valueTo01(props.modelValue);
  });


  sliderContainer.value?.addEventListener('mousedown', mouseDown);

  window.addEventListener('mouseup', (e) => {
    if (e.button != 0) return;

    if (isMouseDown) {
      setValueFromEvent(e);
      emit('update:modelValue', internalValue.value);
      emit('mouseup', e);
    }

    isMouseDown = false;
    window.removeEventListener('mousemove', mouseMove);
  });

  sliderContainer.value?.addEventListener('dblclick', (e) => {
    value.value = props.defaultVal;
    emit('update:modelValue', internalValue.value);
  });
});

// Context menu

let showContextMenu = ref(false);
let optionsComponent = ref<MenuOptions>({
  iconFontClass: 'iconfont',
  customClass: "class-a",
  zIndex: 10,
  minWidth: 100,
  x: 500,
  y: 200,
  theme: 'imagiro'
});

const input = ref(null);

async function onContextMenu(e: MouseEvent) {
  e.preventDefault();
  //Set the mouse position
  optionsComponent.value.x = e.x;
  optionsComponent.value.y = e.y;
  //Show menu
  showContextMenu.value = true;

  await nextTick();

  // can't use ref because a separate object gets created
  let id = 'slider-context-input';
  let input = document.getElementById(id);
  if (input instanceof HTMLInputElement) {
    input?.focus();
    input?.select();
  }
}

</script>

<style lang="scss" scoped>
@import "@/sass/_variables";

.slider-wrapper {
  height: 100%;
  width: 100%;
}

.slider {
  margin: auto;
  touch-action: none;
  user-select: none;
  position: relative;
  cursor:ns-resize;

  //border-radius: 100%;
  //border: 3px solid $slider-color;
  //overflow: hidden;
  &.square {
    aspect-ratio: 1/1;
  }
}

input:focus {
  outline: none;
}

input {
  max-width: 60px;
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

.corner-border:hover::before,
.corner-border:active::before {
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
  width: 100%;
}

.control-value {
  white-space: pre-line;
  font-size: 1.25em;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: absolute;
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
  position: absolute;
  bottom: 0;
  padding-top: 3.1em;

  color: rgba(61, 58, 58, 0.811);
  font-size: 0.7em;
}
</style>