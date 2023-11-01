import {ref} from 'vue';

export class EnvelopeFollower {
    #rate: number;
    #attackSeconds: number;
    #releaseSeconds: number;
    #attackCoeff = 0;
    #releaseCoeff = 0;
    #envelope = ref(0);

    get envelope() { 
        return this.#envelope.value;
    }
    set envelope(val) {
        this.#envelope.value = val;
    }

    get attackSeconds() { return this.#attackSeconds; }
    set attackSeconds(val:number) {
        this.#attackSeconds = val;
        this.recalculateCoefficients();
    }

    get releaseSeconds() { return this.#releaseSeconds; }
    set releaseSeconds(val:number) {
        this.#releaseSeconds = val;
        this.recalculateCoefficients();
    }

    get rate() { return this.#rate; }
    set rate(val: number) {
        this.#rate = val;
        this.recalculateCoefficients();
    }

    constructor(attackSeconds:number = 0.1, releaseSeconds:number = 0.1, rate:number = 60) {
        this.#attackSeconds = attackSeconds;
        this.#releaseSeconds = releaseSeconds;
        this.#rate = rate;
        this.recalculateCoefficients();
    }

    recalculateCoefficients() {
        this.#attackCoeff = Math.pow(0.01, 1.0 / (this.attackSeconds * this.rate));
        this.#releaseCoeff = Math.pow(0.01, 1.0 / (this.releaseSeconds * this.rate));
    }

    push(val: number) : number {
        let coeff = val <= this.#envelope.value ? this.#releaseCoeff : this.#attackCoeff;
        this.#envelope.value = coeff * (this.#envelope.value - val) + val;
        return this.#envelope.value;
    }
}