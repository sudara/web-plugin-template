export default class ParameterRange {
  min: number;
  max: number;
  step: number;

  constructor(min: number = 0, max: number = 1, step: number = 0.01) {
    this.min = min;
    this.max = max;
    this.step = step;
  }

  validateStep(val: number): number {
    val -= this.min;
    val = Math.round(val/this.step) * this.step;
    val += this.min;
    return val;
  }

  valueTo01 = (val: number, clampOutput : boolean = true): number => {
    //val = this.validateStep(val);
    let v = (val - this.min) / (this.max - this.min);
    if (clampOutput) v = Math.max(0, Math.min(1, v));
    return v;
  }

  valueFrom01 = (val01: number, clampOutput : boolean = true): number => {
    let r = this.max - this.min;
    let v = val01 * r + this.min;
    if (clampOutput) v = Math.max(this.min, Math.min(this.max, v));
    return this.validateStep(v);
  }

  getTextValue = (val: number): string => {
    return val.toFixed(2);
  }

  limit(val: number): number {
    return Math.max(this.min, Math.min(this.max, val));
  }
}