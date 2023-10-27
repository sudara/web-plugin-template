import { defineStore } from 'pinia'
import PluginParameter from '@/parameter/PluginParameter';
import { getPluginParameters } from '@/parameter/ParameterConnection';

export const useParameterStore = defineStore('parameters', {
    state: () => {
        return {
            parameters: new Map<string, PluginParameter>
        }
    },
    actions: {
        addParameter(parameter: PluginParameter) {
            this.parameters.set(parameter.uid, parameter);
        },
        clearParameters() {
            this.parameters.clear();
        },
        async reloadParameters() {
            let parameters = await getPluginParameters();

            parameters.forEach(param => {
                let existingParam = this.parameters.get(param.uid);
                if (existingParam) {
                    existingParam.value = param.value;
                } else {
                    this.addParameter(param);
                }
            });
        },
    },
})