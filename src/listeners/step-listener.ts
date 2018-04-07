import { getCurrentFeature, getCurrentScenario } from "../shared-data";
import { IStep } from "../static-analyser-interface";
import { aggregateTagsInToFeatureTags } from "./common/aggregate-tags";

export const onFoundStep = (eventArgs: Partial<IStep>) => {
  const currentFeature = getCurrentFeature();
  const currentScenario = getCurrentScenario();

  const stepUri = eventArgs.match
                  ? eventArgs.match.location || ""
                  : "";

  const stepReport: IStep = {
    hidden: false,
    keyword: eventArgs.keyword || "undefined",
    match: eventArgs.match || {location: "undefined"},
    name: eventArgs.name || "undefined",
    result: eventArgs.result || {duration: 0, status: "undefined"},
    tags: eventArgs.tags || [],
    text: `<a href="#">${stepUri}</a>`,
  };
  if (currentScenario) {
    currentScenario.steps.push(stepReport);
  }
  if (currentScenario && currentScenario.skipped) {
    stepReport.result.status = "skipped";
  }

  if (currentFeature) {
    aggregateTagsInToFeatureTags(stepReport.tags, currentFeature );
  }
};
