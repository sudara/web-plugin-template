import { usePluginInfoStore } from './store/info';
import { useParameterStore } from './store/parameters';
import { usePresetStore } from './store/presets';

export { };

const ui = {
    updateParameterState: (payload: { parameter: string, value: number }) => {
        let param = useParameterStore().parameters.get(payload.parameter);
        if (!param) return;
        param.value = payload.value;
    },
    reloadPresets: () => {
        usePresetStore().reloadPresets();
    },
    updateDiscovered: () => {
        usePluginInfoStore().loadVersion();
    },
    presetChanged: () => {
        usePresetStore().reloadPresets();
        usePresetStore().hasPresetChanged = false;
    }
}

declare global { interface Window { ui: any } }
window.ui = ui;