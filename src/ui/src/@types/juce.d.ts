declare function juce_startPluginParameterGesture(paramID: string) : void;
declare function juce_endPluginParameterGesture(paramID: string) : void;
declare function juce_updatePluginParameter(updatePayload: object) : void;
declare function juce_getPluginParameters() : Array;

declare function juce_getDisplayValue(id : string);
declare function juce_getDisplayValue(id : string, value: number);

declare function juce_getCurrentVersion() : Promise<string>;
declare function juce_getPluginName() : Promise<string>;

declare function juce_requestFileChooser(filePatternsAllowed : string) : void;

declare function juce_createPreset(name: string, category: string);
declare function juce_loadPreset(path: string);
declare function juce_nextPreset();
declare function juce_prevPreset();
declare function juce_getAvailablePresets(reloadCache: boolean) : Promise<any>;
declare function juce_getActivePreset() : Promise<Preset>;
declare function juce_getConfig(key : string) : Promise<string>;
declare function juce_setConfig(key : string, value: string);