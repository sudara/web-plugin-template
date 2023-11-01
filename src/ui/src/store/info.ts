import PluginParameter from '@/parameter/PluginParameter';
import { defineStore } from 'pinia'

export const usePluginInfoStore = defineStore('info', {
  state: () => {
    return {
      pluginVersion: "",
      pluginName: "",
      isUpdateAvailable: <string | null>(null),
      isDebug: false,
      debugVersionString: '',
      platform: '' 
    }
  },
  actions: {
    async loadInfo() {
      Promise.all([
        this.loadVersion(), this.loadPluginName(),
        this.loadIsDebug(), this.loadDebugVersionString(),
        this.loadPlatform()
      ]);
    },
    async loadVersion() {
      this.pluginVersion = await juce_getCurrentVersion();
      this.isUpdateAvailable = await juce_getIsUpdateAvailable();
    },
    async loadPluginName() {
      this.pluginName = await juce_getPluginName();
    },
    async loadIsDebug() {
      this.isDebug = await juce_getIsDebug();
    },
    async loadDebugVersionString() {
      this.debugVersionString = await juce_getDebugVersionString();
      console.log(this.debugVersionString)
    },
    async loadPlatform() {
      this.platform = await juce_getPlatform();
    }
  }
});
