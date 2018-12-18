import { features, setCurrentFeature, setCurrentScenario } from "../shared-data";
import { IFeatureReport, ITag } from "../static-analyser-interface";

export interface IFeatureContext {
  tags: ITag[];
  skipped?: boolean;
  currentFeature?: IFeatureReport;
}

const context: IFeatureContext = {
  currentFeature: undefined,
  skipped: undefined,
  tags: [],
};

export const onStartFeature = (eventArgs: Partial<IFeatureReport>)  => {
  initialize(context);
  context.skipped = eventArgs.skipped;
};

export const onTagFeature = (eventArgs: Partial<IFeatureReport>)  => {

  if (context.currentFeature && Array.isArray(eventArgs.tags)) {
    context.currentFeature.tags.push(...eventArgs.tags);
    return;
  }

  if (eventArgs && eventArgs.tags && Array.isArray(eventArgs.tags)) {
    context.tags.push(...eventArgs.tags);
  }
};

export const onFoundFeature = (eventArgs: Partial<IFeatureReport>) => {

  if (context.tags && context.tags.length > 0) {
    eventArgs.tags = eventArgs.tags
      ? [...eventArgs.tags, ...context.tags]
      : [...context.tags];
  }

  if (context.skipped) {
    eventArgs.skipped = true;
  }

  const newFeatureReport: IFeatureReport = {
    ...eventArgs,
    description: eventArgs.description || "",
    elements: [],
    id: `Feature${features.length + 1}`,
    keyword: "Feature",
    line: eventArgs.line || 0,
    metadata: eventArgs.metadata || [],
    name: eventArgs.name || "undefined",
    skipped: eventArgs.skipped || false,
    tags: eventArgs.tags || [],
    uri: eventArgs.uri || "undefined",
  };
  features.push(newFeatureReport);
  setCurrentFeature(newFeatureReport);
  setCurrentScenario(undefined);
  initialize(context);
  context.currentFeature = newFeatureReport;
};

function initialize(ctx: IFeatureContext) {
  ctx.tags = [];
  ctx.skipped = undefined;
  ctx.currentFeature = undefined;
}
