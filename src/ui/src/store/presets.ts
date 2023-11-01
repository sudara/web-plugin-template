import { Preset } from '@/presets/Preset';
import { defineStore } from 'pinia'
import { useDebounceFn, useThrottleFn } from '@vueuse/core';

const throttledCheckPresetUpdate = useThrottleFn(async (context) => {
  context.hasPresetChanged = await juce_hasPresetBeenUpdated();
}, 1000);

export const usePresetStore = defineStore('presets', {

  state: () => {
    return {
      showPresetsPanel: false,
      presets: new Map<string, Preset[]>(),
      activePreset: <Preset>{
        name: "init"
      },
      hasPresetChanged: false
    }
  },
  actions: {
    async reloadCurrentPreset() {
      this.activePreset = await juce_getActivePreset();
      this.reloadHasPresetChanged();
    },
    async reloadPresets(reloadCache: boolean = false) {
      const presetsObj = await juce_getAvailablePresets(reloadCache);
      this.presets = new Map(Object.entries(presetsObj));
      this.reloadCurrentPreset();
    },
    async reloadHasPresetChanged() {
      // throttle and debounce for start and end of drags
      // throttledCheckPresetUpdate(this);
      // debouncedCheckPresetUpdate(this);
      this.hasPresetChanged = await juce_hasPresetBeenUpdated();
    },
    reloadHasPresetChangedThrottled() {
      throttledCheckPresetUpdate(this);
    }
  }
});
