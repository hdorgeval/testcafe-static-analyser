import { busEvent } from "../events/exposed-events";
import { IFeatureReport } from "../static-analyser-interface";
import { removePostfix } from "./common/remove-postfix";
import { removePrefix } from "./common/remove-prefix";
import { tagsFromFilePath } from "./common/tags-from-path";
import { IEventInfo, IParserInfo } from "./parser-interface";

const keyword = {
  feature: "Feature",
};

const regex = {
  fixtures:
    [
      /fixture\((.*)\)/,
      /fixture.skip\((.*)\)/,
      /fixture.only\((.*)\)/,
    ],
};
const isFixtureDeclaration = (line: string): boolean => {
  let result = false;
  regex
    .fixtures
    .map((r) => {
      if (r.test(line)) {
        result = true;
      }
    });
  return result;
};

const processFixtureDeclaration = (line: string, path: string, index: number): IEventInfo<Partial<IFeatureReport>> => {
  const matches = regex
      .fixtures
      .filter((r) => r.test(line))
      [0]
      .exec(line);

  let name = matches && matches[1]
              ? matches[1]
              : "";

  name = removePrefix(["\"", "'", keyword.feature, ":" ])
          .from(name);
  name = removePostfix(["\"", "'"])
          .from(name);

  const eventArgs: Partial<IFeatureReport> = {
    line: index + 1,
    name,
    tags: tagsFromFilePath(path),
    uri: path,
  };

  return {
    event: busEvent.foundFixture,
    eventArgs,
  };
};
export const fixtureParserInfo: IParserInfo<Partial<IFeatureReport>> = {
  canParse: isFixtureDeclaration,
  parse: processFixtureDeclaration,
};
