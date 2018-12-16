import { IScenario, StepStatus } from "../../static-analyser-interface";
import { extractTextFrom } from "../common/extract-text";
import { IEventInfo, IParserContextInfo } from "../common/parser-interface";
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

export const updateContext = (line: string, parserContext: IParserContextInfo): void => {
  if (isMultipleLinesTestSyntax(line) ) {
    parserContext.currentContext = "test";
    return;
  }

  if (isOneLineTestSyntax(line) ) {
    parserContext.currentContext = "test";
    return;
  }

  if (isBeforeEachSyntax(line)) {
    parserContext.currentContext = "test";
    return;
  }
};

export const canParse = (line: string, parserContext: IParserContextInfo): boolean => {
  if (parserContext.currentContext !== "test") {
    return false;
  }

  if (scenarioShouldBeRejected(line)) {
    return false;
  }

  if (scenarioShouldBeProcessed(line)) {
    return true;
  }

  return false;
};
// tslint:disable-next-line:max-line-length
export const parse = (line: string, path: string, index: number): IEventInfo<Partial<IScenario>> => {

  if (isMultipleLinesTestSyntax(line) ) {
    return {
      event: parserEvent.startScenario,
      eventArgs: {
        skipped: isScenarioSkipped(line),
      },
    };
  }

  if (isMetaSyntax(line)) {
    const metaDescription = extractTextFrom(line)
      .withFilters(regexFilters.accepts)
      .withMapping({});
    return {
        event: parserEvent.tagScenario,
        eventArgs: {
          tags: tagsFromPhrase(metaDescription || "undefined"),
        },
      };
  }

  const scenarioKeyword = extractTextFrom(line)
      .withFilters(regexFilters.keywords)
      .withMapping(keywordMapping) || keywordMapping.test;

  let scenarioDescription = extractTextFrom(line)
      .withFilters(regexFilters.accepts)
      .withMapping({}) || "undefined";

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

function isMultipleLinesTestSyntax(line: string) {
  if (line && line.trim && line.trim() === "test" ) {
    return true;
  }

  if (line && line.trim && line.trim() === "test.skip" ) {
    return true;
  }

  if (line && line.trim && line.trim() === "test.only" ) {
    return true;
  }

  return false;
}

function isOneLineTestSyntax(line: string) {
  if (line && line.includes("test(")) {
    return true;
  }

  if (line && line.includes("test.only(")) {
    return true;
  }

  if (line && line.includes("test.skip(")) {
    return true;
  }

  return false;
}

function isBeforeEachSyntax(line: string) {
  if (line && line.includes(".beforeEach(")) {
    return true;
  }

  return false;
}

function isMetaSyntax(line: string) {
  if (line && line.includes(".meta(")) {
    return true;
  }
  return false;
}
