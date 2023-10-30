// Parameters
declare function juce_startPluginParameterGesture(paramID: string) : void;
declare function juce_endPluginParameterGesture(paramID: string) : void;
declare function juce_updatePluginParameter(updatePayload: object) : void;
declare function juce_getPluginParameters() : Array;
declare function juce_getDisplayValue(id : string);
declare function juce_getDisplayValue(id : string, value: number);

// Info
declare function juce_getCurrentVersion() : Promise<string>;
declare function juce_getPluginName() : Promise<string>;

// Processor
declare function juce_requestFileChooser(filePatternsAllowed : string) : void;

// Presets
declare function juce_createPreset(name: string, category: string);
declare function juce_loadPreset(path: string);
declare function juce_nextPreset();
declare function juce_prevPreset();
declare function juce_getAvailablePresets(reloadCache: boolean) : Promise<any>;
declare function juce_getActivePreset() : Promise<Preset>;
declare function juce_getConfig(key : string) : Promise<string>;
declare function juce_setConfig(key : string, value: string);

// Auth
declare function juce_getIsAuthorized() : Promise<boolean>;
declare function juce_getDemoStarted() : Promise<boolean>;
declare function juce_getDemoFinished() : Promise<boolean>;
declare function juce_getDemoTimeLeftSeconds() : Promise<number>;
declare function juce_startDemo() : Promise<void>;
declare function juce_tryAuthorize(serial : string) : Promise<boolean>;