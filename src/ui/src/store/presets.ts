import { Preset } from '@/presets/Preset';
import { defineStore } from 'pinia'

export const usePresetStore = defineStore('presets', {
  state: () => {
    return {
      showPresetsPanel: true,
      presets: [],
      activePreset: <Preset>{
        name: "init"
      }
    }
  },
  actions: {
    reloadCurrentPreset() {

    },
    async reloadPresets() {
      this.presets = await juce_getAvailablePresets();
    }
  }
});