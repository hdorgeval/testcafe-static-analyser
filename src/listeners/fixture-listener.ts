import { features, setCurrentFeature } from "../shared-data";
import { IFeatureReport } from "../static-analyser-interface";

export const onFoundFixture = (eventArgs: Partial<IFeatureReport>) => {
  const newFeatureReport: IFeatureReport = {
    ...eventArgs,
    description: eventArgs.description || "",
    elements: [],
    id: `Feature${features.length + 1}`,
    keyword: "Feature",
    line: eventArgs.line || 0,
    metadata: eventArgs.metadata || [],
    name: eventArgs.name || "undefined",
    tags: eventArgs.tags || [],
    uri: eventArgs.uri || "undefined",
  };
  features.push(newFeatureReport);
  setCurrentFeature(newFeatureReport);
};
