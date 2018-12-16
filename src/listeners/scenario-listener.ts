import { isIn } from "../parsers/common/tags-from-path";
import { getCurrentFeature, setCurrentScenario } from "../shared-data";
import { IFeatureReport, IScenario, IStep, ITag, testcafeDefaultStep } from "../static-analyser-interface";

export interface IScenarioContext {
  tags: ITag[];
  skipped?: boolean;
}

const context: IScenarioContext = {
  skipped: undefined,
  tags: [],
};

export const onStartScenario = (eventArgs: Partial<IScenario>)  => {
  initialize(context);
  context.skipped = eventArgs.skipped;
};

export const onTagScenario = (eventArgs: Partial<IScenario>)  => {
  if (eventArgs && eventArgs.tags && Array.isArray(eventArgs.tags)) {
    context.tags.push(...eventArgs.tags);
  }
};

export const onFoundScenario = (eventArgs: Partial<IScenario>) => {

  if (context.tags && context.tags.length > 0) {
    eventArgs.tags = eventArgs.tags
      ? [...eventArgs.tags, ...context.tags]
      : [...context.tags];
  }

  if (context.skipped) {
    eventArgs.skipped = true;
    eventArgs.status = "skipped";
  }

  const currentFeature = getCurrentFeature();
  const scenarioId = currentFeature
              ? currentFeature.elements.length + 1
              : 0;
  const testStep: IStep = {
    ...testcafeDefaultStep,
    name: eventArgs.sourceLine || "undefined",
    result: {
      duration: 0,
      status: eventArgs.skipped
            ? "skipped"
            : "passed",
    },
    text: `<a href="#">${eventArgs.uri || ""}</a>`,

  };
  if (currentFeature) {
    testStep.match = {
      location: `${currentFeature.uri}:${eventArgs.line || 0}`,
    };
  }

  const newScenarioReport: IScenario = {
    ...eventArgs,
    id: `Scenario${scenarioId}`,
    keyword: eventArgs.keyword || "Scenario",
    line: eventArgs.line || 0,
    name: eventArgs.name || "undefined",
    skipped: eventArgs.skipped || false,
    sourceLine: eventArgs.sourceLine || "",
    status: eventArgs.status || "undefined",
    steps: [testStep],
    tags: eventArgs.tags || [],
    type: eventArgs.type || "scenario",
    uri: eventArgs.uri || "",
  };
  if (currentFeature && currentFeature.skipped) {
    newScenarioReport.skipped = true;
    newScenarioReport.status = "skipped";
    testStep.result.status = "skipped";
  }
  if (currentFeature) {
    aggregateScenarioTagsInToFeatureTags(newScenarioReport, currentFeature );
    currentFeature.elements.push(newScenarioReport);
    setCurrentScenario(newScenarioReport);
  }

  initialize(context);

};

const aggregateScenarioTagsInToFeatureTags = (scenario: IScenario, feature: IFeatureReport) => {
  if (scenario === undefined || feature === undefined) {
    return;
  }
  if (scenario.tags.length === 0) {
    return;
  }
  const allFeatureTags =
      feature
        .tags
        .map((tag) => tag.name);

  scenario
    .tags
    .filter((tag) =>  !isIn(tag.name, allFeatureTags))
    .map( (tag) => feature.tags.push(tag));
};

function initialize(ctx: IScenarioContext) {
  ctx.tags = [];
  ctx.skipped = undefined;
}
