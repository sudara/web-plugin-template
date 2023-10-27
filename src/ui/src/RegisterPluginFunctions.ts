import { useParameterStore } from './store/parameters';
import { usePresetStore } from './store/presets';

export { };

const ui = {
    updateParameterState: (payload: { parameter: string, value: number }) => {
        console.log('asdasdasd');
        console.log(payload);
        console.log(useParameterStore().parameters);
        let param = useParameterStore().parameters.get(payload.parameter);
        console.log(param);
        if (!param) return;
        param.value = payload.value;
    },
    reloadPresets: () => {
        console.log("reloading presets");
        usePresetStore().reloadPresets();
    }
}

declare global { interface Window { ui: any } }
window.ui = ui;