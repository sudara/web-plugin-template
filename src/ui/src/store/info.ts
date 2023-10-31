import PluginParameter from '@/parameter/PluginParameter';
import { defineStore } from 'pinia'

export const usePluginInfoStore = defineStore('info', {
  state: () => {
    return {
      pluginVersion: "",
      pluginName: "",
      isUpdateAvailable: <string | null>(null)
    }
  },
  actions: {
    async loadInfo() {
      Promise.all([this.loadVersion(), this.loadPluginName()]);
    },
    async loadVersion() {
      this.pluginVersion = await juce_getCurrentVersion();
      this.isUpdateAvailable = await juce_getIsUpdateAvailable();
    },
    async loadPluginName() {
      this.pluginName = await juce_getPluginName();
    }
  }
});
