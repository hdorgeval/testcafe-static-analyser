import { busEvent } from "../events/exposed-events";
import { IFeatureReport, IScenario, StepStatus } from "../static-analyser-interface";
import { removePostfix } from "./common/remove-postfix";
import { removePrefix } from "./common/remove-prefix";
import { tagsFromPhrase } from "./common/tags-from-path";
import { IEventInfo, IParserInfo } from "./parser-interface";

const keyword = {
  test: "Scenario",
};

const regex = {
  tests:
    [
      /test\((.*),\s/,
      /test.skip\((.*),\s/,
      /test.only\((.*),\s/,
    ],
};
const isStepDeclaration = (line: string): boolean => {
  let result = false;
  regex
    .tests
    .map((r) => {
      if (r.test(line)) {
        result = true;
      }
    });
  return result;
};

const isStepSkipped = (line: string): boolean => {
  return /test.skip/.test(line);
};

const getScenarioStatus = (line: string): StepStatus => {
  if (isStepSkipped(line)) {
    return "skipped";
  }
  return "undefined";
};

const processStepDeclaration = (line: string, path: string, index: number): IEventInfo<Partial<IFeatureReport>> => {
  const matches = regex
      .tests
      .filter((r) => r.test(line))
      [0]
      .exec(line);

  let name = matches && matches[1]
              ? matches[1]
              : "";

  name = removePrefix(["\"", "'", keyword.test, ":" ])
          .from(name);
  name = removePostfix(["\"", "'"])
          .from(name);

  const eventArgs: Partial<IScenario> = {
    keyword: "Scenario",
    line: index + 1,
    name,
    sourceLine: line,
    status: getScenarioStatus(line),
    steps: [],
    tags: tagsFromPhrase(name),
    type: "scenario",
    uri: `${path}:${index + 1}`,
  };

  return {
    event: busEvent.foundTest,
    eventArgs,
  };
};
export const testParserInfo: IParserInfo<Partial<IScenario>> = {
  canParse: isStepDeclaration,
  parse: processStepDeclaration,
};
