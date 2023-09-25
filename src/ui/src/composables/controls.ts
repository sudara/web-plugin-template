import { Parameter, ParameterRange } from "@/parameter";

export function startGesture(param : Parameter) {
    if (typeof startPluginParameterGesture === 'function') 
        startPluginParameterGesture(param.uid);
}

export function endGesture(param : Parameter) {
    if (typeof endPluginParameterGesture === 'function') 
        endPluginParameterGesture(param.uid);
}

export function sendParameterValueUpdateToPlugin(param: Parameter) {
    if (typeof updatePluginParameter === 'function') {
      updatePluginParameter({
        "parameter": param.uid,
        "value": param.value.toFixed(7)
      });
    }
}

export async function getPluginParameters() : Promise<Array<Parameter>> {
  if (typeof reloadPluginParameters !== 'function') return [];
  let params : Array<Parameter> = [];
  let paramSpecs = await reloadPluginParameters();

  paramSpecs.forEach((spec: Parameter) => {
    let p = new Parameter(
      spec.uid,
      new ParameterRange(spec.range.min, spec.range.max, spec.range.step),
      spec.defaultVal,
      spec.name,
      spec.unit
    );
    p.value = spec.value;
    params.push(p);
  });

  return params;
}