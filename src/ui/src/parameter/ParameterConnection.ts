import ParameterRange from "./ParameterRange";
import PluginParameter from "./PluginParameter";

export function startGesture(param : PluginParameter) {
    if (typeof juce_startPluginParameterGesture === 'function') 
        juce_startPluginParameterGesture(param.uid);
}

export function endGesture(param : PluginParameter) {
    if (typeof juce_endPluginParameterGesture === 'function') 
        juce_endPluginParameterGesture(param.uid);
}

export function sendParameterValueUpdateToPlugin(param: PluginParameter) {
    if (typeof juce_updatePluginParameter === 'function') {
      juce_updatePluginParameter({
        "parameter": param.uid,
        "value": param.value.toFixed(7)
      });
    }
}

export async function getPluginParameters() : Promise<Array<PluginParameter>> {
  if (typeof juce_getPluginParameters !== 'function') return [];
  let params : Array<PluginParameter> = [];
  let paramSpecs = await juce_getPluginParameters();

  paramSpecs.forEach((spec: PluginParameter) => {
    let p = new PluginParameter(
      spec.uid,
      spec.value,
      new ParameterRange(spec.range.min, spec.range.max, spec.range.step),
      spec.defaultVal,
      spec.name,
      spec.unit
    );
    params.push(p);
  });

  return params;
}
