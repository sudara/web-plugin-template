import PluginParameter from '@/parameter/PluginParameter';
import { defineStore } from 'pinia'

export const usePluginInfoStore = defineStore('info', {
  state: () => {
    return {
      pluginVersion: "",
      pluginName: ""
    }
  },
  actions: {
    async loadCurrentVersion() {
      this.pluginVersion = await juce_getCurrentVersion();
    },
    async loadPluginName() {
      this.pluginName = await juce_getPluginName();
    }
  }
});
