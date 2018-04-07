import { IScenario, StepStatus } from "../../static-analyser-interface";
import { extractTextFrom } from "../common/extract-text";
import { IEventInfo } from "../common/parser-interface";
import { removePostfix } from "../common/remove-postfix";
import { removePrefix } from "../common/remove-prefix";
import { tagsFromPhrase } from "../common/tags-from-path";
import { parserEvent } from "./scenario-events";
import { regexFilters } from "./scenario-filters";
import { keywordMapping } from "./scenario-keywords";

const scenarioShouldBeRejected = (line: string): boolean => {
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

const scenarioShouldBeProcessed = (line: string): boolean => {
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

const isScenarioSkipped = (line: string): boolean => {
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

const getScenarioStatus = (line: string): StepStatus => {
  if (isScenarioSkipped(line)) {
    return "skipped";
  }
  return "passed";
};

export const canParse = (line: string): boolean => {
  if (scenarioShouldBeRejected(line)) {
    return false;
  }
  if (scenarioShouldBeProcessed(line)) {
    return true;
  }
  return false;
};
export const parse = (line: string, path: string, index: number): IEventInfo<Partial<IScenario>> => {
  const scenarioKeyword = extractTextFrom(line)
      .withFilters(regexFilters.keywords)
      .withMapping(keywordMapping);

  let scenarioDescription = extractTextFrom(line)
      .withFilters(regexFilters.accepts)
      .withMapping({});

  scenarioDescription = removePrefix(["\"", "'", scenarioKeyword, ":" ])
      .from(scenarioDescription);
  scenarioDescription = removePostfix(["\"", "'"])
      .from(scenarioDescription);

  const eventArgs: Partial<IScenario> = {
    keyword: scenarioKeyword,
    line: index + 1,
    name: scenarioDescription,
    skipped: isScenarioSkipped(line),
    sourceLine: line,
    status: getScenarioStatus(line),
    steps: [],
    tags: tagsFromPhrase(scenarioDescription),
    type: "scenario",
    uri: `${path}:${index + 1}`,
  };
  if (eventArgs.keyword === "Background") {
    eventArgs.name = "Background";
  }

  return {
    event: parserEvent.foundScenario,
    eventArgs,
  };
};
