import { InjectionKey, App as Application } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Parameter } from '@/parameter';
import { getPluginParameters } from '@/composables/controls';

export interface State {
    parameters: Map<string, Parameter>,
    pluginVersion: string,
    pluginName: string,
}

export interface ParameterUpdatePayload {
    parameter: string,
    value: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    parameters: new Map<string, Parameter>(),
    pluginVersion: "",
    pluginName: ""
  },
  mutations: {
    addParameter(state, parameter : Parameter) {
      state.parameters.set(parameter.uid, parameter);
    },
    clearParameters(state) {
      state.parameters.clear();
    },
    setParameters(state, parameters : Array<Parameter>) {
    }
  },
  actions: {
    async initPlugin(context) {
      context.dispatch("loadCurrentVersion");
      context.dispatch("loadPluginName");
      await context.dispatch("reloadParameters");
    },
    async reloadParameters(context) {
      let parameters = await getPluginParameters();
      console.log(parameters);

      parameters.forEach(param => {
        let existingParam = context.state.parameters.get(param.uid);
        if (existingParam) {
          existingParam.value = param.value;
        } else {
          context.commit('addParameter', param);
        }
      });
    },
    async loadCurrentVersion(context) {
      context.state.pluginVersion = await juce_getCurrentVersion();
    },
    async loadPluginName(context) {
      context.state.pluginName = await juce_getPluginName();
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}

window.updateParameterState = function(payload: ParameterUpdatePayload) {
  let param = store.state.parameters.get(payload.parameter);
  if (!param) return;
  param.value = payload.value;
}
