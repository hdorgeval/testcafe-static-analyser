import { isIn } from "../parsers/common/tags-from-path";
import { getCurrentFeature, setCurrentScenario } from "../shared-data";
import { IFeatureReport, IScenario, IStep, testcafeDefaultStep } from "../static-analyser-interface";

export const onFoundTest = (eventArgs: Partial<IScenario>) => {
  const currentFeature = getCurrentFeature();
  const scenarioId = currentFeature
              ? currentFeature.elements.length + 1
              : 0;
  const testStep: IStep = {
    ...testcafeDefaultStep,
    name: eventArgs.sourceLine || "undefined",
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
    keyword: "Scenario",
    line: eventArgs.line || 0,
    name: eventArgs.name || "undefined",
    sourceLine: eventArgs.sourceLine || "",
    status: eventArgs.status || "undefined",
    steps: [testStep],
    tags: eventArgs.tags || [],
    type: eventArgs.type || "scenario",
    uri: eventArgs.uri || "",
  };
  if (currentFeature) {
    aggregateScenarioTagsInToFeatureTags(newScenarioReport, currentFeature );
    currentFeature.elements.push(newScenarioReport);
    setCurrentScenario(newScenarioReport);
  }
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
