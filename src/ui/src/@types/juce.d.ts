declare function startPluginParameterGesture(paramID: string) : void;
declare function endPluginParameterGesture(paramID: string) : void;
declare function updatePluginParameter(updatePayload: object) : void;
declare function reloadState() : void;
declare function reloadPluginParameters() : Array;

declare function getGains() : Array<number>;
declare function getDisplayValue(id : string);
declare function getDisplayValue(id : string, value: number);