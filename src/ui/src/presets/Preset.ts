export interface ParamState {
    uid: string
    value: number
    config: string
    locked: boolean
}

export interface Preset {
    path: string;
    name: string;
    paramStates: ParamState[],
    favorite: boolean
}