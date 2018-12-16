import { IFeatureReport, IScenario } from "../../static-analyser-interface";
import { extractTextFrom } from "../common/extract-text";
import { IEventInfo, IParserContextInfo } from "../common/parser-interface";
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

export const updateContext = (line: string, parserContext: IParserContextInfo): void => {
  if (isMultipleLinesFixtureSyntax(line) ) {
    parserContext.currentContext = "fixture";
    return;
  }

  if (isOneLineFixtureSyntax(line) ) {
    parserContext.currentContext = "fixture";
    return;
  }
};

export const canParse = (line: string, parserContext: IParserContextInfo): boolean => {
  if (parserContext.currentContext !== "fixture") {
    return false;
  }
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
      .withMapping(keywordMapping) || keywordMapping.fixture;

  let featureDescription = extractTextFrom(line)
      .withFilters(regexFilters.accepts)
      .withMapping({}) || "undefined";

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

function isMultipleLinesFixtureSyntax(line: string) {
  if (line && line.trim && line.trim() === "fixture" ) {
    return true;
  }

  if (line && line.trim && line.trim() === "fixture.skip" ) {
    return true;
  }

  if (line && line.trim && line.trim() === "fixture.only" ) {
    return true;
  }

  return false;
}

function isOneLineFixtureSyntax(line: string) {
  if (line && line.includes("fixture `")) {
    return true;
  }

  if (line && line.includes("fixture.skip `")) {
    return true;
  }

  if (line && line.includes("fixture.only `")) {
    return true;
  }

  if (line && line.includes("fixture`")) {
    return true;
  }

  if (line && line.includes("fixture.skip`")) {
    return true;
  }

  if (line && line.includes("fixture.only`")) {
    return true;
  }

  if (line && line.includes("fixture(")) {
    return true;
  }

  if (line && line.includes("fixture.only(")) {
    return true;
  }

  if (line && line.includes("fixture.skip(")) {
    return true;
  }

  return false;
}
