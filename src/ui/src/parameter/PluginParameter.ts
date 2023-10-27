import { Ref } from "vue";
import Parameter from "./Parameter";
import ParameterRange from "./ParameterRange";
import { sendParameterValueUpdateToPlugin } from "./ParameterConnection";

export default class PluginParameter extends Parameter {
  uid: string;

  set value(val : number) {
    super.value = val;
    this.syncWithPlugin();
  }

  get value() {
    return this._val.value;
  }

  syncWithPlugin() {
    sendParameterValueUpdateToPlugin(this);
  }

  constructor(
    uid: string,
    value: number,
    range: ParameterRange = new ParameterRange(0, 1, 0.01),
    defaultVal: number = 0,
    name: string = uid,
    unit?: string) 
  {
    super(range, name, unit, defaultVal);
    this.uid = uid;
    super.value = value;
  }

};

export class RefParameter extends Parameter {
  constructor(
    ref: Ref<number>,
    range: ParameterRange = new ParameterRange(0, 1, 0.01),
    name: string,
    unit?: string,
    defaultVal: number = 0)
  {
    super(range, name, unit, defaultVal);
    this._val = ref;
  }

};