import { Preset } from '@/presets/Preset';
import { defineStore } from 'pinia'

export const usePresetStore = defineStore('presets', {
  state: () => {
    return {
      showPresetsPanel: false,
      presets: <Map<string, Preset[]>>{},
      activePreset: <Preset>{
        name: "init"
      }
    }
  },
  actions: {
    async reloadCurrentPreset() {
      this.activePreset = await juce_getActivePreset();
    },
    async reloadPresets(reloadCache: boolean = false) {
      const presetsObj = await juce_getAvailablePresets(reloadCache);
      this.presets = new Map(Object.entries(presetsObj));
      this.reloadCurrentPreset();
    }
  }
});
