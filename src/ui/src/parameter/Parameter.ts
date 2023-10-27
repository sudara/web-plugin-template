import { reactive } from 'vue';
import ParameterRange from './ParameterRange';

export default class Parameter {
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
  }

  get value01() {
    return this.range.valueTo01(this.value);
  }

  constructor(
    range: ParameterRange = new ParameterRange(0, 1, 0.01),
    name: string,
    unit?: string,
    defaultVal: number = 0) 
  {
    this.range = range;
    this.defaultVal = defaultVal;
    this._val = reactive({value: defaultVal});
    this.name = name;
    this.unit = unit;
  }

};

