import { IStep, StepStatus } from "../../static-analyser-interface";
import { IEventInfo } from "../common/parser-interface";
import { removePostfix } from "../common/remove-postfix";
import { removePrefix } from "../common/remove-prefix";
import { tagsFromPhrase } from "../common/tags-from-path";
import { parserEvent } from "./step-events";
import { regexFilters } from "./step-filters";
import { getKeywordFrom } from "./step-keywords";

const stepShouldBeRejected = (line: string): boolean => {
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

const stepShouldBeProcessed = (line: string): boolean => {
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

const isStepSkipped = (line: string): boolean => {
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

const getStepStatus = (line: string): StepStatus => {
  if (isStepSkipped(line)) {
    return "skipped";
  }
  return "passed";
};

export const canParse = (line: string): boolean => {
  if (stepShouldBeRejected(line)) {
    return false;
  }
  if (stepShouldBeProcessed(line)) {
    return true;
  }
  return false;
};
export const parse = (line: string, path: string, index: number): IEventInfo<Partial<IStep>> => {
  const matches = regexFilters
      .accepts
      .filter((r) => r.test(line))
      [0]
      .exec(line);

  let name = matches && matches[1]
              ? matches[1]
              : "";

  const stepKeyword = getKeywordFrom(line);

  name = removePrefix(["\"", "'", stepKeyword, ":" ])
          .from(name);
  name = removePostfix(["\"", "'"])
          .from(name);

  const eventArgs: Partial<IStep> = {
    keyword: stepKeyword,
    match: {
      location: `${path}:${index + 1}`,
    },
    name,
    result: {
      duration: 0,
      status: getStepStatus(line),
    },
    tags: tagsFromPhrase(name),
  };

  return {
    event: parserEvent.foundStep,
    eventArgs,
  };
};
