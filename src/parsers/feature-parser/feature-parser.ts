import { IFeatureReport, IScenario } from "../../static-analyser-interface";
import { extractTextFrom } from "../common/extract-text";
import { IEventInfo } from "../common/parser-interface";
import { removePostfix } from "../common/remove-postfix";
import { removePrefix } from "../common/remove-prefix";
import { tagsFromPhrase } from "../common/tags-from-path";
import { parserEvent } from "./feature-events";
import { regexFilters } from "./feature-filters";
import { keywordMapping } from "./feature-keywords";

const featureShouldBeRejected = (line: string): boolean => {
  let result = false;
  regexFilters
    .rejects
    .map((r) => {
      if (r.test(line)) {
        result = true;
      }
    });
  return result;
};

const featureShouldBeProcessed = (line: string): boolean => {
  let result = false;
  regexFilters
    .accepts
    .map((r) => {
      if (r.test(line)) {
        result = true;
      }
    });
  return result;
};

const isFeatureSkipped = (line: string): boolean => {
  let result = false;
  regexFilters
    .skips
    .map((r) => {
      if (r.test(line)) {
        result = true;
      }
    });
  return result;
};

export const canParse = (line: string): boolean => {
  if (featureShouldBeRejected(line)) {
    return false;
  }
  if (featureShouldBeProcessed(line)) {
    return true;
  }
  return false;
};
export const parse = (line: string, path: string, index: number): IEventInfo<Partial<IScenario>> => {
  const featureKeyword = extractTextFrom(line)
      .withFilters(regexFilters.keywords)
      .withMapping(keywordMapping);

  let featureDescription = extractTextFrom(line)
      .withFilters(regexFilters.accepts)
      .withMapping({});

  featureDescription = removePrefix(["\"", "'", featureKeyword, ":" ])
      .from(featureDescription);
  featureDescription = removePostfix(["\"", "'"])
      .from(featureDescription);

  const eventArgs: Partial<IFeatureReport> = {
    keyword: featureKeyword,
    line: index + 1,
    name: featureDescription,
    skipped: isFeatureSkipped(line),
    tags: tagsFromPhrase(featureDescription),
    uri: `${path}:${index + 1}`,
  };

  return {
    event: parserEvent.foundFeature,
    eventArgs,
  };
};
