import { reactive } from 'vue';
import { sendParameterValueUpdateToPlugin } from './composables/controls';

export class ParameterRange {
  min: number;
  max: number;
  step: number;

  constructor(min: number = 0, max: number = 1, step: number = 0.01) {
    this.min = min;
    this.max = max;
    this.step = step;
  }

  valueTo01(val: number, clampOutput : boolean = true): number {
    let v = (val - this.min) / (this.max - this.min);
    if (clampOutput) v = Math.max(0, Math.min(1, v));
    return v;
  }

  valueFrom01(val01: number, clampOutput : boolean = true): number {
    let r = this.max - this.min;
    let v = val01 * r + this.min;
    if (clampOutput) v = Math.max(this.min, Math.min(this.max, v));
    return v;
  }

  limit(val: number): number {
    return Math.max(this.min, Math.min(this.max, val));
  }
}

export class Parameter {
  uid: string;
  name: string;
  unit?: string;

  defaultVal: number = 0;
  range: ParameterRange;

  _val = reactive({value: 0});

  get value() {
    return this._val.value;
  }

  set value(val) {
    if (val == this.value) return;
    this._val.value = this.range.limit(val);
    this.syncWithPlugin();
  }

  get value01() {
    return this.range.valueTo01(this.value);
  }

  syncWithPlugin() {
    sendParameterValueUpdateToPlugin(this);
  }

  constructor(
    uid: string,
    range: ParameterRange = new ParameterRange(0, 1, 0.01),
    defaultVal: number = 0,
    name: string = uid,
    unit?: string) 
  {
    this.uid = uid;
    this.range = range;
    this.defaultVal = defaultVal;
    this._val = reactive({value: defaultVal});
    this.name = name;
    this.unit = unit;
  }

};
